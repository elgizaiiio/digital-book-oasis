import type { Lang, ProductId } from "./i18n";
import { PRICING } from "./i18n";

export function dodoBaseUrl() {
  const mode = (process.env["DODO_MODE"] ?? "test").toLowerCase();
  return mode === "live" ? "https://live.dodopayments.com" : "https://test.dodopayments.com";
}

export function dodoProductId(lang: Lang, product: ProductId) {
  const key = `DODO_PRODUCT_${product.toUpperCase()}_${lang.toUpperCase()}`;
  return process.env[key] ?? process.env[`DODO_PRODUCT_${product.toUpperCase()}`] ?? null;
}

type CreatePaymentArgs = {
  email: string;
  lang: Lang;
  product: ProductId;
  origin: string;
  purchaseId: string;
};

/** Creates a Dodo hosted payment link and returns its URL + payment id. */
export async function createDodoPayment({
  email,
  lang,
  product,
  origin,
  purchaseId,
}: CreatePaymentArgs) {
  const apiKey = process.env["DODO_API_KEY"];
  if (!apiKey) throw new Error("DODO_API_KEY is not configured");

  const productId = dodoProductId(lang, product);
  if (!productId) throw new Error(`Missing Dodo product id for ${product}/${lang}`);

  const res = await fetch(`${dodoBaseUrl()}/payments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      payment_link: true,
      billing: { city: "", country: "US", state: "", street: "", zipcode: "" },
      customer: { email, name: email.split("@")[0] },
      product_cart: [{ product_id: productId, quantity: 1 }],
      return_url: `${origin}/${lang}/thank-you?p=${purchaseId}`,
      metadata: { purchase_id: purchaseId, lang, product },
    }),
  });

  if (!res.ok) {
    throw new Error(`Dodo error ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }

  const json = (await res.json()) as { payment_link?: string; payment_id?: string };
  if (!json.payment_link) throw new Error("Dodo did not return a payment link");

  return { url: json.payment_link, paymentId: json.payment_id ?? null };
}

export const priceOf = (lang: Lang, product: ProductId) => PRICING[lang][product];

/** Standard Webhooks signature verification (Dodo Payments). */
export async function verifyDodoWebhook(
  rawBody: string,
  headers: Headers,
  secret: string,
): Promise<boolean> {
  const id = headers.get("webhook-id");
  const timestamp = headers.get("webhook-timestamp");
  const signatureHeader = headers.get("webhook-signature");
  if (!id || !timestamp || !signatureHeader) return false;

  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > 300) return false;

  const keyBytes = secret.startsWith("whsec_")
    ? Uint8Array.from(atob(secret.slice(6)), (c) => c.charCodeAt(0))
    : new TextEncoder().encode(secret);

  const key = await crypto.subtle.importKey(
    "raw",
    keyBytes as unknown as ArrayBuffer,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${id}.${timestamp}.${rawBody}`),
  );
  const expected = btoa(String.fromCharCode(...new Uint8Array(mac)));

  return signatureHeader
    .split(" ")
    .map((part) => (part.includes(",") ? part.split(",")[1] : part))
    .some((sig) => sig === expected);
}
