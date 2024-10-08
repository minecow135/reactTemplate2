import { env } from "~/env";
import nodemailer from "nodemailer"

type EmailPayload = {
  replyTo?: string | string[]
  to?: string | string[]
  cc?: string | string[]
  bcc?: string | string[]
  subject: string
  html: string
}

// Replace with your SMTP credentials

const smtpOptions = {
  host: env.SMTP_HOST || "smtp.mailtrap.io",
  port: parseInt(env.SMTP_PORT || "2525"),
  secure: Boolean(JSON.parse(env.SMTP_SECURE)),
  auth: {
    user: env.SMTP_USER || "user",
    pass: env.SMTP_PASSWORD || "password",
  },
}

export const sendEmail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  })

  return await transporter.sendMail({
    from: env.SMTP_FROM_EMAIL,
    ...data,
  })
}
