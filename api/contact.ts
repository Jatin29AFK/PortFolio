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
  name?: string;
  email?: string;
  message?: string;
  website?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "shukla.jeetu2550@gmail.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

  if (!resendApiKey) {
    res.status(500).json({ error: "Server email is not configured yet." });
    return;
  }

  const body = normalizeBody(req.body);
  const name = body.name?.trim() ?? "";
  const senderEmail = body.email?.trim() ?? "";
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

  const subject = `Portfolio contact from ${name}`;
  const text = [
    "New portfolio contact form message",
    "",
    `Name: ${name}`,
    `Email: ${senderEmail}`,
    "",
    "Message:",
    message,
  ].join("\n");
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
      <h2>New portfolio contact form message</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(senderEmail)}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

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
      res.status(502).json({ error: "Email delivery failed on the server." });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);
    res.status(500).json({ error: "The server could not send the email." });
  }
}
