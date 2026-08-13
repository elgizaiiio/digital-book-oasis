import heroBg from "@/assets/hero-bg.jpg";
import demoThumb from "@/assets/watch-demo-thumbnail.jpg";
import { Play, Menu, X, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { t, dir, type Lang } from "@/lib/i18n";

const glass =
  "border border-white/[0.13] bg-[linear-gradient(145deg,rgba(24,22,20,.80),rgba(5,12,14,.86))] shadow-[0_2px_10px_rgba(0,0,0,.44),0_0_0_3px_rgba(255,255,255,.035)_inset,0_0_0_1px_rgba(0,0,0,.9)] backdrop-blur-[14px]";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_112712_da9d53df-6d27-4b12-bdf6-aa9dc2622bdf.mp4";

export default function HeroVantage({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const d = t(lang);
  const rtl = lang === "ar";
  const Arrow = rtl ? ArrowLeft : ArrowRight;

  const navLinks = [
    { label: d.nav.home, href: "#hero" },
    { label: d.nav.book, href: "#book" },
    { label: d.nav.pricing, href: "#pricing" },
    { label: d.nav.reviews, href: "#reviews" },
  ];

  return (
    <section
      id="hero"
      dir={dir(lang)}
      className="relative isolate h-[100svh] min-h-[600px] w-full overflow-hidden bg-black font-body"
    >
      <video
        src={HERO_VIDEO}
        poster={heroBg}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30 h-full w-full select-none object-cover object-center"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,.25), transparent 24%, transparent 62%, rgba(0,0,0,.75)), radial-gradient(ellipse at 56% 54%, transparent 28%, rgba(0,0,0,.55) 100%)",
        }}
      />

      <header className="absolute inset-x-[clamp(24px,4vw,96px)] top-[clamp(20px,2.4vh,30px)] z-20 flex items-start whitespace-nowrap">
        <nav className="hidden items-center gap-[clamp(24px,2.6vw,40px)] pt-[9px] md:flex">
          {navLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className={`enter-up relative text-[15px] text-[rgba(229,229,230,.77)] drop-shadow-[0_1px_3px_rgba(0,0,0,.55)] transition-colors hover:text-white ${
                i === 0
                  ? "text-white after:absolute after:-bottom-2 after:h-[2px] after:w-11 after:bg-white/80 after:content-[''] ltr:after:left-0 rtl:after:right-0"
                  : ""
              }`}
              style={{ animationDelay: `${130 + i * 45}ms` }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div
          className="enter-up hidden h-12 items-center gap-3 lg:flex ltr:ml-auto rtl:mr-auto"
          style={{ animationDelay: "180ms" }}
        >
          <div className="leading-tight ltr:border-l-2 ltr:pl-2 rtl:border-r-2 rtl:pr-2 border-[rgba(230,230,230,.52)]">
            <div className="text-[13px] text-[rgba(240,240,240,.77)]">{d.hero.offer}</div>
            <div className="text-[14px] font-medium text-white/90">{d.hero.offerValue}</div>
          </div>
        </div>

        <LangSwitch
          lang={lang}
          className="enter-up hidden md:inline-flex ltr:ml-[clamp(12px,1.9vw,29px)] rtl:mr-[clamp(12px,1.9vw,29px)]"
        />

        <a
          href="#pricing"
          className="enter-up hidden h-[42px] items-center rounded-[7px] bg-white px-5 text-[15px] font-semibold text-[#101010] shadow-[inset_0_1px_0_rgba(255,255,255,.72),0_1px_5px_rgba(0,0,0,.34)] transition hover:brightness-95 md:inline-flex ltr:ml-3 rtl:mr-3"
          style={{ animationDelay: "220ms" }}
        >
          {d.hero.buy}
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={d.hero.menu}
          className={`grid size-[46px] place-items-center rounded-[11px] text-white md:hidden ltr:ml-auto rtl:mr-auto ${glass}`}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        {open && (
          <div
            className={`absolute top-[58px] w-[min(340px,calc(100vw-48px))] rounded-2xl p-5 md:hidden ltr:right-0 rtl:left-0 ${glass}`}
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-[15px] text-white/85"
                >
                  {l.label}
                </a>
              ))}
              <LangSwitch lang={lang} className="w-fit" />
              <a
                href="#pricing"
                onClick={() => setOpen(false)}
                className="mt-1 grid h-11 place-items-center rounded-[7px] bg-white text-[15px] font-semibold text-[#101010]"
              >
                {d.hero.buy}
              </a>
            </nav>
          </div>
        )}
      </header>

      <div className="absolute bottom-[clamp(34px,5.5vh,64px)] z-10 flex max-w-[min(92vw,760px)] flex-col items-start ltr:left-[clamp(24px,4vw,96px)] rtl:right-[clamp(24px,4vw,96px)]">
        <h1
          className="font-display text-[clamp(34px,6.6vh,74px)] font-medium leading-[1.18] tracking-tight text-white [text-shadow:0_2px_2px_rgba(0,0,0,.44)]"
          style={{ fontFamily: rtl ? '"Tajawal", sans-serif' : '"Orbitron", sans-serif' }}
        >
          <span className="block overflow-hidden">
            <span className="enter-line block" style={{ animationDelay: "300ms" }}>
              {d.hero.line1}
            </span>
          </span>
          <span className="block overflow-hidden text-[rgba(211,207,207,.78)]">
            <span className="enter-line block" style={{ animationDelay: "440ms" }}>
              {d.hero.line2}
            </span>
          </span>
        </h1>

        <p
          className="enter-up mt-[clamp(15px,2.1vh,24px)] w-[min(90vw,520px)] text-[clamp(14px,1.8vh,18px)] font-light leading-[1.9] text-[rgba(226,229,228,.84)] [text-shadow:0_1px_3px_rgba(0,0,0,.7)]"
          style={{ animationDelay: "740ms" }}
        >
          {d.hero.paragraph}
        </p>

        <a
          href="#pricing"
          className="enter-up relative mt-[clamp(24px,3.2vh,36px)] flex h-[clamp(44px,4.6vh,52px)] w-[clamp(190px,22vh,240px)] items-center rounded-[7px] bg-white text-[15px] font-semibold text-[#111] shadow-[0_1px_5px_rgba(0,0,0,.38)] transition hover:brightness-95 ltr:pl-4 rtl:pr-4"
          style={{ animationDelay: "960ms" }}
        >
          {d.hero.cta}
          <span className="absolute top-1/2 grid h-[72%] w-[20%] -translate-y-1/2 place-items-center rounded-[7px] bg-[#070909] ltr:right-[3.5%] rtl:left-[3.5%]">
            <Arrow className="size-[14px] text-white" strokeWidth={1.8} />
          </span>
        </a>
      </div>

      <article
        className={`enter-up absolute bottom-[clamp(34px,5.5vh,64px)] z-10 hidden w-[clamp(160px,19vh,215px)] rounded-[clamp(12px,1.5vh,18px)] p-[3.5%] lg:block ltr:right-[clamp(24px,4vw,96px)] rtl:left-[clamp(24px,4vw,96px)] ${glass}`}
        style={{ animationDelay: "1040ms", aspectRatio: "201 / 265" }}
      >
        <div className="relative aspect-square w-full overflow-hidden rounded-[6%] bg-[#101a1e]">
          <img
            src={demoThumb}
            alt={d.hero.demoAlt}
            loading="lazy"
            width={640}
            height={640}
            className="size-full object-cover [filter:brightness(.89)_saturate(.93)_contrast(1.03)]"
          />
          <button
            aria-label={d.hero.playLabel}
            className="absolute left-1/2 top-1/2 grid size-[29%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/35 bg-[rgba(3,5,7,.47)] backdrop-blur-[4px]"
          >
            <Play className="size-[45%] fill-white text-white" />
          </button>
        </div>
        <button className="mt-[8%] h-9 w-full rounded-[8px] border border-white/20 bg-[linear-gradient(145deg,rgba(26,34,36,.86),rgba(16,29,33,.9))] text-[13px] text-white/90">
          {d.hero.watchDemo}
        </button>
      </article>
    </section>
  );
}

function LangSwitch({ lang, className = "" }: { lang: Lang; className?: string }) {
  const other: Lang = lang === "ar" ? "en" : "ar";
  return (
    <Link
      to="/$lang"
      params={{ lang: other }}
      className={`h-[42px] items-center rounded-[7px] border border-white/25 px-4 text-[14px] font-medium text-white/90 backdrop-blur-sm transition hover:bg-white/10 ${className}`}
      style={{ display: "inline-flex", alignItems: "center" }}
    >
      {other === "en" ? "English" : "العربية"}
    </Link>
  );
}
