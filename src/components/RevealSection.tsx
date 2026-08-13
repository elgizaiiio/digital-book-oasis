import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import bookImg from "@/assets/book-real.jpg";
import { t, dir, type Lang } from "@/lib/i18n";

const BOOK_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260618_174853_aac61aa2-0f3f-4cf1-bc78-7f657dd11164.mp4";

export default function RevealSection({ lang }: { lang: Lang }) {
  const d = t(lang).bookSection;
  const rtl = lang === "ar";
  const Arrow = rtl ? ArrowUpLeft : ArrowUpRight;

  return (
    <section
      id="book"
      dir={dir(lang)}
      className="relative overflow-hidden bg-white font-body text-black"
      style={{ paddingInline: "var(--pad-x)", paddingBlock: "clamp(4rem,10vh,8rem)" }}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-[clamp(2.5rem,6vw,5rem)] lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <p
            className="uppercase tracking-[0.32em] text-gray-400"
            style={{ fontSize: "var(--micro)" }}
          >
            {d.eyebrow}
          </p>

          <h2
            className="mt-5 font-display font-extrabold leading-[1.15] tracking-[0.01em]"
            style={{
              fontSize: "clamp(2rem,4.2vw,3.6rem)",
              fontFamily: rtl ? '"Tajawal", sans-serif' : '"Plus Jakarta Sans", sans-serif',
            }}
          >
            {d.title1}
            <span className="block text-gray-400">{d.title2}</span>
          </h2>

          <p
            className="mt-6 max-w-md leading-loose text-gray-600"
            style={{ fontSize: "clamp(0.95rem,0.4vw+0.85rem,1.1rem)" }}
          >
            {d.paragraph}
          </p>

          <div className="mt-10 grid max-w-md grid-cols-3 gap-6 border-y border-gray-200 py-6">
            {d.facts.map((f) => (
              <div key={f.v}>
                <p className="font-display text-2xl font-bold">{f.k}</p>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">{f.v}</p>
              </div>
            ))}
          </div>

          <a
            href="#pricing"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm text-white transition hover:bg-gray-800"
          >
            {d.cta}
            <Arrow className="size-4" />
          </a>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto w-full max-w-md lg:ml-auto lg:mr-0" style={{ transform: "translateX(1.5rem)" }}>
            <div className="absolute -inset-6 rounded-[2rem] bg-gray-50" aria-hidden />
            <video
              src={BOOK_VIDEO}
              poster={bookImg}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={`${d.title1} ${d.title2}`}
              className="relative aspect-[4/5] w-full rounded-2xl object-cover shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
