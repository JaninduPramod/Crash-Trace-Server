import dotenv from "dotenv";
dotenv.config();

export default {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  from: `"Your App Name" <${process.env.MAIL_USER}>`,
};
