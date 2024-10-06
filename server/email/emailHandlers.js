import { mailtrapClient, sender } from "../controllers/mailtrap.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, profileUrl) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Welcome to LinkedIn",
      html: createWelcomeEmailTemplate(name, profileUrl), // inga text ah kuduthe email la text ah send panalam . html iruntha nalla design panna page ah send panalam
      category: "welcome",
    });

    console.log("Email send Sucessfully", response);
  } catch (error) {
    throw error;
  }
};

// vsivasundhar002@gmail.com
// b5d2836fe1be7a51abee11d5764abfb0;
