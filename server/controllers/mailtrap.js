import { MailtrapClient as MailtrapSDK } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.MAIL_TOKEN;

// Rename the instance to avoid conflict
export const mailClient = new MailtrapSDK({
  token: TOKEN,
});

export const sender = {
  email: process.env.EMAIL_FROM,
  name: process.env.EMAIL_FROM_NAME,
};
