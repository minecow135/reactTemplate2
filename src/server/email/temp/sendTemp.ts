import { render } from "@react-email/components";
import { sendEmail } from "../email";
import newUser from "../templates/newUser";

export default async function send() {
  await sendEmail({
    to: "email@example.com",
    subject: "Welcome",
    html: render(newUser()),
  });
}