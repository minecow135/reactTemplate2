import { render } from "@react-email/components";
import { sendEmail } from "../email";
import newUser from "../templates/newUser";

export default async function send() {
  await sendEmail({
    replyTo: "reply@example.com",
    to: ["to@example.com"],
    bcc: [
      "bcc1@example.com",
      "bcc2@example.com",
      "bcc3@example.com",
    ],
    subject: "Welcome",
    html: render(newUser()),
  });
}