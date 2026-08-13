import type { Lang, ProductId } from "./i18n";
import { PRICING } from "./i18n";

const enc = new TextEncoder();

async function hmacHex(secret: string, message: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const kashierMode = () =>
  (process.env["KASHIER_MODE"] ?? "test").toLowerCase() === "live" ? "live" : "test";

export const kashierCurrency = () => (process.env["KASHIER_CURRENCY"] ?? "EGP").toUpperCase();

/**
 * Price charged through Kashier. Defaults to the site pricing table, but each
 * product/language pair can be overridden (e.g. KASHIER_PRICE_BOOK_AR=499)
 * so the local-currency price does not have to match the USD sticker price.
 */
export function priceOf(lang: Lang, product: ProductId) {
  const override = process.env[`KASHIER_PRICE_${product.toUpperCase()}_${lang.toUpperCase()}`];
  const parsed = override ? Number(override) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : PRICING[lang][product];
}

type CreatePaymentArgs = {
  email: string;
  lang: Lang;
  product: ProductId;
  origin: string;
  purchaseId: string;
  amount: number;
};

/** Builds a Kashier hosted payment page URL for this order. */
export async function createKashierPayment({
  email,
  lang,
  product,
  origin,
  purchaseId,
  amount,
}: CreatePaymentArgs) {
  const merchantId = process.env["KASHIER_MERCHANT_ID"];
  const apiKey = process.env["KASHIER_API_KEY"];
  if (!merchantId) throw new Error("KASHIER_MERCHANT_ID is not configured");
  if (!apiKey) throw new Error("KASHIER_API_KEY is not configured");

  const currency = kashierCurrency();
  const orderId = purchaseId;
  const amountStr = amount.toFixed(2);

  const path = `/?payment=${merchantId}.${orderId}.${amountStr}.${currency}`;
  const hash = await hmacHex(apiKey, path);

  const params = new URLSearchParams({
    merchantId,
    orderId,
    amount: amountStr,
    currency,
    hash,
    mode: kashierMode(),
    merchantRedirect: `${origin}/${lang}/thank-you?p=${purchaseId}`,
    failureRedirect: `${origin}/${lang}/thank-you?p=${purchaseId}`,
    serverWebhook: `${origin}/api/public/kashier-webhook`,
    redirectMethod: "get",
    allowedMethods: process.env["KASHIER_ALLOWED_METHODS"] ?? "card,wallet,bank_installments",
    display: lang === "ar" ? "ar" : "en",
    customerEmail: email,
    metaData: JSON.stringify({ purchase_id: purchaseId, lang, product }),
  });

  return {
    url: `https://checkout.kashier.io/?${params.toString()}`,
    paymentId: orderId,
  };
}

type WebhookData = {
  status?: string;
  merchantOrderId?: string;
  orderId?: string;
  transactionId?: string;
  orderReference?: string;
  amount?: number | string;
  currency?: string;
  card?: { cardInfo?: { cardDataToken?: string; maskedCard?: string; cardBrand?: string } };
  metaData?: Record<string, string> | string;
};

/** Verifies the x-kashier-signature header against the webhook payload. */
export async function verifyKashierWebhook(data: WebhookData, headers: Headers) {
  const apiKey = process.env["KASHIER_API_KEY"];
  const signature = headers.get("x-kashier-signature");
  if (!apiKey || !signature) return false;

  const info = data.card?.cardInfo ?? {};
  const queryString =
    `&paymentStatus=${data.status ?? ""}` +
    `&cardDataToken=${info.cardDataToken ?? ""}` +
    `&maskedCard=${info.maskedCard ?? ""}` +
    `&merchantOrderId=${data.merchantOrderId ?? ""}` +
    `&orderId=${data.orderId ?? ""}` +
    `&cardBrand=${info.cardBrand ?? ""}` +
    `&orderReference=${data.orderReference ?? ""}` +
    `&transactionId=${data.transactionId ?? ""}` +
    `&amount=${data.amount ?? ""}` +
    `&currency=${data.currency ?? ""}`;

  const expected = await hmacHex(apiKey, queryString);
  return expected.toLowerCase() === signature.toLowerCase();
}
