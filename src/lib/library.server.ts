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
    .select("status, access_token, lang")
    .eq("id", purchaseId)
    .maybeSingle();

  if (!data) return { status: "unknown" as const, token: null };
  return {
    status: data.status as "pending" | "paid" | "failed",
    token: data.status === "paid" ? (data.access_token as string) : null,
  };
}
