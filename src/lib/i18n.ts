export const LANGS = ["ar", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const isLang = (v: string): v is Lang => (LANGS as readonly string[]).includes(v);

export const dir = (lang: Lang) => (lang === "ar" ? "rtl" : "ltr");

/** Product prices differ per market (Arabic edition is priced for MENA). */
/** Prices are charged in EGP through Kashier. */
export const PRICING = {
  ar: { book: 499, bundle: 1999 },
  en: { book: 499, bundle: 1999 },
} as const satisfies Record<Lang, { book: number; bundle: number }>;

/** Currency label shown next to prices. */
export const priceLabel = (lang: Lang, amount: number) =>
  lang === "ar" ? `${amount} ج.م` : `${amount} EGP`;

export type ProductId = "book" | "bundle";

type Dict = {
  htmlLang: string;
  seo: { title: string; description: string };
  nav: { home: string; book: string; pricing: string; reviews: string };
  hero: {
    offer: string;
    offerValue: string;
    buy: string;
    menu: string;
    line1: string;
    line2: string;
    paragraph: string;
    cta: string;
    demoAlt: string;
    playLabel: string;
    watchDemo: string;
  };
  bookSection: {
    eyebrow: string;
    title1: string;
    title2: string;
    paragraph: string;
    facts: { k: string; v: string }[];
    cta: string;
  };
  benefits: {
    badge: string;
    title: string;
    subtitle: string;
    start: string;
    peak: string;
    month1: string;
    month6: string;
    month12: string;
    assistant: string;
    question: string;
    answer: string;
    runNow: string;
    timeSaved: string;
    hours: string;
    efficiency: string;
    confidence: string;
    cards: { title: string; desc: string }[];
  };
  features: {
    badge: string;
    title: string;
    subtitle: string;
    promptQuote: [string, string, string];
    readyPrompts: string;
    card1: string;
    steps: [string, string, string];
    card2: string;
    searchLibrary: string;
    card3: string;
  };
  pricing: {
    badge: string;
    title: string;
    subtitle: string;
    bookTitle: string;
    bookDesc: string;
    bundleTitle: string;
    bundleDesc: string;
    buy: string;
    loading: string;
    emailLabel: string;
    emailPlaceholder: string;
    emailHint: string;
    error: string;
  };
  reviews: {
    badge: string;
    title: string;
    subtitle: string;
    items: { name: string; role: string; quote: string }[];
  };
  cta: { title: string; subtitle: string; button: string };
  footer: { rights: string };
  library: {
    title: string;
    subtitle: string;
    locked: string;
    lockedDesc: string;
    open: string;
    promptsNote: string;
    checking: string;
    invalid: string;
  };
  thanks: {
    title: string;
    subtitle: string;
    emailSent: string;
    openLibrary: string;
    pending: string;
    failed: string;
  };
};

const ar: Dict = {
  htmlLang: "ar",
  seo: {
    title: "كيف تربح من الذكاء الاصطناعي — كتاب المليون دولار",
    description:
      "دليل عملي بالعربية لبناء دخل حقيقي من الذكاء الاصطناعي: خطة 30 يوماً، مكتبة برومبتات، ونماذج أتمتة جاهزة.",
  },
  nav: { home: "الرئيسية", book: "الكتاب", pricing: "الباقات", reviews: "الآراء" },
  hero: {
    offer: "العرض ينتهي خلال",
    offerValue: "٤٨ ساعة • خصم ٤٠٪",
    buy: "اشترِ الآن",
    menu: "القائمة",
    line1: "توقف عن مطاردة",
    line2: "الفرص العشوائية.",
    paragraph:
      "أدواتك ومهاراتك مبعثرة على عشرات المنصات. هذا الكتاب يجمعها في نظام واحد واضح، يحوّل الذكاء الاصطناعي إلى مصدر دخل حقيقي — خطوة بخطوة حتى أول مليون دولار.",
    cta: "احصل على الكتاب",
    demoAlt: "مقدمة الكتاب",
    playLabel: "تشغيل المقدمة",
    watchDemo: "شاهد المقدمة",
  },
  bookSection: {
    eyebrow: "الكتاب",
    title1: "مليون دولار",
    title2: "بالذكاء الاصطناعي",
    paragraph:
      "دليل واضح وخالٍ من الضجيج: كيف تختار السوق، تبني منتجاً بالذكاء الاصطناعي، وتسعّره لدخلٍ متكرر يستمر بعد انتهاء الترندات.",
    facts: [
      { k: "١٢", v: "فصلاً عملياً" },
      { k: "٢٠٠+", v: "برومبت جاهز" },
      { k: "٣٠", v: "يوماً للتنفيذ" },
    ],
    cta: "اشترِ الكتاب",
  },
  benefits: {
    badge: "ماذا يقدّم الكتاب",
    title: "نظام واضح، لا نصائح عامة",
    subtitle: "ثلاث ركائز تنقلك من التجربة العشوائية إلى دخل متكرر.",
    start: "البداية",
    peak: "الذروة",
    month1: "شهر ١",
    month6: "شهر ٦",
    month12: "شهر ١٢",
    assistant: "مساعد الذكاء الاصطناعي",
    question: "كيف أبدأ أول منتج لي؟",
    answer:
      "حدّد السوق، اكتب العرض، وابنِ المنتج خلال ٣٠ يوماً — الكتاب يعطيك البرومبتات وسير العمل الجاهز.",
    runNow: "نفّذ الآن",
    timeSaved: "الوقت الموفَّر",
    hours: "١٢٨ ساعة",
    efficiency: "↑ ١٨٪ كفاءة",
    confidence: "ثقة القرار ٩٨٪",
    cards: [
      { title: "رؤية واضحة", desc: "خارطة أرقام تعرف بها أين أنت وأين ستصل." },
      { title: "أتمتة كاملة", desc: "سير عمل جاهز ينفّذ بدل ما تشتغل يدوي." },
      { title: "قرارات أسرع", desc: "تحوّل ما تتعلمه إلى تنفيذ فوري." },
    ],
  },
  features: {
    badge: "المميزات الأساسية",
    title: "كل ما تحتاجه في مكان واحد",
    subtitle: "من الفكرة الأولى حتى أول ألف دولار.",
    promptQuote: ["«اكتب لي عرضاً يبيع خدمة", "استشارات الذكاء الاصطناعي", "لعميل لا يعرفني»"],
    readyPrompts: "برومبتات جاهزة",
    card1: "مكتبة ٢٠٠ برومبت",
    steps: ["حدّد السوق", "ابنِ المنتج", "سعّر ووسّع"],
    card2: "خارطة طريق ٣٠ يوماً",
    searchLibrary: "ابحث داخل المكتبة",
    card3: "قوالب أتمتة ومجتمع",
  },
  pricing: {
    badge: "الباقات",
    title: "اختر نسختك",
    subtitle: "دفعة واحدة، وصول مدى الحياة، تحديثات مجانية.",
    bookTitle: "الكتاب فقط",
    bookDesc: "نسخة PDF و EPUB مع تحديثات مجانية.",
    bundleTitle: "الحزمة الكاملة",
    bundleDesc:
      "الكتاب + مكتبة البرومبتات + مكتبة ١٨ كتاباً مختاراً + قوالب الأتمتة + المجتمع الخاص.",
    buy: "اشترِ الآن",
    loading: "جارٍ التحويل…",
    emailLabel: "بريدك الإلكتروني",
    emailPlaceholder: "name@example.com",
    emailHint: "سنرسل الكتاب والمكتبة على هذا البريد بعد الدفع.",
    error: "تعذّر بدء عملية الدفع، حاول مرة أخرى.",
  },
  reviews: {
    badge: "آراء القرّاء",
    title: "نتائج حقيقية",
    subtitle: "٤.٩ من ٥ من أكثر من ١٢٠٠ قارئ.",
    items: [
      { name: "محمود سعيد", role: "مؤسس وكالة تسويق", quote: "طبّقت فصلاً واحداً ورفعت إيراد الوكالة ٣ أضعاف في ٩٠ يوم." },
      { name: "سارة العتيبي", role: "كاتبة محتوى", quote: "مكتبة البرومبتات وحدها تساوي ثمن الكتاب عشر مرات." },
      { name: "أحمد فتحي", role: "مطوّر منتجات", quote: "أول منتج SaaS لي خرج للسوق خلال شهر بفضل خارطة الطريق." },
    ],
  },
  cta: {
    title: "ابدأ رحلتك اليوم",
    subtitle: "نسخة واحدة تكفي لتغيّر طريقة عملك بالكامل.",
    button: "احصل على نسختك",
  },
  footer: { rights: "كيف تربح من الذكاء الاصطناعي © ٢٠٢٦" },
  library: {
    title: "مكتبتك الخاصة",
    subtitle: "١٨ مرجعاً مختاراً في الذكاء الاصطناعي + مكتبة البرومبتات.",
    locked: "هذه المكتبة للمشترين فقط",
    lockedDesc: "بعد إتمام الدفع سيصلك رابط خاص بمكتبتك على بريدك مباشرة.",
    open: "افتح الكتاب",
    promptsNote: "مكتبة البرومبتات الخاصة",
    checking: "جارٍ التحقق من الوصول…",
    invalid: "الرابط غير صالح أو لم يكتمل الدفع بعد.",
  },
  thanks: {
    title: "تم الدفع بنجاح 🎉",
    subtitle: "شكراً لك! الكتاب ومكتبتك الخاصة في طريقهما إلى بريدك الآن.",
    emailSent: "أرسلنا رسالة تحتوي على كل الروابط.",
    openLibrary: "افتح مكتبتك الآن",
    pending: "جارٍ تأكيد عملية الدفع…",
    failed: "لم نستطع تأكيد الدفع. تواصل معنا إذا خُصم المبلغ.",
  },
};

const en: Dict = {
  htmlLang: "en",
  seo: {
    title: "How to Profit From AI — The Million Dollar Playbook",
    description:
      "A practical playbook for building real revenue with AI: a 30-day roadmap, a prompt library, and ready-to-run automation templates.",
  },
  nav: { home: "Home", book: "The book", pricing: "Pricing", reviews: "Reviews" },
  hero: {
    offer: "Offer ends in",
    offerValue: "48 hours • 40% off",
    buy: "Buy now",
    menu: "Menu",
    line1: "Stop chasing",
    line2: "random opportunities.",
    paragraph:
      "Your tools and skills are scattered across dozens of platforms. This book turns them into one clear system that makes AI a real income source — step by step, all the way to your first million dollars.",
    cta: "Get the book",
    demoAlt: "Book preview",
    playLabel: "Play preview",
    watchDemo: "Watch preview",
  },
  bookSection: {
    eyebrow: "The book",
    title1: "One million dollars",
    title2: "with artificial intelligence",
    paragraph:
      "A clear, noise-free playbook: how to pick your market, build an AI product, and price it for recurring revenue that outlives the trends.",
    facts: [
      { k: "12", v: "practical chapters" },
      { k: "200+", v: "ready prompts" },
      { k: "30", v: "days to launch" },
    ],
    cta: "Buy the book",
  },
  benefits: {
    badge: "What you get",
    title: "A clear system, not generic advice",
    subtitle: "Three pillars that move you from random experiments to recurring income.",
    start: "Start",
    peak: "Peak",
    month1: "Month 1",
    month6: "Month 6",
    month12: "Month 12",
    assistant: "AI assistant",
    question: "How do I launch my first product?",
    answer:
      "Pick the market, write the offer, and ship in 30 days — the book hands you the prompts and the workflow.",
    runNow: "Run it now",
    timeSaved: "Time saved",
    hours: "128 hours",
    efficiency: "↑ 18% efficiency",
    confidence: "98% decision confidence",
    cards: [
      { title: "Clear visibility", desc: "A number-driven map of where you are and where you're going." },
      { title: "Full automation", desc: "Ready workflows that execute instead of manual busywork." },
      { title: "Faster decisions", desc: "Turn what you learn into immediate execution." },
    ],
  },
  features: {
    badge: "Core features",
    title: "Everything in one place",
    subtitle: "From the first idea to your first thousand dollars.",
    promptQuote: ["“Write me an offer that sells", "AI consulting", "to a cold client”"],
    readyPrompts: "Ready prompts",
    card1: "200-prompt library",
    steps: ["Pick the market", "Build the product", "Price and scale"],
    card2: "30-day roadmap",
    searchLibrary: "Search the library",
    card3: "Automation templates & community",
  },
  pricing: {
    badge: "Pricing",
    title: "Choose your edition",
    subtitle: "One payment, lifetime access, free updates.",
    bookTitle: "Book only",
    bookDesc: "PDF and EPUB with free updates.",
    bundleTitle: "Complete bundle",
    bundleDesc:
      "Book + prompt library + 18 curated AI books + automation templates + private community.",
    buy: "Buy now",
    loading: "Redirecting…",
    emailLabel: "Your email",
    emailPlaceholder: "name@example.com",
    emailHint: "We'll send the book and library to this address after payment.",
    error: "Could not start checkout, please try again.",
  },
  reviews: {
    badge: "Reader reviews",
    title: "Real results",
    subtitle: "4.9 out of 5 from more than 1,200 readers.",
    items: [
      { name: "Mahmoud Saeed", role: "Agency founder", quote: "I applied one chapter and tripled agency revenue in 90 days." },
      { name: "Sara Alotaibi", role: "Content writer", quote: "The prompt library alone is worth ten times the price." },
      { name: "Ahmed Fathy", role: "Product developer", quote: "My first SaaS shipped in a month thanks to the roadmap." },
    ],
  },
  cta: {
    title: "Start your journey today",
    subtitle: "One copy is enough to change the way you work.",
    button: "Get your copy",
  },
  footer: { rights: "How to profit from AI © 2026" },
  library: {
    title: "Your private library",
    subtitle: "18 curated AI references + the prompt library.",
    locked: "This library is for buyers only",
    lockedDesc: "After checkout you receive a private link to your library by email.",
    open: "Open the book",
    promptsNote: "Private prompt library",
    checking: "Verifying access…",
    invalid: "This link is invalid or the payment isn't complete yet.",
  },
  thanks: {
    title: "Payment complete 🎉",
    subtitle: "Thank you! Your book and private library are on their way to your inbox.",
    emailSent: "We sent an email with every link.",
    openLibrary: "Open your library now",
    pending: "Confirming your payment…",
    failed: "We couldn't confirm the payment. Contact us if you were charged.",
  },
};

export const dictionaries: Record<Lang, Dict> = { ar, en };
export const t = (lang: Lang) => dictionaries[lang];
export type { Dict };
