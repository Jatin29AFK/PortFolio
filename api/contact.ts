type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  setHeader: (name: string, value: string | string[]) => void;
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
};

type ContactPayload = {
  type?: string;
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  preferredTime?: string;
  message?: string;
  website?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const defaultToEmail = "shukla.jeetu2550@gmail.com";

function normalizeBody(body: unknown): ContactPayload {
  if (!body) return {};
  if (typeof body === "string") {
    try {
      return JSON.parse(body) as ContactPayload;
    } catch {
      return {};
    }
  }
  if (typeof body === "object") {
    return body as ContactPayload;
  }
  return {};
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function sendViaFormSubmit({
  toEmail,
  typeLabel,
  name,
  senderEmail,
  company,
  role,
  preferredTime,
  message,
}: {
  toEmail: string;
  typeLabel: string;
  name: string;
  senderEmail: string;
  company: string;
  role: string;
  preferredTime: string;
  message: string;
}) {
  const formSubmitResponse = await fetch(`https://formsubmit.co/ajax/${toEmail}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _subject: typeLabel === "Interview request" ? `Interview request from ${name}` : `Portfolio contact from ${name}`,
      _captcha: "false",
      _template: "table",
      _replyto: senderEmail,
      type: typeLabel,
      name,
      email: senderEmail,
      company: company || "Not provided",
      role: role || "Not provided",
      preferredTime: preferredTime || "Not provided",
      message,
    }),
  });

  if (!formSubmitResponse.ok) {
    const errorText = await formSubmitResponse.text();
    console.error("FormSubmit API error:", errorText);
    return false;
  }

  return true;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || defaultToEmail;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

  const body = normalizeBody(req.body);
  const type = body.type === "interview" ? "interview" : "message";
  const name = body.name?.trim() ?? "";
  const senderEmail = body.email?.trim() ?? "";
  const company = body.company?.trim() ?? "";
  const role = body.role?.trim() ?? "";
  const preferredTime = body.preferredTime?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  const website = body.website?.trim() ?? "";

  if (website) {
    res.status(200).json({ ok: true });
    return;
  }

  if (!name || !senderEmail || !message) {
    res.status(400).json({ error: "Please fill all fields." });
    return;
  }

  if (!emailPattern.test(senderEmail)) {
    res.status(400).json({ error: "Please enter a valid email address." });
    return;
  }

  if (type === "interview" && (!role || !preferredTime)) {
    res.status(400).json({ error: "Please add the role and preferred interview time." });
    return;
  }

  const subject = type === "interview" ? `Interview request from ${name}` : `Portfolio contact from ${name}`;
  const typeLabel = type === "interview" ? "Interview request" : "Portfolio message";
  const detailLines = [
    `Type: ${typeLabel}`,
    `Name: ${name}`,
    `Email: ${senderEmail}`,
    company ? `Company: ${company}` : "",
    role ? `Role: ${role}` : "",
    preferredTime ? `Preferred interview time: ${preferredTime}` : "",
  ].filter(Boolean);
  const text = [
    `New ${typeLabel.toLowerCase()}`,
    "",
    ...detailLines,
    "",
    "Message:",
    message,
  ].join("\n");
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
      <h2>New ${escapeHtml(typeLabel)}</h2>
      <p><strong>Type:</strong> ${escapeHtml(typeLabel)}</p>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(senderEmail)}</p>
      ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
      ${role ? `<p><strong>Role:</strong> ${escapeHtml(role)}</p>` : ""}
      ${preferredTime ? `<p><strong>Preferred interview time:</strong> ${escapeHtml(preferredTime)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  const fallbackPayload = {
    toEmail,
    typeLabel,
    name,
    senderEmail,
    company,
    role,
    preferredTime,
    message,
  };

  if (!resendApiKey) {
    const sent = await sendViaFormSubmit(fallbackPayload);
    res.status(sent ? 200 : 502).json(sent ? { ok: true, provider: "formsubmit" } : { error: "Email delivery failed on the server." });
    return;
  }

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: senderEmail,
        subject,
        text,
        html,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error("Resend API error:", errorText);
      const sent = await sendViaFormSubmit(fallbackPayload);
      res.status(sent ? 200 : 502).json(sent ? { ok: true, provider: "formsubmit" } : { error: "Email delivery failed on the server." });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);
    const sent = await sendViaFormSubmit(fallbackPayload);
    res.status(sent ? 200 : 500).json(sent ? { ok: true, provider: "formsubmit" } : { error: "The server could not send the email." });
  }
}
