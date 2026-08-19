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
    let leadData: any;
    try {
      leadData = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request payload" },
        { status: 400 }
      );
    }

    const {
      timestamp,
      serviceInterest,
      institutionType,
      email,
      conversationSummary,
      messageCount,
      qualified,
      conversationId,
    } = leadData || {};

    const formattedTimestamp = getISTTimestamp(timestamp);
    let dateObj = new Date();
    if (timestamp) {
      const parsed = new Date(timestamp);
      if (!isNaN(parsed.getTime())) dateObj = parsed;
    }
    const istOffsetMs = 5 * 60 * 60 * 1000 + 30 * 60 * 1000;
    const istOffsetDate = new Date(dateObj.getTime() + istOffsetMs);
    const isoISTTime = istOffsetDate.toISOString().replace("Z", "+05:30");

    // Log the submission to console (fail-safe for serverless host logs)
    console.log("New Chatbot Lead:", JSON.stringify({ timestamp: formattedTimestamp, isoISTTime, ...leadData }));

    // ────────────────────────────────────────────────────────────────
    // 1. Write to local CSV spreadsheet file first (Immediate & Safe)
    // ────────────────────────────────────────────────────────────────
    try {
      const filePath = path.join(process.cwd(), "chatbot_leads.csv");
      const fileExists = fs.existsSync(filePath);

      const headers = [
        "Timestamp",
        "Service Interest",
        "Institution Type",
        "Email",
        "Conversation Summary",
        "Message Count",
        "Qualified",
        "Conversation ID",
      ];

      const rowData = [
        formattedTimestamp,
        serviceInterest || "",
        institutionType || "",
        email || "",
        conversationSummary || "",
        messageCount || 0,
        qualified ? "Yes" : "No",
        conversationId || "",
      ];

      const csvRow = rowData.map(escapeCSV).join(",") + "\n";

      if (!fileExists) {
        const csvHeader = headers.map(escapeCSV).join(",") + "\n";
        fs.writeFileSync(filePath, csvHeader + csvRow, "utf8");
      } else {
        fs.appendFileSync(filePath, csvRow, "utf8");
      }
    } catch (csvError) {
      console.warn("Failed to write chatbot lead to local CSV file:", csvError);
    }

    // ────────────────────────────────────────────────────────────────
    // 2. Perform External API Integrations (Asynchronously in Background)
    // ────────────────────────────────────────────────────────────────
    const runBackgroundIntegrations = async () => {
      // Google Sheets Webhook (via Google Apps Script Web App)
      const googleWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
      if (googleWebhookUrl) {
        try {
          const response = await fetch(googleWebhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              source: "chatbot",
              timestamp: formattedTimestamp,
              istTime: formattedTimestamp,
              formattedTimestamp: formattedTimestamp,
              isoISTTime,
              serviceInterest: serviceInterest || "",
              institutionType: institutionType || "",
              email: email || "",
              conversationSummary: conversationSummary || "",
              messageCount: messageCount || 0,
              qualified: qualified ? "Yes" : "No",
              conversationId: conversationId || "",
            }),
          });

          if (response.ok) {
            console.log("Google Sheets Webhook succeeded in background");
          } else {
            console.warn("Google Sheets Webhook responded with error status:", response.status);
          }
        } catch (webhookError) {
          console.error("Google Sheets Webhook integration error:", webhookError);
        }
      }
    };

    // Trigger external integrations asynchronously
    runBackgroundIntegrations().catch((err) =>
      console.error("Background integration error:", err)
    );

    return NextResponse.json({ success: true, destination: "local_csv_and_background_initiated" });
  } catch (error: any) {
    console.error("Chatbot Submit Handler Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
