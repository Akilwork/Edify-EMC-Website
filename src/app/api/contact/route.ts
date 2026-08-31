import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Helper function to escape values for RFC 4180 CSV compliance
const escapeCSV = (val: any): string => {
  if (val === null || val === undefined) return '""';
  const str = typeof val === "object" ? JSON.stringify(val) : String(val);
  const clean = str.replace(/"/g, '""');
  return `"${clean}"`;
};

// Helper to get formatted India (Kolkata) Local Time safely
const getISTTimestamp = (dateInput?: Date | string): string => {
  let date = new Date();
  if (dateInput) {
    const parsed = new Date(dateInput);
    if (!isNaN(parsed.getTime())) {
      date = parsed;
    }
  }
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(date);
  const partMap = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  let hour = partMap.hour;
  if (hour === "24") hour = "00";
  return `${partMap.year}-${partMap.month}-${partMap.day} ${hour}:${partMap.minute}:${partMap.second} IST`;
};

export async function POST(request: Request) {
  try {
    let data: any;
    try {
      data = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request payload" },
        { status: 400 }
      );
    }

    const { name, email, company, message, submittedAt } = data || {};

    const timestamp = getISTTimestamp(submittedAt);
    let dateObj = new Date();
    if (submittedAt) {
      const parsed = new Date(submittedAt);
      if (!isNaN(parsed.getTime())) dateObj = parsed;
    }
    const istOffsetMs = 5 * 60 * 60 * 1000 + 30 * 60 * 1000;
    const istOffsetDate = new Date(dateObj.getTime() + istOffsetMs);
    const isoISTTime = istOffsetDate.toISOString().replace("Z", "+05:30");

    // Excel stores whatever instant it receives and renders its UTC wall-clock,
    // so an India submission appears 5h30m behind. Send a timezone-naive India
    // local datetime (no offset, no " IST" suffix) so Excel stores exactly that
    // wall-clock time with no conversion — the cell then reads as India local.
    const excelTimestamp = timestamp.replace(" IST", "");

    console.log("New Contact Submission:", JSON.stringify({ timestamp, isoISTTime, ...data }));

    // 1. Write to local CSV spreadsheet file first
    try {
      const filePath = path.join(process.env.DATA_DIR || process.cwd(), "contact_submissions.csv");
      const fileExists = fs.existsSync(filePath);

      const headers = ["Timestamp", "Name", "Email", "Company", "Message"];
      const rowData = [timestamp, name || "", email || "", company || "", message || ""];
      const csvRow = rowData.map(escapeCSV).join(",") + "\n";

      if (!fileExists) {
        const csvHeader = headers.map(escapeCSV).join(",") + "\n";
        fs.writeFileSync(filePath, csvHeader + csvRow, "utf8");
      } else {
        fs.appendFileSync(filePath, csvRow, "utf8");
      }
    } catch (csvError) {
      console.warn("Failed to write contact submission to local CSV file:", csvError);
    }

    // 2. Perform External API Integrations (Asynchronously in Background)
    const runBackgroundIntegrations = async () => {
      // A. Google Sheets Webhook
      const googleWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
      if (googleWebhookUrl) {
        try {
          const response = await fetch(googleWebhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              requestType: "service",
              timestamp,
              istTime: timestamp,
              formattedTimestamp: timestamp,
              isoISTTime,
              name: name || "",
              email: email || "",
              institutionName: company || "",
              howCanWeHelp: message || "",
              requestDetails: message || "",
              countryCode: "",
              contactNumber: "",
              designation: "",
              institutionType: "",
              serviceRequired: "General Contact Inquiry",
            }),
          });

          if (response.ok) {
            console.log("Google Sheets Webhook succeeded in background for Contact Form");
          } else {
            console.warn("Google Sheets Webhook responded with error status for Contact Form:", response.status);
          }
        } catch (webhookError) {
          console.error("Google Sheets Webhook integration error for Contact Form:", webhookError);
        }
      }

      // B. Microsoft Graph API
      const tenantId = process.env.SHAREPOINT_TENANT_ID;
      const clientId = process.env.SHAREPOINT_CLIENT_ID;
      const clientSecret = process.env.SHAREPOINT_CLIENT_SECRET;
      const driveId = process.env.SHAREPOINT_DRIVE_ID;
      const itemId = process.env.SHAREPOINT_ITEM_ID;

      if (tenantId && clientId && clientSecret && driveId && itemId) {
        try {
          // Authenticate
          const tokenResponse = await fetch(
            `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
            {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: "client_credentials",
                scope: "https://graph.microsoft.com/.default",
              }),
            }
          );

          if (!tokenResponse.ok) {
            throw new Error(`Auth failed with status ${tokenResponse.status}`);
          }

          const tokenData = await tokenResponse.json();
          const accessToken = tokenData.access_token;

          // Get used range
          const usedRangeUrl = `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${itemId}/workbook/worksheets('Sheet1')/usedRange`;
          const rangeResponse = await fetch(usedRangeUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: "application/json",
            },
          });

          let targetRow = 1;
          let isFirstWrite = true;

          if (rangeResponse.ok) {
            const rangeData = await rangeResponse.json();
            const rowCount = rangeData.rowCount || 0;
            targetRow = rowCount + 1;
            isFirstWrite = false;
          } else if (rangeResponse.status === 404) {
            targetRow = 1;
            isFirstWrite = true;
          }

          // Write headers (if sheet is empty)
          if (isFirstWrite && targetRow === 1) {
            const headerUrl = `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${itemId}/workbook/worksheets('Sheet1')/range(address='A1:J1')`;
            await fetch(headerUrl, {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                values: [
                  [
                    "Timestamp",
                    "Name",
                    "Country Code",
                    "Contact Number",
                    "Email",
                    "Designation",
                    "Institution Type",
                    "Institution Name",
                    "Service Required",
                    "Request Details",
                  ],
                ],
              }),
            });
            targetRow = 2;
          }

          // Write data matching the columns of the sheet
          const writeUrl = `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${itemId}/workbook/worksheets('Sheet1')/range(address='A${targetRow}:J${targetRow}')`;
          const writeResponse = await fetch(writeUrl, {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              values: [
                [
                  excelTimestamp,
                  name || "",
                  "", // Country Code
                  "", // Contact Number
                  email || "",
                  "", // Designation
                  "", // Institution Type
                  company || "", // Institution Name / Company
                  "General Contact Inquiry", // Service Required
                  message || "", // Request Details
                ],
              ],
            }),
          });

          if (writeResponse.ok) {
            console.log("SharePoint write succeeded in background for Contact Form");
          } else {
            const errBody = await writeResponse.text();
            console.error("Failed to write to SharePoint Excel in background for Contact Form:", errBody);
          }
        } catch (graphError) {
          console.error("Microsoft Graph integration error for Contact Form:", graphError);
        }
      }
    };

    // Trigger external integrations asynchronously
    runBackgroundIntegrations().catch((err) =>
      console.error("Background integration error:", err)
    );

    return NextResponse.json({ success: true, destination: "local_csv_and_background_initiated" });
  } catch (error: any) {
    console.error("Submit Handler Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
