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

// Helper to get formatted UAE (Dubai) Local Time
const getUAETimestamp = (): string => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dubai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(new Date());
  const partMap = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  return `${partMap.year}-${partMap.month}-${partMap.day} ${partMap.hour}:${partMap.minute}:${partMap.second}`;
};

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      name,
      countryCode,
      contactNumber,
      email,
      designation,
      institutionType,
      institutionName,
      serviceRequired,
      howCanWeHelp,
      requestDetails,
    } = data;

    // Get timestamp formatted for Asia/Dubai Local Time (GST)
    const timestamp = getUAETimestamp();
    const detailsVal = howCanWeHelp || requestDetails || "";

    // Log the submission to console (fail-safe for serverless host logs)
    console.log("New Consultation Submission:", JSON.stringify({ timestamp, ...data, detailsVal }));

    // ────────────────────────────────────────────────────────────────
    // 1. Google Sheets Webhook (via Google Apps Script Web App)
    // ────────────────────────────────────────────────────────────────
    const googleWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (googleWebhookUrl) {
      try {
        const response = await fetch(googleWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            timestamp,
            name: name || "",
            countryCode: countryCode || "",
            contactNumber: contactNumber || "",
            email: email || "",
            designation: designation || "",
            institutionType: institutionType || "",
            institutionName: institutionName || "",
            serviceRequired: serviceRequired || "",
            howCanWeHelp: detailsVal,
            requestDetails: detailsVal,
          }),
        });

        if (response.ok) {
          return NextResponse.json({ success: true, destination: "google_sheets_webhook" });
        } else {
          console.warn("Google Sheets Webhook responded with error status:", response.status);
        }
      } catch (webhookError) {
        console.error("Google Sheets Webhook integration error:", webhookError);
      }
    }

    // ────────────────────────────────────────────────────────────────
    // 2. Microsoft Graph API (SharePoint / OneDrive Excel)
    // ────────────────────────────────────────────────────────────────
    const tenantId = process.env.SHAREPOINT_TENANT_ID;
    const clientId = process.env.SHAREPOINT_CLIENT_ID;
    const clientSecret = process.env.SHAREPOINT_CLIENT_SECRET;
    const driveId = process.env.SHAREPOINT_DRIVE_ID;
    const itemId = process.env.SHAREPOINT_ITEM_ID;

    if (tenantId && clientId && clientSecret && driveId && itemId) {
      try {
        // Step A: Authenticate with Microsoft Identity Platform
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

        // Step B: Get current used range to find the next empty row
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
        } else {
          console.warn("Used range API error status:", rangeResponse.status);
        }

        // Step C: Append header row if first write
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

        // Step D: Write the form values to the next row (A[targetRow] : J[targetRow])
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
                timestamp,
                name || "",
                countryCode || "",
                contactNumber || "",
                email || "",
                designation || "",
                institutionType || "",
                institutionName || "",
                serviceRequired || "",
                detailsVal || "",
              ],
            ],
          }),
        });

        if (writeResponse.ok) {
          return NextResponse.json({ success: true, destination: "sharepoint" });
        } else {
          const errBody = await writeResponse.text();
          console.error("Failed to write to SharePoint Excel via Microsoft Graph API:", errBody);
        }
      } catch (graphError) {
        console.error("Microsoft Graph integration error:", graphError);
      }
    }

    // ────────────────────────────────────────────────────────────────
    // 3. Fallback: Append to local CSV spreadsheet file (consultation_submissions.csv)
    // ────────────────────────────────────────────────────────────────
    const filePath = path.join(process.cwd(), "consultation_submissions.csv");
    const fileExists = fs.existsSync(filePath);

    const headers = [
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
    ];

    const rowData = [
      timestamp,
      name || "",
      countryCode || "",
      contactNumber || "",
      email || "",
      designation || "",
      institutionType || "",
      institutionName || "",
      serviceRequired || "",
      detailsVal || "",
    ];

    const csvRow = rowData.map(escapeCSV).join(",") + "\n";

    if (!fileExists) {
      const csvHeader = headers.map(escapeCSV).join(",") + "\n";
      fs.writeFileSync(filePath, csvHeader + csvRow, "utf8");
    } else {
      fs.appendFileSync(filePath, csvRow, "utf8");
    }

    return NextResponse.json({ success: true, destination: "local_csv" });
  } catch (error: any) {
    console.error("Submit Handler Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
