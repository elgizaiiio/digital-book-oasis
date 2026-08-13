import { createFileRoute, notFound } from "@tanstack/react-router";
import HeroVantage from "@/components/HeroVantage";
import RevealSection from "@/components/RevealSection";
import StudioSections from "@/components/StudioSections";
import { isLang, t, dir, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  head: ({ params }) => {
    const lang: Lang = isLang(params.lang) ? params.lang : "ar";
    const d = t(lang);
    return {
      meta: [
        { title: d.seo.title },
        { name: "description", content: d.seo.description },
        { property: "og:title", content: d.seo.title },
        { property: "og:description", content: d.seo.description },
        { property: "og:type", content: "book" },
        { property: "og:url", content: `/${lang}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/${lang}` }],
    };
  },
  component: LandingPage,
});

function LandingPage() {
  const { lang: raw } = Route.useParams();
  const lang: Lang = isLang(raw) ? raw : "ar";

  return (
    <main dir={dir(lang)} lang={lang}>
      <HeroVantage lang={lang} />
      <RevealSection lang={lang} />
      <StudioSections lang={lang} />
    </main>
  );
}
