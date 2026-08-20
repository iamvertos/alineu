const RESEND_ENDPOINT = "https://api.resend.com/emails";
const FROM = "AlineU Website <testing@demo.iidcstudent.online>";
const TO = "marketingvertos@gmail.com";

type Lead = {
  name: string;
  phone: string;
  preferred_date: string | null;
  message: string | null;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function istTimestamp(): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());
}

function row(label: string, value: string): string {
  return `<tr>
      <td style="padding:10px 0;color:#6b7a63;font-size:13px;width:140px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;color:#1F2E17;font-size:15px;font-weight:600;">${value}</td>
    </tr>`;
}

function buildHtml(lead: Lead): string {
  const phone = escapeHtml(lead.phone);
  const telHref = `tel:${lead.phone.replace(/[^0-9+]/g, "")}`;

  return `<!doctype html>
<html><body style="margin:0;background:#f4f7f2;font-family:Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f2;padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 12px 30px rgba(31,46,23,0.08);">
        <tr><td style="background:#507A34;padding:24px 28px;">
          <div style="color:#ffffff;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;">AlineU Physiotherapy</div>
          <div style="color:#ffffff;font-size:22px;font-weight:700;margin-top:6px;">New appointment request</div>
        </td></tr>
        <tr><td style="padding:24px 28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${row("Name", escapeHtml(lead.name))}
            ${row("Phone", `<a href="${telHref}" style="color:#507A34;text-decoration:none;">${phone}</a>`)}
            ${row("Preferred date", lead.preferred_date ? escapeHtml(lead.preferred_date) : "Not specified")}
            ${row("Message", lead.message ? escapeHtml(lead.message).replace(/\n/g, "<br/>") : "—")}
            ${row("Received", escapeHtml(istTimestamp()) + " IST")}
          </table>
          <div style="margin-top:24px;">
            <a href="https://alineu.lovable.app/admin/leads" style="display:inline-block;background:#507A34;color:#ffffff;text-decoration:none;padding:13px 26px;border-radius:999px;font-weight:600;font-size:15px;">Open leads dashboard</a>
          </div>
        </td></tr>
        <tr><td style="padding:18px 28px;background:#f4f7f2;color:#6b7a63;font-size:12px;">
          Sent automatically from the AlineU website appointment form.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export async function sendAppointmentNotification(lead: Lead): Promise<void> {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) {
    console.error("[appointments] RESEND_API_KEY is not configured");
    return;
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      subject: `New appointment request — ${lead.name}`,
      html: buildHtml(lead),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend request failed [${response.status}]: ${body}`);
  }
}
