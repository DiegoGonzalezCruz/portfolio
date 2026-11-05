"use server";

import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { awsCredentialsProvider } from "@vercel/oidc-aws-credentials-provider";
import { checkBotId } from "botid/server";
import { serviceOptions } from "@/data/services";
import { site } from "@/data/site";

type Field = "name" | "email" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  /** True only when a real inquiry was delivered (not the honeypot path); drives Ads conversions. */
  lead?: boolean;
  message?: string;
  fieldErrors?: Partial<Record<Field, string>>;
  /** Echoed back on error so the form keeps what the visitor typed. */
  values?: Record<Field | "service", string>;
};

const LIMITS = { name: 100, email: 254, message: 2000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// The name is echoed into the auto-reply, so keep it to a plain name.
const URL_LIKE_RE = /(https?:\/\/|www\.|\.[a-z]{2,}\/|[<>@])/i;

let client: SESv2Client | undefined;

function sesClient() {
  if (!client) {
    const roleArn = process.env.AWS_ROLE_ARN;
    client = new SESv2Client({
      // Must match var.aws_region in infra/.
      region: "us-east-1",
      // On Vercel: short-lived credentials via OIDC federation, assuming the
      // send-only role from infra/ (no stored access keys). Locally, with no
      // AWS_ROLE_ARN, the default AWS credential chain (your CLI profile) is used.
      ...(roleArn ? { credentials: awsCredentialsProvider({ roleArn }) } : {}),
    });
  }
  return client;
}

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function sendEmail({
  to,
  subject,
  body,
  replyTo,
}: {
  to: string;
  subject: string;
  body: string;
  replyTo?: string;
}) {
  return sesClient().send(
    new SendEmailCommand({
      FromEmailAddress: `${site.name} <${site.email}>`,
      Destination: { ToAddresses: [to] },
      ReplyToAddresses: replyTo ? [replyTo] : undefined,
      Content: {
        Simple: {
          Subject: { Data: subject, Charset: "UTF-8" },
          Body: { Text: { Data: body, Charset: "UTF-8" } },
        },
      },
    }),
  );
}

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field.
  if (text(formData, "website")) {
    return { status: "success" };
  }

  const values = {
    // Collapse whitespace/control characters so the name stays a single line.
    name: text(formData, "name").replace(/[\s\p{Cc}]+/gu, " "),
    email: text(formData, "email"),
    message: text(formData, "message"),
    // Optional; anything outside the allowlist is dropped rather than echoed into email.
    service: serviceOptions.some((o) => o.value === text(formData, "service"))
      ? text(formData, "service")
      : "",
  };
  const serviceLabel =
    serviceOptions.find((o) => o.value === values.service)?.label ?? "Not specified";

  // Vercel BotID (token attached by src/instrumentation-client.ts). Checked
  // before validation so the bot path can be tested in production without
  // sending email. Always "human" in local dev. If the check itself fails,
  // let the message through: the firewall rate limit still applies.
  let isBot = false;
  try {
    ({ isBot } = await checkBotId());
  } catch (error) {
    console.error("[contact] BotID check failed; allowing", error);
  }
  if (isBot) {
    return {
      status: "error",
      message: `Sorry, the form couldn't verify your message. Please email me directly at ${site.email}.`,
      values,
    };
  }

  const fieldErrors: ContactState["fieldErrors"] = {};
  if (!values.name) fieldErrors.name = "Please tell me your name.";
  else if (values.name.length > LIMITS.name)
    fieldErrors.name = `Please keep it under ${LIMITS.name} characters.`;
  else if (URL_LIKE_RE.test(values.name)) fieldErrors.name = "Just your name, please.";

  if (!values.email) fieldErrors.email = "I need an email to reply to.";
  else if (values.email.length > LIMITS.email || !EMAIL_RE.test(values.email))
    fieldErrors.email = "Please review your email format.";

  if (!values.message) fieldErrors.message = "What would you like to talk about?";
  else if (values.message.length > LIMITS.message)
    fieldErrors.message = `Please keep it under ${LIMITS.message} characters.`;

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors, values };
  }

  const date = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "long",
    timeStyle: "short",
  });

  try {
    await sendEmail({
      to: site.email,
      replyTo: values.email,
      subject: `New inquiry (${serviceLabel}): ${values.name}`,
      body: `New inquiry from ${site.url} (${date} ET)\n\nName: ${values.name}\nEmail: ${values.email}\nNeeds: ${serviceLabel}\n\n${values.message}\n`,
    });
  } catch (error) {
    console.error("[contact] failed to deliver notification email", error);
    return {
      status: "error",
      message: `Something went wrong sending your message. You can email me directly at ${site.email}.`,
      values,
    };
  }

  try {
    await sendEmail({
      to: values.email,
      subject: "Thanks for reaching out",
      body: `Hi ${values.name},

Thanks for reaching out. I've received your message and will get back to you soon.

All the best,

${site.name}
${site.tagline}
${site.location.city}, ${site.location.regionName}
${site.url}
`,
    });
  } catch (error) {
    // The message reached Diego; a failed auto-reply shouldn't fail the form.
    console.error("[contact] failed to send auto-reply", error);
  }

  return { status: "success", lead: true };
}
