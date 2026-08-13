import { freeBooks, PROMPT_LIBRARY_URL } from "./free-books";

export async function getLibraryForToken(token: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data, error } = await supabaseAdmin
    .from("purchases")
    .select("id, product, lang, status")
    .eq("access_token", token)
    .maybeSingle();

  if (error || !data || data.status !== "paid") {
    return { access: false as const };
  }

  return {
    access: true as const,
    product: data.product as "book" | "bundle",
    books: freeBooks,
    promptLibrary: PROMPT_LIBRARY_URL,
  };
}

export async function getPurchaseStatus(purchaseId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data } = await supabaseAdmin
    .from("purchases")
    .select("id, status, access_token, lang, email, product, amount, currency, created_at")
    .eq("id", purchaseId)
    .maybeSingle();

  if (!data) return { status: "unknown" as const, token: null, order: null };

  const paid = data.status === "paid";
  return {
    status: data.status as "pending" | "paid" | "failed",
    token: paid ? (data.access_token as string) : null,
    order: {
      id: data.id as string,
      email: data.email as string,
      product: data.product as "book" | "bundle",
      amount: Number(data.amount ?? 0),
      currency: (data.currency ?? "EGP") as string,
      createdAt: data.created_at as string,
    },
  };
}
