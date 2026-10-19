import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";
import nodemailer from "nodemailer";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

// Helper function to send email via Nodemailer (Gmail) or Resend
const sendContactEmail = async (params: {
  name: string;
  email: string;
  contactNumber: string;
  message: string;
  timestamp: string;
}): Promise<boolean> => {
  const { name, email, contactNumber, message, timestamp } = params;
  const targetRecipient = process.env.NOTIFICATION_EMAIL || "info@edify.ae";
  const gmailUser = process.env.GMAIL_USER || targetRecipient;
  const gmailPassword = process.env.GMAIL_APP_PASSWORD;
  const resendApiKey = process.env.RESEND_API_KEY;

  const initials = name
    ? name
        .trim()
        .split(/\s+/)
        .map((part) => part[0]?.toUpperCase())
        .slice(0, 2)
        .join("")
    : "ED";

  const emailSubject = `✦ [New Website Enquiry] ${name || "Contact Lead"} — ${contactNumber || email}`;

  const replyMailto = `mailto:${email}?subject=${encodeURIComponent(`Re: Your Enquiry to Edify EMC - ${name}`)}`;
  const cleanTel = contactNumber ? contactNumber.replace(/[^0-9+]/g, "") : "";

  const textContent = `
NEW CONTACT ENQUIRY — EDIFY MANAGEMENT CONSULTANCY
==================================================

Lead Name:       ${name || "Not provided"}
Email Address:   ${email}
Contact Number:  ${contactNumber || "Not provided"}
Submission Date: ${timestamp}
Lead Channel:    Website Contact Form (Hero Section)

CLIENT MESSAGE (Max 200 chars):
--------------------------------------------------
${message || "(No message entered)"}
--------------------------------------------------

QUICK ACTIONS:
- Reply by Email: ${email}
- Call Lead:      ${contactNumber || "N/A"}

STATUS:
- Logged to: contact_submissions.xlsx & Google Sheets
- Edify Management Consultancy • Business Bay, Dubai, UAE
`;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Website Enquiry — Edify EMC</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #0f172a; -webkit-font-smoothing: antialiased;">
        <!-- Preheader preview text for email clients -->
        <div style="display: none; font-size: 1px; color: #0b0f19; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
          New website enquiry from ${name}: "${message.slice(0, 90)}..."
        </div>

        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0b0f19; padding: 40px 16px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.45); border: 1px solid rgba(232, 201, 122, 0.25);">
                
                <!-- ── Executive Luxury Header ── -->
                <tr>
                  <td style="background: #080c14; padding: 36px 36px 30px; border-bottom: 2px solid #e8c97a;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.3px; line-height: 1.25;">
                            Edify Management Consultancy
                          </h1>
                          <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 12px; letter-spacing: 0.5px;">
                            Executive Advisory & Institution Development
                          </p>
                        </td>
                        <td align="right" valign="top" style="padding-top: 4px;">
                          <div style="width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, rgba(232,201,122,0.2) 0%, rgba(232,201,122,0.05) 100%); border: 1px solid rgba(232,201,122,0.4); text-align: center; line-height: 44px; font-size: 20px;">
                            ✉️
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- ── Lead Profile Spotlight Card ── -->
                <tr>
                  <td style="background-color: #f8fafc; padding: 24px 36px; border-bottom: 1px solid #e2e8f0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="56" valign="middle" style="padding-right: 16px;">
                          <div style="width: 52px; height: 52px; border-radius: 50%; background: #0f172a; border: 2px solid #e8c97a; color: #e8c97a; font-size: 19px; font-weight: 700; text-align: center; line-height: 48px; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);">
                            ${initials}
                          </div>
                        </td>
                        <td valign="middle">
                          <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #0f172a; line-height: 1.2;">
                            ${name || "Anonymous Lead"}
                          </h2>
                          <p style="margin: 3px 0 0 0; font-size: 13px; color: #64748b;">
                            Submitted via <span style="color: #0f172a; font-weight: 600;">Website Contact Form</span>
                          </p>
                        </td>
                        <td align="right" valign="middle">
                          <span style="display: inline-block; padding: 4px 10px; background-color: #e2e8f0; border-radius: 6px; font-size: 11px; font-weight: 600; color: #334155;">
                            ${timestamp}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- ── Notification Body Content ── -->
                <tr>
                  <td style="padding: 32px 36px 28px;">

                    <!-- ── Data Fields Table ── -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; margin-bottom: 24px;">
                      <tr>
                        <td style="padding: 14px 20px; width: 140px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.7px; color: #64748b; background-color: #f8fafc; border-bottom: 1px solid #edf2f7;">
                          👤 Full Name
                        </td>
                        <td style="padding: 14px 20px; font-size: 15px; font-weight: 600; color: #0f172a; border-bottom: 1px solid #edf2f7;">
                          ${name || "Not provided"}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 14px 20px; width: 140px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.7px; color: #64748b; background-color: #f8fafc; border-bottom: 1px solid #edf2f7;">
                          ✉️ Email Address
                        </td>
                        <td style="padding: 14px 20px; font-size: 15px; color: #0f172a; border-bottom: 1px solid #edf2f7;">
                          <a href="mailto:${email}" style="color: #0284c7; text-decoration: none; font-weight: 600;">
                            ${email}
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 14px 20px; width: 140px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.7px; color: #64748b; background-color: #f8fafc; border-bottom: 1px solid #edf2f7;">
                          📞 Contact Number
                        </td>
                        <td style="padding: 14px 20px; font-size: 15px; color: #0f172a; border-bottom: 1px solid #edf2f7;">
                          ${
                            contactNumber
                              ? `<a href="tel:${cleanTel}" style="color: #0f172a; text-decoration: none; font-weight: 600;">${contactNumber}</a>`
                              : "<span style='color: #94a3b8;'>Not provided</span>"
                          }
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 14px 20px; width: 140px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.7px; color: #64748b; background-color: #f8fafc;">
                          🕒 Received At
                        </td>
                        <td style="padding: 14px 20px; font-size: 14px; color: #475569;">
                          ${timestamp}
                        </td>
                      </tr>
                    </table>

                    <!-- ── Client Message Card ── -->
                    <div style="margin-bottom: 28px;">
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 8px;">
                        <tr>
                          <td>
                            <p style="margin: 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #64748b;">
                              💬 Client Message
                            </p>
                          </td>
                          <td align="right">
                            <span style="font-size: 11px; color: #94a3b8; font-weight: 500;">
                              ${message.length} / 200 characters
                            </span>
                          </td>
                        </tr>
                      </table>
                      <div style="background-color: #fcfbf8; border: 1px solid #f1e9d2; border-left: 4px solid #e8c97a; border-radius: 10px; padding: 20px 22px; font-size: 15px; color: #1e293b; line-height: 1.65; white-space: pre-wrap; font-style: normal; box-shadow: inset 0 1px 3px rgba(0,0,0,0.02);">“${message || "(No message entered)"}”</div>
                    </div>

                    <!-- ── Direct Response Buttons ── -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 8px;">
                      <tr>
                        <td>
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding-bottom: 8px;">
                                <a href="${replyMailto}" style="display: inline-block; background: #0f172a; color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none; padding: 13px 26px; border-radius: 50px; box-shadow: 0 4px 10px rgba(15, 23, 42, 0.2);">
                                  ✉ Reply via Email
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  let sent = false;

  // 1. Try Nodemailer with Gmail App Password
  if (gmailPassword) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailPassword,
        },
      });

      const info = await transporter.sendMail({
        from: `"Edify EMC Website" <${gmailUser}>`,
        to: targetRecipient,
        replyTo: email,
        subject: emailSubject,
        text: textContent,
        html: htmlContent,
      });

      console.log("Contact Enquiry Email sent successfully via Gmail/Nodemailer:", info.messageId);
      sent = true;
    } catch (nmErr: any) {
      console.error("Nodemailer failed to send email:", nmErr?.message || nmErr);
    }
  }

  // 2. Fallback to Resend if available and not yet sent
  if (!sent && resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      const resendResult = await resend.emails.send({
        from: "Edify EMC <onboarding@resend.dev>",
        to: [targetRecipient],
        replyTo: email,
        subject: emailSubject,
        text: textContent,
        html: htmlContent,
      });

      if (resendResult.error) {
        console.error("Resend returned error:", resendResult.error);
      } else {
        console.log("Contact Enquiry Email sent successfully via Resend:", resendResult.data?.id);
        sent = true;
      }
    } catch (resendErr: any) {
      console.error("Resend failed to send email:", resendErr?.message || resendErr);
    }
  }

  if (!sent && !gmailPassword && !resendApiKey) {
    console.warn("No mail credentials found (GMAIL_APP_PASSWORD or RESEND_API_KEY). Email notification skipped.");
  }

  return sent;
};

// Helper function to send confirmation email to the user / applicant
const sendUserConfirmationEmail = async (params: {
  name: string;
  email: string;
  contactNumber: string;
  message: string;
}): Promise<boolean> => {
  const { name, email, contactNumber, message } = params;
  if (!email || !email.includes("@")) return false;

  const targetSender = process.env.NOTIFICATION_EMAIL || "info@edify.ae";
  const gmailUser = process.env.GMAIL_USER || targetSender;
  const gmailPassword = process.env.GMAIL_APP_PASSWORD;
  const resendApiKey = process.env.RESEND_API_KEY;

  const emailSubject = `Enquiry Received — Edify Management Consultancy`;

  const textContent = `
Dear ${name || "Valued Client"},

Thank you for contacting Edify Management Consultancy.
We have successfully received your enquiry, and our advisory team will review your message and get back to you shortly.

Submission Summary:
- Name: ${name || "Not provided"}
- Email: ${email}
- Contact Number: ${contactNumber || "Not provided"}
- Message: ${message || "(No message entered)"}

If you have any urgent questions, feel free to reply directly to this email or contact info@edify.ae.

Warm regards,
Edify Management Consultancy Team
Business Bay, Dubai, United Arab Emirates
www.edifyemc.com
`;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Enquiry Received — Edify Management Consultancy</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; -webkit-font-smoothing: antialiased;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 16px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
                <tr>
                  <td style="background: #080c14; padding: 32px 36px; border-bottom: 2px solid #e8c97a;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: -0.3px;">
                      Edify Management Consultancy
                    </h1>
                    <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 13px;">
                      Executive Advisory &amp; Institution Development
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 36px 36px 28px;">
                    <h2 style="margin: 0 0 14px; font-size: 20px; font-weight: 700; color: #0f172a;">
                      Enquiry Received
                    </h2>
                    <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #334155;">
                      Dear ${name || "Valued Client"},
                    </p>
                    <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.6; color: #334155;">
                      Thank you for getting in touch with <strong>Edify Management Consultancy</strong>. We have successfully received your enquiry, and our advisory team will review your message and connect with you shortly.
                    </p>

                    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 22px; margin-bottom: 24px;">
                      <p style="margin: 0 0 10px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; color: #64748b;">
                        Your Submission Summary:
                      </p>
                      <table width="100%" cellpadding="4" cellspacing="0" style="font-size: 14px; color: #1e293b;">
                        <tr>
                          <td width="130" style="color: #64748b; font-weight: 500;">Name:</td>
                          <td style="font-weight: 600;">${name || "Not provided"}</td>
                        </tr>
                        <tr>
                          <td style="color: #64748b; font-weight: 500;">Email:</td>
                          <td>${email}</td>
                        </tr>
                        ${contactNumber ? `<tr><td style="color: #64748b; font-weight: 500;">Contact Number:</td><td>${contactNumber}</td></tr>` : ""}
                        <tr>
                          <td valign="top" style="color: #64748b; font-weight: 500; padding-top: 6px;">Message:</td>
                          <td style="padding-top: 6px; color: #334155; line-height: 1.5;">${message || "(No message entered)"}</td>
                        </tr>
                      </table>
                    </div>

                    <p style="margin: 0 0 20px; font-size: 14px; line-height: 1.6; color: #64748b;">
                      If you have any urgent requirements or additional questions, you can reply directly to this email or reach us at <a href="mailto:info@edify.ae" style="color: #0284c7; text-decoration: none; font-weight: 500;">info@edify.ae</a>.
                    </p>

                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />

                    <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #334155;">
                      Warm regards,<br />
                      <strong>Edify Management Consultancy Team</strong><br />
                      <span style="font-size: 12px; color: #64748b;">Business Bay, Dubai, United Arab Emirates</span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  let sent = false;

  // 1. Try Nodemailer with Gmail App Password
  if (gmailPassword) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailPassword,
        },
      });

      const info = await transporter.sendMail({
        from: `"Edify Management Consultancy" <${gmailUser}>`,
        to: email,
        replyTo: "info@edify.ae",
        subject: emailSubject,
        text: textContent,
        html: htmlContent,
      });

      console.log("Confirmation email sent to user via Gmail/Nodemailer:", info.messageId);
      sent = true;
    } catch (nmErr: any) {
      console.error("Nodemailer failed to send user confirmation email:", nmErr?.message || nmErr);
    }
  }

  // 2. Fallback to Resend
  if (!sent && resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      const resendResult = await resend.emails.send({
        from: "Edify EMC <onboarding@resend.dev>",
        to: [email],
        replyTo: "info@edify.ae",
        subject: emailSubject,
        text: textContent,
        html: htmlContent,
      });

      if (resendResult.error) {
        console.error("Resend user confirmation error:", resendResult.error);
      } else {
        console.log("Confirmation email sent to user via Resend:", resendResult.data?.id);
        sent = true;
      }
    } catch (resendErr: any) {
      console.error("Resend failed to send user confirmation email:", resendErr?.message || resendErr);
    }
  }

  return sent;
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

    const {
      name,
      email,
      countryCode,
      contactNumber,
      fullContactNumber,
      message,
      howCanWeHelp,
      company,
      submittedAt,
    } = data || {};

    const resolvedMessage = (message || howCanWeHelp || "Consultation enquiry from website").trim();

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Determine final phone representation cleanly avoiding duplicate country codes
    let displayContactNumber = (fullContactNumber || contactNumber || "").trim();
    if (countryCode && contactNumber && !fullContactNumber) {
      displayContactNumber = contactNumber.startsWith(countryCode)
        ? contactNumber
        : `${countryCode} ${contactNumber}`;
    }

    // Enforce 200 character maximum limit for message
    const trimmedMessage = resolvedMessage.slice(0, 200);

    const timestamp = getISTTimestamp(submittedAt);
    let dateObj = new Date();
    if (submittedAt) {
      const parsed = new Date(submittedAt);
      if (!isNaN(parsed.getTime())) dateObj = parsed;
    }
    const istOffsetMs = 5 * 60 * 60 * 1000 + 30 * 60 * 1000;
    const istOffsetDate = new Date(dateObj.getTime() + istOffsetMs);
    const isoISTTime = istOffsetDate.toISOString().replace("Z", "+05:30");
    const excelTimestamp = timestamp.replace(" IST", "");

    console.log(
      "New Contact Submission:",
      JSON.stringify({ timestamp, name, email, contactNumber: displayContactNumber, message: trimmedMessage })
    );

    // 1. Fast persistence: append to CSV synchronously (takes ~1ms, ensuring no data loss)
    try {
      const csvPath = path.join(process.cwd(), "contact_submissions.csv");
      const fileExists = fs.existsSync(csvPath);

      const headers = ["Timestamp", "Name", "Email ID", "Contact Number", "Message"];
      const rowData = [
        timestamp,
        name || "",
        email || "",
        displayContactNumber,
        trimmedMessage || "",
      ];
      const csvRow = rowData.map(escapeCSV).join(",") + "\n";

      if (!fileExists) {
        const csvHeader = headers.map(escapeCSV).join(",") + "\n";
        fs.writeFileSync(csvPath, csvHeader + csvRow, "utf8");
      } else {
        fs.appendFileSync(csvPath, csvRow, "utf8");
      }
    } catch (csvError) {
      console.warn("Failed to write contact submission to local CSV file:", csvError);
    }

    // Helper to update Excel workbook
    const saveToExcel = () => {
      try {
        const xlsxPath = path.join(process.cwd(), "contact_submissions.xlsx");
        const SHEET_NAME = "Contact Submissions";
        const headers = ["Timestamp", "Name", "Email ID", "Contact Number", "Message"];
        const newRow = [
          timestamp,
          name || "",
          email || "",
          displayContactNumber,
          trimmedMessage || "",
        ];

        let workbook: XLSX.WorkBook;

        if (fs.existsSync(xlsxPath)) {
          try {
            const fileData = fs.readFileSync(xlsxPath);
            workbook = XLSX.read(fileData, { type: "buffer" });
          } catch (readErr) {
            console.warn("Could not parse existing xlsx, creating fresh workbook:", readErr);
            workbook = XLSX.utils.book_new();
          }
        } else {
          workbook = XLSX.utils.book_new();
        }

        if (!workbook.SheetNames.includes(SHEET_NAME)) {
          const sheetData = [headers, newRow];
          const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
          worksheet["!cols"] = [
            { wch: 24 }, // Timestamp
            { wch: 22 }, // Name
            { wch: 28 }, // Email ID
            { wch: 20 }, // Contact Number
            { wch: 45 }, // Message
          ];
          XLSX.utils.book_append_sheet(workbook, worksheet, SHEET_NAME);
        } else {
          const worksheet = workbook.Sheets[SHEET_NAME];
          XLSX.utils.sheet_add_aoa(worksheet, [newRow], { origin: -1 });
        }

        const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
        fs.writeFileSync(xlsxPath, buffer);
        console.log("Contact submission saved to Excel (.xlsx):", xlsxPath);
      } catch (xlsxError) {
        console.warn("Failed to write contact submission to local Excel file:", xlsxError);
      }
    };


    // 3. Perform External API Integrations & Email Sending in Background
    const runBackgroundIntegrations = async () => {
      // A. Send Automated Admin Email Notification
      await sendContactEmail({
        name: name || "",
        email: email || "",
        contactNumber: displayContactNumber,
        message: trimmedMessage || "",
        timestamp,
      });

      // B. Send Confirmation Email to Applicant / User
      if (email && email.trim()) {
        await sendUserConfirmationEmail({
          name: name || "",
          email: email.trim(),
          contactNumber: displayContactNumber,
          message: trimmedMessage || "",
        });
      }

      // C. Google Sheets Webhook (Cloud Spreadsheet)
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
              howCanWeHelp: trimmedMessage || "",
              requestDetails: trimmedMessage || "",
              countryCode: countryCode || "",
              contactNumber: contactNumber || displayContactNumber,
              designation: "",
              institutionType: "",
              serviceRequired: "Contact Us Enquiry",
            }),
          });

          if (response.ok) {
            console.log("Google Sheets Webhook succeeded for Contact Form");
          } else {
            console.warn("Google Sheets Webhook responded with error status for Contact Form:", response.status);
          }
        } catch (webhookError) {
          console.error("Google Sheets Webhook integration error for Contact Form:", webhookError);
        }
      }

      // C. Microsoft Graph API (SharePoint Online Excel)
      const tenantId = process.env.SHAREPOINT_TENANT_ID;
      const clientId = process.env.SHAREPOINT_CLIENT_ID;
      const clientSecret = process.env.SHAREPOINT_CLIENT_SECRET;
      const driveId = process.env.SHAREPOINT_DRIVE_ID;
      const itemId = process.env.SHAREPOINT_ITEM_ID;

      if (tenantId && clientId && clientSecret && driveId && itemId) {
        try {
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

          if (tokenResponse.ok) {
            const tokenData = await tokenResponse.json();
            const accessToken = tokenData.access_token;

            const usedRangeUrl = `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${itemId}/workbook/worksheets('Sheet1')/usedRange`;
            const rangeResponse = await fetch(usedRangeUrl, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
              },
            });

            let targetRow = 1;
            if (rangeResponse.ok) {
              const rangeData = await rangeResponse.json();
              targetRow = (rangeData.rowCount || 0) + 1;
            }

            const writeUrl = `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${itemId}/workbook/worksheets('Sheet1')/range(address='A${targetRow}:J${targetRow}')`;
            await fetch(writeUrl, {
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
                    countryCode || "",
                    contactNumber || displayContactNumber,
                    email || "",
                    "",
                    "",
                    company || "",
                    "Contact Us Enquiry",
                    trimmedMessage || "",
                  ],
                ],
              }),
            });
            console.log("SharePoint Excel write completed for Contact Form");
          }
        } catch (graphError) {
          console.error("Microsoft Graph integration error for Contact Form:", graphError);
        }
      }
    };

    // Fire background tasks (Excel, Email, Google Sheets, SharePoint) asynchronously without blocking HTTP response
    setTimeout(() => {
      try {
        saveToExcel();
      } catch (e) {
        console.error("Excel save error:", e);
      }
      runBackgroundIntegrations().catch((err) =>
        console.error("Background integration error:", err)
      );
    }, 10);

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully",
    });
  } catch (error: any) {
    console.error("Submit Handler Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
