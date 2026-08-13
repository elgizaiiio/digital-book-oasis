import { createKashierPayment, kashierCurrency, priceOf } from "./kashier.server";
import type { Lang, ProductId } from "./i18n";

export async function startCheckout(args: {
  email: string;
  lang: Lang;
  product: ProductId;
  origin: string;
}) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const email = args.email.toLowerCase().trim();
  const amount = priceOf(args.lang, args.product);
  const currency = kashierCurrency();

  const { data: purchase, error } = await supabaseAdmin
    .from("purchases")
    .insert({ email, product: args.product, lang: args.lang, amount, currency })
    .select("id")
    .single();

  if (error || !purchase) throw new Error("Could not create the order");

  const payment = await createKashierPayment({
    email,
    lang: args.lang,
    product: args.product,
    origin: args.origin,
    purchaseId: purchase.id,
    amount,
  });

  if (payment.paymentId) {
    await supabaseAdmin
      .from("purchases")
      .update({ provider_payment_id: payment.paymentId })
      .eq("id", purchase.id);
  }

  return { url: payment.url, purchaseId: purchase.id };
}
