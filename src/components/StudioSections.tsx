import { useEffect, useState } from "react";
import { Search, Sparkles, Check, ArrowUpLeft, ArrowUpRight, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import { createCheckout } from "@/lib/checkout.functions";
import { t, dir, PRICING, priceLabel, type Lang, type ProductId } from "@/lib/i18n";

const softShadow = "shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.12)]";

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInViewAnimation();
  return (
    <div
      ref={ref}
      className={`${className} ${inView ? "animate-fade-in-up" : "opacity-0"}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

function SectionHead({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="bg-[linear-gradient(90deg,#F5C344,#F28482,#B567C2)] bg-clip-text text-xs font-semibold tracking-[0.18em] text-transparent">
        {badge}
      </p>
      <h2 className="mt-4 text-[clamp(1.85rem,4vw,2.75rem)] font-semibold leading-tight tracking-tight text-[#0f172a]">
        {title}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-[#64748b]">{subtitle}</p>
    </div>
  );
}

/* ── 1. Benefits triptych ───────────────────────────────────── */

const barHeights = [
  20, 33, 48, 56, 51, 47, 39, 31, 53, 55, 60, 56, 100, 92, 76, 67, 62, 65, 59, 70, 74, 87, 83, 77,
];

function ChartCard({ lang }: { lang: Lang }) {
  const d = t(lang).benefits;
  return (
    <div className="relative h-52 overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_50%_78%,rgba(255,225,207,0.45),transparent_50%),linear-gradient(180deg,#fff,#fff8f3)] p-5">
      <div className="flex items-center justify-between text-[11px] font-medium text-[#f27624]">
        <span>{d.start}</span>
        <span className="mx-3 h-px flex-1 border-t border-dashed border-[#be8b60]/60" />
        <span>{d.peak}</span>
      </div>
      <div className="absolute inset-x-5 bottom-9 flex h-28 items-end justify-between">
        {barHeights.map((h, i) => (
          <span
            key={i}
            style={{ height: `${h}%` }}
            className={`w-[2.4%] rounded-full ${h === 100 ? "bg-[#ff6900]" : "bg-[#ffdbc4]"}`}
          />
        ))}
      </div>
      <span className="absolute left-1/2 top-14 -translate-x-1/2 rounded-full border-2 border-white bg-[#ff6900] px-3 py-1 text-xs font-semibold text-white shadow-[0_4px_10px_rgba(69,38,18,0.24)]">
        $1M
      </span>
      <div className="absolute inset-x-6 bottom-3 flex justify-between text-[10px] text-[#888]">
        <span>{d.month1}</span>
        <span>{d.month6}</span>
        <span>{d.month12}</span>
      </div>
    </div>
  );
}

function WorkflowCard({ lang }: { lang: Lang }) {
  const d = t(lang).benefits;
  return (
    <div className="relative h-52 overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_74%_46%,rgba(255,225,204,0.6),transparent_52%),linear-gradient(180deg,#fff,#fff2e8)] p-5">
      <div className="flex items-center gap-2 text-sm font-bold text-[#ff6900]">
        <span className="grid size-7 place-items-center rounded-full bg-[#ffdfca]">
          <Sparkles className="size-4" />
        </span>
        {d.assistant}
      </div>
      <p className="mt-3 text-sm font-medium text-[#151515]">{d.question}</p>
      <div className="mt-3 rounded-xl border border-[#beb4ae] bg-white/50 p-3 text-xs leading-relaxed text-[#777]">
        {d.answer}
      </div>
      <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(100deg,#ff9b5b,#ff8840_38%,#ff6b05)] px-4 py-2 text-xs font-medium text-white shadow-[0_6px_18px_rgba(255,105,0,0.45)]">
        {d.runNow}
        <Sparkles className="size-3.5" />
      </span>
    </div>
  );
}

function DecisionCard({ lang }: { lang: Lang }) {
  const d = t(lang).benefits;
  return (
    <div className="relative h-52 overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_30%_40%,rgba(255,225,204,0.6),transparent_55%),linear-gradient(180deg,#fff,#fff8f3)] p-5">
      <p className="text-xs text-[#676767]">{d.timeSaved}</p>
      <div className="mt-1 flex items-baseline gap-3">
        <strong className="text-3xl font-bold text-[#ff6900]">{d.hours}</strong>
        <span className="text-xs font-bold text-[#4d8c35]">↑ {d.efficiency}</span>
      </div>
      <svg viewBox="0 0 200 80" className="absolute inset-x-0 bottom-10 h-24 w-full" aria-hidden>
        {[
          ["rgba(255,189,144,.6)", 8, 26],
          ["rgba(255,149,80,.7)", 23, 42],
          ["rgba(255,136,64,.82)", 50, 75],
          ["rgba(255,181,128,.54)", 69, 98],
          ["rgba(255,105,0,.96)", 39, 51],
        ].map(([c, a, b], i) => (
          <path
            key={i}
            fill={c as string}
            d={`M0 ${(a as number) * 0.8} C76 ${(a as number) * 0.8} 148 26 200 26 L200 29 C148 29 76 ${(b as number) * 0.8} 0 ${(b as number) * 0.8} Z`}
          />
        ))}
      </svg>
      <span className="absolute bottom-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold text-[#282828] shadow-sm ltr:right-5 rtl:left-5">
        {d.confidence}
      </span>
    </div>
  );
}

function BenefitsTriptych({ lang }: { lang: Lang }) {
  const d = t(lang).benefits;
  const visuals = [
    <ChartCard key="chart" lang={lang} />,
    <WorkflowCard key="flow" lang={lang} />,
    <DecisionCard key="decide" lang={lang} />,
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHead badge={d.badge} title={d.title} subtitle={d.subtitle} />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {d.cards.map((c, i) => (
          <Reveal key={c.title} delay={0.1 * i}>
            <article
              className={`h-full overflow-hidden rounded-3xl border border-[#ffe9da] bg-white p-3 ${softShadow}`}
            >
              {visuals[i]}
              <div className="px-4 pb-4 pt-5">
                <h3 className="text-lg font-semibold text-[#292929]">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#777]">{c.desc}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── 2. Core features ───────────────────────────────────────── */

function FeatureCards({ lang }: { lang: Lang }) {
  const d = t(lang).features;
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHead badge={d.badge} title={d.title} subtitle={d.subtitle} />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Reveal delay={0.05}>
          <article className="relative flex h-[340px] flex-col justify-end overflow-hidden rounded-[20px] bg-[radial-gradient(circle_at_50%_0%,#FFB347_0%,#F9ED96_30%,#F4F8F9_60%)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)]">
            <div className="absolute inset-x-6 top-7 rounded-xl bg-white p-4 text-[0.8rem] leading-relaxed text-[#475569] shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
              {d.promptQuote[0]}
              <span className="bg-[linear-gradient(90deg,#FFB347,#E5A1F5)] bg-clip-text font-semibold text-transparent">
                {d.promptQuote[1]}
              </span>
              {d.promptQuote[2]}
            </div>
            <span className="absolute top-[180px] inline-flex items-center gap-1.5 rounded-full border border-black bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1e293b] shadow-[0_4px_15px_rgba(0,0,0,0.08)] ltr:left-10 rtl:right-10">
              <span className="text-base text-[#a855f7]">✦</span> {d.readyPrompts}
            </span>
            <h3 className="relative z-10 p-6 text-[1.05rem] font-semibold text-[#1e293b]">
              {d.card1}
            </h3>
          </article>
        </Reveal>

        <Reveal delay={0.15}>
          <article className="relative flex h-[340px] flex-col justify-end overflow-hidden rounded-[20px] bg-[radial-gradient(circle_at_50%_0%,#E5A1F5_0%,#F8ACA0_30%,#F4F8F9_60%)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)]">
            <div className="absolute inset-x-6 top-10 space-y-3">
              {d.steps.map((s, i) => (
                <div
                  key={s}
                  className="flex items-center gap-3 rounded-xl bg-white/85 px-4 py-3 text-sm text-[#1e293b] backdrop-blur-sm"
                >
                  <span className="grid size-6 place-items-center rounded-full bg-[#1e293b] text-[11px] text-white">
                    {i + 1}
                  </span>
                  {s}
                </div>
              ))}
            </div>
            <h3 className="relative z-10 p-6 text-[1.05rem] font-semibold text-[#1e293b]">
              {d.card2}
            </h3>
          </article>
        </Reveal>

        <Reveal delay={0.25}>
          <article className="relative flex h-[340px] flex-col justify-end overflow-hidden rounded-[20px] bg-[radial-gradient(circle_at_50%_0%,#F9ED96_0%,#E5A1F5_30%,#F4F8F9_60%)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)]">
            <div
              className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(circle_at_center_top,black_0%,transparent_80%)] [-webkit-mask-image:radial-gradient(circle_at_center_top,black_0%,transparent_80%)]"
              aria-hidden
            />
            <div className="absolute inset-x-0 top-12 grid place-items-center">
              <div className="grid size-24 place-items-center rounded-3xl bg-white/90 shadow-[0_15px_25px_rgba(0,0,0,0.08)]">
                <Check className="size-10 text-[#1e293b]" strokeWidth={1.5} />
              </div>
            </div>
            <span className="absolute inset-x-0 top-[210px] mx-auto inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full border border-black bg-white px-4 py-1.5 text-xs font-medium text-[#1e293b] shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
              <Search className="size-3.5 text-[#64748b]" />
              {d.searchLibrary}
            </span>
            <h3 className="relative z-10 p-6 text-[1.05rem] font-semibold text-[#1e293b]">
              {d.card3}
            </h3>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 3. Pricing with Dodo checkout ──────────────────────────── */

function PricingSection({ lang }: { lang: Lang }) {
  const d = t(lang).pricing;
  const checkout = useServerFn(createCheckout);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState<ProductId | null>(null);
  const [error, setError] = useState<string | null>(null);

  const buy = async (product: ProductId) => {
    setError(null);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError(d.emailHint);
      return;
    }
    setBusy(product);
    try {
      const res = await checkout({ data: { email, lang, product } });
      window.location.href = res.url;
    } catch (e) {
      console.error(e);
      setError(d.error);
      setBusy(null);
    }
  };

  return (
    <section id="pricing" className="mx-auto max-w-4xl px-6 py-20">
      <SectionHead badge={d.badge} title={d.title} subtitle={d.subtitle} />

      <div className="mx-auto mt-10 max-w-md">
        <label className="block text-sm font-medium text-[#0f172a]" htmlFor="buyer-email">
          {d.emailLabel}
        </label>
        <input
          id="buyer-email"
          type="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={d.emailPlaceholder}
          className="mt-2 w-full rounded-full border border-black/10 bg-white px-5 py-3 text-sm outline-none focus:border-black/40"
        />
        <p className="mt-2 text-xs text-[#64748b]">{d.emailHint}</p>
        {error && <p className="mt-2 text-xs font-medium text-red-600">{error}</p>}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Reveal delay={0.05}>
          <div className={`h-full rounded-3xl bg-white p-8 ${softShadow}`}>
            <h3 className="text-lg font-semibold text-[#0f172a]">{d.bookTitle}</h3>
            <p className="mt-2 text-sm text-[#64748b]">{d.bookDesc}</p>
            <p className="mt-8 text-3xl font-semibold text-[#0f172a]">{priceLabel(lang, PRICING[lang].book)}</p>
            <button
              onClick={() => buy("book")}
              disabled={busy !== null}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f172a] py-3 text-sm font-medium text-white transition hover:bg-[#1e293b] disabled:opacity-60"
            >
              {busy === "book" && <Loader2 className="size-4 animate-spin" />}
              {busy === "book" ? d.loading : d.buy}
            </button>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="h-full rounded-3xl bg-[#0f172a] p-8 text-white shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]">
            <h3 className="text-lg font-semibold">{d.bundleTitle}</h3>
            <p className="mt-2 text-sm text-white/70">{d.bundleDesc}</p>
            <p className="mt-8 text-3xl font-semibold">{priceLabel(lang, PRICING[lang].bundle)}</p>
            <button
              onClick={() => buy("bundle")}
              disabled={busy !== null}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-medium text-[#0f172a] transition hover:bg-white/90 disabled:opacity-60"
            >
              {busy === "bundle" && <Loader2 className="size-4 animate-spin" />}
              {busy === "bundle" ? d.loading : d.buy}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 4. Testimonials ────────────────────────────────────────── */

function TestimonialsSection({ lang }: { lang: Lang }) {
  const d = t(lang).reviews;
  const items = d.items;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % items.length), 4000);
    return () => clearInterval(timer);
  }, [items.length]);

  const active = items[index] ?? items[0]!;

  return (
    <section id="reviews" className="mx-auto max-w-3xl px-6 py-20 text-center">
      <SectionHead badge={d.badge} title={d.title} subtitle={d.subtitle} />
      <div className={`mt-10 rounded-3xl bg-white p-8 ${softShadow}`}>
        <p className="text-lg leading-relaxed text-[#0f172a]">“{active.quote}”</p>
        <p className="mt-5 text-sm font-semibold text-[#0f172a]">{active.name}</p>
        <p className="text-sm text-[#64748b]">{active.role}</p>
      </div>
      <div className="mt-6 flex justify-center gap-2">
        {items.map((item, i) => (
          <button
            key={item.name}
            onClick={() => setIndex(i)}
            aria-label={item.name}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-[#0f172a]" : "w-1.5 bg-[#cbd5e1]"}`}
          />
        ))}
      </div>
    </section>
  );
}

/* ── 5. CTA + Footer ────────────────────────────────────────── */

function FinalCta({ lang }: { lang: Lang }) {
  const d = t(lang).cta;
  const Arrow = lang === "ar" ? ArrowUpLeft : ArrowUpRight;
  return (
    <section className="mx-auto max-w-6xl px-6 pb-10">
      <div className="rounded-[32px] bg-[radial-gradient(circle_at_50%_0%,#FFB347_0%,#F9ED96_35%,#F4F8F9_70%)] px-6 py-20 text-center">
        <h2 className="text-[clamp(1.8rem,5vw,3rem)] font-semibold text-[#0f172a]">{d.title}</h2>
        <p className="mt-3 text-[#475569]">{d.subtitle}</p>
        <a
          href="#pricing"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0f172a] px-8 py-4 text-sm text-white transition hover:bg-[#1e293b]"
        >
          {d.button}
          <Arrow className="size-4" />
        </a>
      </div>
    </section>
  );
}

function Footer({ lang }: { lang: Lang }) {
  const d = t(lang);
  return (
    <footer className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-6 text-sm text-[#64748b] md:flex-row">
        <span>{d.footer.rights}</span>
        <div className="flex gap-6">
          <a href="#book" className="transition hover:text-[#0f172a]">
            {d.nav.book}
          </a>
          <a href="#pricing" className="transition hover:text-[#0f172a]">
            {d.nav.pricing}
          </a>
          <a href="#reviews" className="transition hover:text-[#0f172a]">
            {d.nav.reviews}
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function StudioSections({ lang }: { lang: Lang }) {
  return (
    <div dir={dir(lang)} className="bg-white font-body text-[#0f172a]">
      <BenefitsTriptych lang={lang} />
      <FeatureCards lang={lang} />
      <PricingSection lang={lang} />
      <TestimonialsSection lang={lang} />
      <FinalCta lang={lang} />
      <Footer lang={lang} />
    </div>
  );
}
