import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ExternalLink, Loader2, Lock } from "lucide-react";
import { z } from "zod";
import { fetchLibrary } from "@/lib/library.functions";
import { isLang, t, dir, type Lang } from "@/lib/i18n";
import type { FreeBook } from "@/lib/free-books";

export const Route = createFileRoute("/$lang/library")({
  validateSearch: z.object({ token: z.string().optional() }),
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  head: ({ params }) => {
    const lang: Lang = isLang(params.lang) ? params.lang : "ar";
    const d = t(lang).library;
    return {
      meta: [
        { title: d.title },
        { name: "description", content: d.subtitle },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: LibraryPage,
});

function LibraryPage() {
  const { lang: raw } = Route.useParams();
  const { token } = Route.useSearch();
  const lang: Lang = isLang(raw) ? raw : "ar";
  const d = t(lang).library;
  const load = useServerFn(fetchLibrary);

  const [state, setState] = useState<
    | { kind: "loading" }
    | { kind: "locked" }
    | { kind: "ready"; books: FreeBook[]; prompts: string; bundle: boolean }
  >({ kind: "loading" });

  useEffect(() => {
    if (!token) {
      setState({ kind: "locked" });
      return;
    }
    let alive = true;
    void load({ data: { token } })
      .then((res) => {
        if (!alive) return;
        setState(
          res.access
            ? {
                kind: "ready",
                books: res.books,
                prompts: res.promptLibrary,
                bundle: res.product === "bundle",
              }
            : { kind: "locked" },
        );
      })
      .catch(() => alive && setState({ kind: "locked" }));
    return () => {
      alive = false;
    };
  }, [token, load]);

  return (
    <main
      dir={dir(lang)}
      lang={lang}
      className="min-h-screen bg-white px-6 py-20 font-body text-[#0f172a]"
    >
      <div className="mx-auto max-w-4xl">
        <h1 className="text-[clamp(1.9rem,4vw,2.8rem)] font-semibold">{d.title}</h1>
        <p className="mt-3 text-[#64748b]">{d.subtitle}</p>

        {state.kind === "loading" && (
          <div className="mt-16 flex items-center gap-3 text-[#64748b]">
            <Loader2 className="size-5 animate-spin" /> {d.checking}
          </div>
        )}

        {state.kind === "locked" && (
          <div className="mt-12 rounded-3xl border border-black/10 p-10 text-center">
            <Lock className="mx-auto size-8 text-[#0f172a]" />
            <p className="mt-4 font-semibold">{d.locked}</p>
            <p className="mt-2 text-sm text-[#64748b]">{d.lockedDesc}</p>
            <Link
              to="/$lang"
              params={{ lang }}
              className="mt-8 inline-flex rounded-full bg-[#0f172a] px-8 py-3 text-sm text-white"
            >
              {t(lang).pricing.buy}
            </Link>
          </div>
        )}

        {state.kind === "ready" && (
          <>
            <a
              href={state.prompts}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0f172a] px-7 py-3 text-sm text-white"
            >
              {d.open} <ExternalLink className="size-4" />
            </a>
            <p className="mt-3 text-xs text-[#94a3b8]">{d.promptsNote}</p>

            {state.bundle && (
              <div className="mt-12 grid gap-4 md:grid-cols-2">
                {state.books.map((b) => (
                  <a
                    key={b.url}
                    href={b.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-2xl border border-black/10 p-5 transition hover:border-black/30"
                  >
                    <h2 className="text-sm font-semibold group-hover:underline">{b.title}</h2>
                    <p className="mt-2 text-xs leading-relaxed text-[#64748b]">{b.description}</p>
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
