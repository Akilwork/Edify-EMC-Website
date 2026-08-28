import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Resend } from "resend";
import * as XLSX from "xlsx";

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

    const { name, email, phone, coverNote, cvName, cvBase64, cvMimeType, jobTitle, jobId, submittedAt } = data || {};

    const timestamp = getISTTimestamp(submittedAt);
    let dateObj = new Date();
    if (submittedAt) {
      const parsed = new Date(submittedAt);
      if (!isNaN(parsed.getTime())) dateObj = parsed;
    }
    const istOffsetMs = 5 * 60 * 60 * 1000 + 30 * 60 * 1000;
    const istOffsetDate = new Date(dateObj.getTime() + istOffsetMs);
    const isoISTTime = istOffsetDate.toISOString().replace("Z", "+05:30");

    console.log("New Careers Application:", JSON.stringify({ timestamp, isoISTTime, ...data }));

    // 1. Send data to Google Sheets Webhook (Synchronous to get the Drive link)
    let googleDriveLink = "";
    const googleWebhookUrl = process.env.GOOGLE_SHEETS_CAREERS_WEBHOOK_URL || process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (googleWebhookUrl) {
      try {
        const webhookResponse = await fetch(googleWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "career",
            sheetName: "Career Request",
            targetSheet: "Career Request",
            sheet: "Career Request",
            formType: "Career Request",
            timestamp,
            istTime: timestamp,
            formattedTimestamp: timestamp,
            isoISTTime,
            name: name || "",
            email: email || "",
            phone: phone ? (phone.startsWith("+") ? "'" + phone : phone) : "",
            contactNumber: phone ? (phone.startsWith("+") ? "'" + phone : phone) : "",
            countryCode: "",
            position: jobTitle || "Applicant",
            jobTitle: jobTitle || "",
            jobId: jobId || "",
            department: "",
            location: "",
            experience: "",
            employmentType: "",
            resume: cvName || "",
            cvName: cvName || "",
            cvBase64: cvBase64 || "",
            cvMimeType: cvMimeType || "",
            message: coverNote || "",
            coverNote: coverNote || "",
            requestDetails: coverNote || "",
            serviceRequired: "Careers Application",
          }),
        });

        if (webhookResponse.ok) {
          const webhookResult = await webhookResponse.json();
          if (webhookResult && webhookResult.fileUrl) {
            googleDriveLink = webhookResult.fileUrl;
            console.log("Google Sheets Webhook succeeded, got link:", googleDriveLink);
          } else {
            console.log("Google Sheets Webhook succeeded, but no link returned.");
          }
        } else {
          console.warn("Google Sheets Webhook responded with error status:", webhookResponse.status);
        }
      } catch (webhookError) {
        console.error("Google Sheets Webhook integration error:", webhookError);
      }
    }

    // 1.5 Save uploaded CV file locally to public/uploads/resumes/
    let localCvPath = "";
    if (cvBase64 && cvName) {
      try {
        const uploadDir = path.join(process.cwd(), "public", "uploads", "resumes");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const safeFileName = `${Date.now()}_${cvName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
        const targetPath = path.join(uploadDir, safeFileName);
        const buffer = Buffer.from(cvBase64, "base64");
        fs.writeFileSync(targetPath, buffer);
        localCvPath = `/uploads/resumes/${safeFileName}`;
        console.log("Uploaded resume saved locally to:", targetPath);
      } catch (fileErr) {
        console.warn("Failed to save uploaded resume file locally:", fileErr);
      }
    }

    const finalCvLink = googleDriveLink || localCvPath || cvName || "";

    // 2. Write to local CSV spreadsheet file first
    try {
      const filePath = path.join(process.cwd(), "careers_submissions.csv");
      const fileExists = fs.existsSync(filePath);

      const headers = ["Timestamp", "Job ID", "Job Title", "Name", "Email", "Phone", "CV File", "Cover Note"];
      const rowData = [
        timestamp,
        jobId || "",
        jobTitle || "",
        name || "",
        email || "",
        phone || "",
        finalCvLink,
        coverNote || "",
      ];
      const csvRow = rowData.map(escapeCSV).join(",") + "\n";

      if (!fileExists) {
        const csvHeader = headers.map(escapeCSV).join(",") + "\n";
        fs.writeFileSync(filePath, csvHeader + csvRow, "utf8");
      } else {
        fs.appendFileSync(filePath, csvRow, "utf8");
      }
    } catch (csvError) {
      console.warn("Failed to write careers submission to local CSV file:", csvError);
    }

    // 3. Write to local Excel file (Hiring Details sheet)
    try {
      const xlsxPath = path.join(process.cwd(), "careers_submissions.xlsx");
      const SHEET_NAME = "Hiring Details";
      const headers = ["Timestamp", "Job ID", "Job Title", "Applicant Name", "Email", "Phone", "CV File", "Cover Note"];
      const newRow = [
        timestamp,
        jobId || "",
        jobTitle || "",
        name || "",
        email || "",
        phone || "",
        finalCvLink,
        coverNote || "",
      ];

      let workbook: XLSX.WorkBook;

      if (fs.existsSync(xlsxPath)) {
        // Read existing workbook
        workbook = XLSX.readFile(xlsxPath);
      } else {
        // Create a fresh workbook
        workbook = XLSX.utils.book_new();
      }

      // Find or create the "Hiring Details" sheet
      if (!workbook.SheetNames.includes(SHEET_NAME)) {
        const sheetData = [headers, newRow];
        const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet, SHEET_NAME);
      } else {
        const worksheet = workbook.Sheets[SHEET_NAME];
        XLSX.utils.sheet_add_aoa(worksheet, [newRow], { origin: -1 });
      }

      XLSX.writeFile(workbook, xlsxPath);
      console.log("Career application written to Excel (Hiring Details sheet):", xlsxPath);
    } catch (xlsxError) {
      console.warn("Failed to write careers submission to local Excel file:", xlsxError);
    }

    // 4. Perform External API Integrations (Asynchronously in Background)
    const runBackgroundIntegrations = async () => {

      // A. Email Notification via Resend
      const resendApiKey = process.env.RESEND_API_KEY;
      const notificationEmail = process.env.NOTIFICATION_EMAIL || "akilwork04@gmail.com";

      if (resendApiKey) {
        try {
          const resend = new Resend(resendApiKey);

          const { data, error } = await resend.emails.send({
            from: "Edify EMC Careers <onboarding@resend.dev>",
            to: [notificationEmail],
            subject: `New Job Application: ${jobTitle} - ${name}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #a855f7; border-bottom: 2px solid #a855f7; padding-bottom: 10px;">New Careers Submission</h2>
                <p>A new application has been submitted on the Edify EMC Website:</p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; width: 150px; border-bottom: 1px solid #f4f4f4;">Job Title:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #f4f4f4;">${jobTitle} (ID: ${jobId})</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f4f4f4;">Applicant Name:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #f4f4f4;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f4f4f4;">Email:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #f4f4f4;"><a href="mailto:${email}">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f4f4f4;">Phone Number:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #f4f4f4;">${phone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f4f4f4;">CV / Resume:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #f4f4f4;">
                      ${googleDriveLink ? `<a href="${googleDriveLink}" target="_blank" style="color: #a855f7; text-decoration: none; font-weight: bold;">View in Google Drive</a>` : cvName}
                    </td>
                  </tr>
                </table>

                <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #a855f7; border-radius: 4px;">
                  <strong style="display: block; margin-bottom: 5px;">Cover Note:</strong>
                  <p style="margin: 0; white-space: pre-wrap; font-style: italic;">${coverNote || "No cover note provided."}</p>
                </div>
              </div>
            `,
          });

          if (error) {
            console.error("Resend email error for Careers Form:", error);
          } else {
            console.log("Resend notification sent successfully:", data?.id);
          }
        } catch (emailError) {
          console.error("Resend notification integration error for Careers Form:", emailError);
        }
      } else {
        console.warn("Email notification skipped: RESEND_API_KEY environment variable is not configured.");
      }
    };

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
