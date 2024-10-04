import { MailtrapClient, sender } from "../controllers/mailtrap";

export const sendWelcomeEmail = async (email, name, profileUrl) => {
  const recipient = [{ email }];
};

try {
  const response = await MailtrapClient({
    from: sender,
    to: recipient,
    subject: "Welcome to LinkedIn",
    html: createWelcomeEmailTemplate(name, profileUrl),
    category: "welcome",
  });

  console.log("Email send Sucessfully", response);
} catch (error) {
  throw error;
}
