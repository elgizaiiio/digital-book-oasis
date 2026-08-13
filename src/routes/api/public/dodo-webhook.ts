import { createFileRoute } from "@tanstack/react-router";
import { verifyDodoWebhook } from "@/lib/dodo.server";
import { sendPurchaseEmail } from "@/lib/email.server";
import type { Lang } from "@/lib/i18n";

const PAID_EVENTS = new Set(["payment.succeeded", "subscription.active"]);
const FAILED_EVENTS = new Set(["payment.failed", "payment.cancelled"]);

export const Route = createFileRoute("/api/public/dodo-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["DODO_WEBHOOK_SECRET"];
        if (!secret) return new Response("Not configured", { status: 500 });

        const raw = await request.text();
        if (!(await verifyDodoWebhook(raw, request.headers, secret))) {
          return new Response("Invalid signature", { status: 401 });
        }

        const event = JSON.parse(raw) as {
          type?: string;
          data?: {
            payment_id?: string;
            metadata?: Record<string, string>;
            customer?: { email?: string };
          };
        };

        const type = event.type ?? "";
        const purchaseId = event.data?.metadata?.["purchase_id"];
        const paymentId = event.data?.payment_id;
        if (!purchaseId && !paymentId) return new Response("ok");

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const query = supabaseAdmin.from("purchases").select("*");
        const { data: purchase } = purchaseId
          ? await query.eq("id", purchaseId).maybeSingle()
          : await query.eq("provider_payment_id", paymentId!).maybeSingle();

        if (!purchase) return new Response("ok");

        if (FAILED_EVENTS.has(type)) {
          await supabaseAdmin.from("purchases").update({ status: "failed" }).eq("id", purchase.id);
          return new Response("ok");
        }

        if (!PAID_EVENTS.has(type)) return new Response("ok");

        if (purchase.status !== "paid") {
          await supabaseAdmin
            .from("purchases")
            .update({
              status: "paid",
              paid_at: new Date().toISOString(),
              provider_payment_id: paymentId ?? purchase.provider_payment_id,
            })
            .eq("id", purchase.id);
        }

        if (!purchase.email_sent) {
          const origin = new URL(request.url).origin;
          const lang = (purchase.lang ?? "ar") as Lang;
          const libraryUrl = `${origin}/${lang}/library?token=${purchase.access_token}`;
          try {
            await sendPurchaseEmail({
              to: purchase.email,
              lang,
              libraryUrl,
              bundle: purchase.product === "bundle",
            });
            await supabaseAdmin
              .from("purchases")
              .update({ email_sent: true })
              .eq("id", purchase.id);
          } catch (err) {
            console.error("purchase email failed", err);
          }
        }

        return new Response("ok");
      },
    },
  },
});
