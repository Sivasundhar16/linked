import { mailtrapClient, sender } from "../controllers/mailtrap.js";
import {
  createWelcomeEmailTemplate,
  createCommentNotificationEmailTemplate,
} from "./emailTemplates.js";

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

export const sendCommentNotificationEmail = async (
  recipientEmail,
  recipientName,
  commenterName,
  postUrl,
  commentContent
) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "New comments on your post",
      html: createCommentNotificationEmailTemplate(
        recipientName,
        commenterName,
        postUrl,
        commentContent
      ),
      category: "Comment_notification",
    });
    console.log("comment mail sent succesfully");
  } catch (error) {
    throw error;
  }
};
