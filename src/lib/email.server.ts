import { freeBooks, PROMPT_LIBRARY_URL } from "./free-books";
import type { Lang } from "./i18n";

function smtpConfig() {
  const host = process.env["SMTP_HOST"];
  const user = process.env["SMTP_USER"];
  const pass = process.env["SMTP_PASSWORD"] ?? process.env["SMTP_PASS"];
  const from = process.env["SMTP_FROM"] ?? user;
  const port = Number(process.env["SMTP_PORT"] ?? 465);
  if (!host || !user || !pass || !from) return null;
  return { host, user, pass, from, port, secure: port === 465 };
}

function buildHtml(lang: Lang, libraryUrl: string, bundle: boolean) {
  const rtl = lang === "ar";
  const rows = freeBooks
    .map(
      (b) => `
      <tr><td style="padding:10px 0;border-bottom:1px solid #eee">
        <a href="${b.url}" style="color:#0f172a;font-weight:600;text-decoration:none">${b.title}</a>
        <div style="color:#64748b;font-size:13px;margin-top:4px">${b.description}</div>
      </td></tr>`,
    )
    .join("");

  const title = rtl ? "شكراً لشرائك! 🎉" : "Thank you for your purchase! 🎉";
  const intro = rtl
    ? "تجد بالأسفل رابط مكتبتك الخاصة، ومكتبة البرومبتات، وكل المراجع المختارة."
    : "Below is your private library link, the prompt library, and every curated reference.";
  const cta = rtl ? "افتح مكتبتك" : "Open your library";
  const booksTitle = rtl ? "المراجع المختارة" : "Curated references";
  const promptsTitle = rtl ? "مكتبة البرومبتات الخاصة" : "Private prompt library";

  return `<!doctype html><html dir="${rtl ? "rtl" : "ltr"}" lang="${lang}"><body style="margin:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#0f172a">
  <div style="max-width:620px;margin:0 auto;padding:32px 24px">
    <h1 style="font-size:24px;margin:0 0 12px">${title}</h1>
    <p style="color:#475569;line-height:1.8;margin:0 0 24px">${intro}</p>
    <a href="${libraryUrl}" style="display:inline-block;background:#0f172a;color:#fff;padding:14px 28px;border-radius:999px;text-decoration:none;font-weight:600">${cta}</a>
    <h2 style="font-size:16px;margin:32px 0 8px">${promptsTitle}</h2>
    <a href="${PROMPT_LIBRARY_URL}" style="color:#0f172a">${PROMPT_LIBRARY_URL}</a>
    ${
      bundle
        ? `<h2 style="font-size:16px;margin:32px 0 8px">${booksTitle}</h2>
           <table style="width:100%;border-collapse:collapse">${rows}</table>`
        : ""
    }
    <p style="color:#94a3b8;font-size:12px;margin-top:32px">${
      rtl ? "هذا الرابط خاص بك، لا تشاركه." : "This link is personal, please don't share it."
    }</p>
  </div></body></html>`;
}

export async function sendPurchaseEmail(opts: {
  to: string;
  lang: Lang;
  libraryUrl: string;
  bundle: boolean;
}) {
  const cfg = smtpConfig();
  if (!cfg) throw new Error("SMTP credentials are not configured");

  const mailerModule = "worker-mailer";
  const { WorkerMailer } = (await import(/* @vite-ignore */ mailerModule)) as typeof import("worker-mailer");
  const mailer = await WorkerMailer.connect({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    startTls: !cfg.secure,
    credentials: { username: cfg.user, password: cfg.pass },
    authType: ["plain", "login"],
  });

  try {
    await mailer.send({
      from: cfg.from,
      to: opts.to,
      subject:
        opts.lang === "ar"
          ? "كتابك ومكتبتك الخاصة جاهزة 🎉"
          : "Your book and private library are ready 🎉",
      html: buildHtml(opts.lang, opts.libraryUrl, opts.bundle),
      text: `${opts.libraryUrl}\n${PROMPT_LIBRARY_URL}`,
    });
  } finally {
    await mailer.close();
  }
}
