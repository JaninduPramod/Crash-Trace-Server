import nodemailer from "nodemailer";
import EmailConfig from "../config/emailConfig.js";

const transporter = nodemailer.createTransport({
  host: EmailConfig.host,
  port: EmailConfig.port,
  secure: EmailConfig.secure,
  auth: EmailConfig.auth,
});

/**
 * Sends an email
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML content
 */
export const sendMail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: EmailConfig.from,
      to,
      subject,
      html,
    });

    console.log("Email sent:", info.messageId);
    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error };
  }
};

export default sendMail;
