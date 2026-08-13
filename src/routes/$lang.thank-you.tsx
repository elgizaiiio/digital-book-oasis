import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, CheckCircle2, XCircle, Copy, ArrowLeft } from "lucide-react";
import { checkPurchase } from "@/lib/library.functions";
import { isLang, t, dir, type Lang } from "@/lib/i18n";
import { z } from "zod";

export const Route = createFileRoute("/$lang/thank-you")({
  validateSearch: z.object({ p: z.string().optional() }),
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  head: ({ params }) => {
    const lang: Lang = isLang(params.lang) ? params.lang : "ar";
    const d = t(lang).thanks;
    return {
      meta: [
        { title: d.title },
        { name: "description", content: d.subtitle },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: ThankYou,
});

type Order = {
  id: string;
  email: string;
  product: "book" | "bundle";
  amount: number;
  currency: string;
  createdAt: string;
};

function ThankYou() {
  const { lang: raw } = Route.useParams();
  const { p } = Route.useSearch();
  const lang: Lang = isLang(raw) ? raw : "ar";
  const d = t(lang).thanks;
  const check = useServerFn(checkPurchase);
  const [status, setStatus] = useState<"pending" | "paid" | "failed" | "unknown">("pending");
  const [token, setToken] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!p) return;
    let stop = false;
    const poll = async () => {
      try {
        const res = await check({ data: { purchaseId: p } });
        if (stop) return;
        setStatus(res.status);
        setToken(res.token);
        setOrder(res.order ?? null);
        if (res.status === "pending") setTimeout(poll, 3000);
      } catch {
        if (!stop) setTimeout(poll, 5000);
      }
    };
    void poll();
    return () => {
      stop = true;
    };
  }, [p, check]);

  const libraryUrl =
    token && typeof window !== "undefined"
      ? `${window.location.origin}/${lang}/library?token=${token}`
      : null;

  const paid = status === "paid";
  const statusLabel = paid ? d.statusPaid : status === "failed" ? d.statusFailed : d.statusPending;

  const includes = [
    d.includesBook,
    d.includesPrompts,
    ...(order?.product === "bundle" ? [d.includesBooks] : []),
    d.includesUpdates,
  ];

  return (
    <main
      dir={dir(lang)}
      lang={lang}
      className="min-h-screen bg-[#f8fafc] px-6 py-16 font-body text-[#0f172a]"
    >
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl bg-white p-8 shadow-[0_20px_50px_-30px_rgba(15,23,42,.45)] md:p-10">
          <div className="flex items-center gap-3">
            {paid ? (
              <CheckCircle2 className="size-9 text-emerald-500" />
            ) : status === "failed" ? (
              <XCircle className="size-9 text-red-500" />
            ) : (
              <Loader2 className="size-8 animate-spin text-[#0f172a]" />
            )}
            <div>
              <h1 className="text-2xl font-semibold md:text-3xl">{d.title}</h1>
              <p className="mt-1 text-sm text-[#64748b]">
                {paid ? d.subtitle : status === "failed" ? d.failed : d.pending}
              </p>
            </div>
          </div>

          {order && (
            <div className="mt-8 rounded-2xl border border-black/[0.07] bg-[#f8fafc] p-5">
              <h2 className="text-sm font-semibold">{d.orderTitle}</h2>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <Row label={d.orderId} value={order.id.slice(0, 8).toUpperCase()} />
                <Row label={d.emailField} value={order.email} />
                <Row
                  label={d.productField}
                  value={order.product === "bundle" ? d.productBundle : d.productBook}
                />
                <Row label={d.amountField} value={`${order.amount} ${order.currency}`} />
                <Row
                  label={d.dateField}
                  value={new Date(order.createdAt).toLocaleDateString(
                    lang === "ar" ? "ar-EG" : "en-GB",
                    { year: "numeric", month: "long", day: "numeric" },
                  )}
                />
                <div>
                  <dt className="text-xs text-[#94a3b8]">{d.statusField}</dt>
                  <dd className="mt-1">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        paid
                          ? "bg-emerald-50 text-emerald-700"
                          : status === "failed"
                            ? "bg-red-50 text-red-700"
                            : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {statusLabel}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          )}

          {paid && (
            <>
              <div className="mt-6">
                <h2 className="text-sm font-semibold">{d.includes}</h2>
                <ul className="mt-3 space-y-2 text-sm text-[#475569]">
                  {includes.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {token && (
                  <Link
                    to="/$lang/library"
                    params={{ lang }}
                    search={{ token }}
                    className="inline-flex flex-1 items-center justify-center rounded-full bg-[#0f172a] px-8 py-4 text-sm font-medium text-white transition hover:bg-[#1e293b]"
                  >
                    {d.openLibrary}
                  </Link>
                )}
                {libraryUrl && (
                  <button
                    onClick={() => {
                      void navigator.clipboard.writeText(libraryUrl);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-6 py-4 text-sm transition hover:border-black/30"
                  >
                    <Copy className="size-4" />
                    {copied ? d.copied : d.copyLink}
                  </button>
                )}
              </div>
              <p className="mt-3 text-xs text-[#94a3b8]">{d.saveLink}</p>
            </>
          )}

          <p className="mt-8 border-t border-black/[0.06] pt-5 text-xs text-[#94a3b8]">
            {d.support}
          </p>
        </div>

        <Link
          to="/$lang"
          params={{ lang }}
          className="mt-6 inline-flex items-center gap-2 text-sm text-[#64748b] transition hover:text-[#0f172a]"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" />
          {t(lang).nav.home}
        </Link>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-[#94a3b8]">{label}</dt>
      <dd className="mt-1 break-all font-medium">{value}</dd>
    </div>
  );
}
