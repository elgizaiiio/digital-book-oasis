import { createFileRoute } from "@tanstack/react-router";
import { verifyKashierWebhook } from "@/lib/kashier.server";

const PAID = new Set(["success", "succeeded", "paid", "captured", "approved"]);

export const Route = createFileRoute("/api/public/kashier-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const raw = await request.text();
        let body: { event?: string; data?: Record<string, unknown> };
        try {
          body = JSON.parse(raw);
        } catch {
          return new Response("Bad payload", { status: 400 });
        }

        const data = (body.data ?? {}) as Record<string, unknown>;
        if (!(await verifyKashierWebhook(data, request.headers))) {
          return new Response("Invalid signature", { status: 401 });
        }

        const meta = (
          typeof data["metaData"] === "string"
            ? safeJson(data["metaData"] as string)
            : ((data["metaData"] as Record<string, string>) ?? {})
        ) as Record<string, string>;

        const purchaseId = meta["purchase_id"] ?? (data["merchantOrderId"] as string | undefined);
        if (!purchaseId) return new Response("ok");

        const status = String(data["status"] ?? "").toLowerCase();
        const transactionId = (data["transactionId"] as string | undefined) ?? null;

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: purchase } = await supabaseAdmin
          .from("purchases")
          .select("*")
          .eq("id", purchaseId)
          .maybeSingle();

        if (!purchase) return new Response("ok");

        if (!PAID.has(status)) {
          if (purchase.status !== "paid") {
            await supabaseAdmin.from("purchases").update({ status: "failed" }).eq("id", purchase.id);
          }
          return new Response("ok");
        }

        if (purchase.status !== "paid") {
          await supabaseAdmin
            .from("purchases")
            .update({
              status: "paid",
              paid_at: new Date().toISOString(),
              provider_payment_id: transactionId ?? purchase.provider_payment_id,
            })
            .eq("id", purchase.id);
        }

        // Delivery happens on-site: the buyer is redirected to /{lang}/thank-you?p={id}
        // which shows the full order details and the private library link.


        return new Response("ok");
      },
    },
  },
});

function safeJson(value: string): Record<string, string> {
  try {
    return JSON.parse(value) as Record<string, string>;
  } catch {
    return {};
  }
}
