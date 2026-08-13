import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, CheckCircle2 } from "lucide-react";
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

function ThankYou() {
  const { lang: raw } = Route.useParams();
  const { p } = Route.useSearch();
  const lang: Lang = isLang(raw) ? raw : "ar";
  const d = t(lang).thanks;
  const check = useServerFn(checkPurchase);
  const [status, setStatus] = useState<"pending" | "paid" | "failed" | "unknown">("pending");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (!p) return;
    let stop = false;
    const poll = async () => {
      try {
        const res = await check({ data: { purchaseId: p } });
        if (stop) return;
        setStatus(res.status);
        setToken(res.token);
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

  return (
    <main
      dir={dir(lang)}
      lang={lang}
      className="grid min-h-screen place-items-center bg-white px-6 font-body text-[#0f172a]"
    >
      <div className="max-w-md text-center">
        {status === "paid" ? (
          <CheckCircle2 className="mx-auto size-12 text-emerald-500" />
        ) : (
          <Loader2 className="mx-auto size-10 animate-spin text-[#0f172a]" />
        )}
        <h1 className="mt-6 text-3xl font-semibold">{d.title}</h1>
        <p className="mt-3 leading-relaxed text-[#64748b]">
          {status === "paid" ? d.emailSent : status === "failed" ? d.failed : d.pending}
        </p>
        {status === "paid" && token && (
          <Link
            to="/$lang/library"
            params={{ lang }}
            search={{ token }}
            className="mt-8 inline-flex rounded-full bg-[#0f172a] px-8 py-4 text-sm text-white"
          >
            {d.openLibrary}
          </Link>
        )}
      </div>
    </main>
  );
}
