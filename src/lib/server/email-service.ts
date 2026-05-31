import { hasBrevoEnv } from "@/lib/server/env";
import { getAppUrl } from "@/lib/server/env";

type EmailRecipient = {
  email: string;
  name?: string | null;
};

type SendEmailInput = {
  to: EmailRecipient;
  subject: string;
  htmlContent: string;
  textContent: string;
  tags?: string[];
};

function parseSender(value: string) {
  const match = value.match(/^(.*)<(.+)>$/);

  if (!match) {
    return {
      email: value.trim(),
      name: "Summit Gear",
    };
  }

  return {
    name: match[1].trim(),
    email: match[2].trim(),
  };
}

export async function sendTransactionalEmail(input: SendEmailInput) {
  if (!hasBrevoEnv()) {
    const isLocalApp = getAppUrl().includes("localhost") || getAppUrl().includes("127.0.0.1");

    if (process.env.NODE_ENV === "production" && !isLocalApp) {
      throw new Error("Brevo email configuration is missing.");
    }

    console.warn(`[email:skipped] ${input.subject} -> ${input.to.email}`);
    return {
      skipped: true,
    };
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY!,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: parseSender(process.env.EMAIL_FROM!),
      to: [
        {
          email: input.to.email,
          name: input.to.name ?? undefined,
        },
      ],
      subject: input.subject,
      htmlContent: input.htmlContent,
      textContent: input.textContent,
      tags: input.tags,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Brevo email failed with ${response.status}: ${body}`);
  }

  return response.json();
}

export async function sendVerificationEmail(input: { email: string; name?: string | null; verificationUrl: string }) {
  return sendTransactionalEmail({
    to: {
      email: input.email,
      name: input.name,
    },
    subject: "Verifikasi email Summit Gear",
    htmlContent: `
      <p>Halo ${input.name ?? "Pendaki"},</p>
      <p>Klik link berikut untuk memverifikasi email akun Summit Gear.</p>
      <p><a href="${input.verificationUrl}">Verifikasi Email</a></p>
      <p>Link berlaku selama 24 jam.</p>
    `,
    textContent: `Verifikasi email Summit Gear: ${input.verificationUrl}`,
    tags: ["summit-gear", "email-verification"],
  });
}

export async function sendPasswordResetEmail(input: { email: string; name?: string | null; resetUrl: string }) {
  return sendTransactionalEmail({
    to: {
      email: input.email,
      name: input.name,
    },
    subject: "Reset password Summit Gear",
    htmlContent: `
      <p>Halo ${input.name ?? "Pendaki"},</p>
      <p>Klik link berikut untuk mengganti password akun Summit Gear.</p>
      <p><a href="${input.resetUrl}">Reset Password</a></p>
      <p>Link berlaku selama 1 jam. Abaikan email ini jika kamu tidak meminta reset password.</p>
    `,
    textContent: `Reset password Summit Gear: ${input.resetUrl}`,
    tags: ["summit-gear", "password-reset"],
  });
}
