export const LANGS = ["ar", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const isLang = (v: string): v is Lang => (LANGS as readonly string[]).includes(v);

export const dir = (lang: Lang) => (lang === "ar" ? "rtl" : "ltr");

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
    orderTitle: string;
    orderId: string;
    emailField: string;
    productField: string;
    amountField: string;
    dateField: string;
    statusField: string;
    statusPaid: string;
    statusPending: string;
    statusFailed: string;
    productBook: string;
    productBundle: string;
    includes: string;
    includesBook: string;
    includesPrompts: string;
    includesBooks: string;
    includesUpdates: string;
    saveLink: string;
    copyLink: string;
    copied: string;
    support: string;
  };
};

const ar: Dict = {
  htmlLang: "ar",
  seo: {
    title: "إزاي تكسب من الذكاء الاصطناعي — كتاب المليون دولار",
    description:
      "دليل عملي بالمصري تبني بيه دخل حقيقي من الذكاء الاصطناعي: خطة ٣٠ يوم، مكتبة برومبتات، وقوالب أتمتة جاهزة.",
  },
  nav: { home: "الرئيسية", book: "الكتاب", pricing: "الباقات", reviews: "الآراء" },
  hero: {
    offer: "العرض هيقفل خلال",
    offerValue: "٤٨ ساعة • خصم ٤٠٪",
    buy: "اشتري دلوقتي",
    menu: "القائمة",
    line1: "بطّل تجري ورا",
    line2: "الفرص العشوائية.",
    paragraph:
      "أدواتك ومهاراتك مبعترة على عشرات المنصات. الكتاب ده بيلمّها كلها في نظام واحد واضح، يحوّل الذكاء الاصطناعي لمصدر دخل حقيقي — خطوة بخطوة لحد أول مليون دولار.",
    cta: "هات الكتاب",
    demoAlt: "مقدمة الكتاب",
    playLabel: "شغّل المقدمة",
    watchDemo: "اتفرج على المقدمة",
  },
  bookSection: {
    eyebrow: "الكتاب",
    title1: "مليون دولار",
    title2: "بالذكاء الاصطناعي",
    paragraph:
      "كلام واضح من غير لف ودوران: إزاي تختار السوق، وتبني منتج بالذكاء الاصطناعي، وتحطله سعر يجيبلك دخل شهري مستمر حتى بعد ما الترند يعدّي.",
    facts: [
      { k: "١٢", v: "فصل عملي" },
      { k: "٢٠٠+", v: "برومبت جاهز" },
      { k: "٣٠", v: "يوم للتنفيذ" },
    ],
    cta: "اشتري الكتاب",
  },
  benefits: {
    badge: "الكتاب بيقدّم إيه",
    title: "نظام واضح، مش نصايح عامة",
    subtitle: "٣ حاجات بس هينقلوك من التجربة العشوائية لدخل شهري ثابت.",
    start: "البداية",
    peak: "الذروة",
    month1: "شهر ١",
    month6: "شهر ٦",
    month12: "شهر ١٢",
    assistant: "مساعد الذكاء الاصطناعي",
    question: "أبدأ أول منتج ليا إزاي؟",
    answer:
      "حدّد السوق، اكتب العرض، وابني المنتج في ٣٠ يوم — الكتاب مديك البرومبتات وخطوات الشغل جاهزة.",
    runNow: "نفّذ دلوقتي",
    timeSaved: "الوقت اللي وفّرته",
    hours: "١٢٨ ساعة",
    efficiency: "↑ ١٨٪ كفاءة",
    confidence: "ثقة في القرار ٩٨٪",
    cards: [
      { title: "رؤية واضحة", desc: "أرقام قدامك تعرف بيها انت فين وهتوصل فين." },
      { title: "أتمتة كاملة", desc: "شغل بيمشي لوحده بدل ما تقعد تعمله بإيدك." },
      { title: "قرارات أسرع", desc: "تحوّل اللي بتتعلمه لتنفيذ على طول." },
    ],
  },
  features: {
    badge: "أهم المميزات",
    title: "كل اللي محتاجه في مكان واحد",
    subtitle: "من أول فكرة لحد أول ألف دولار.",
    promptQuote: ["«اكتبلي عرض يبيع خدمة", "استشارات الذكاء الاصطناعي", "لعميل معرفنيش»"],
    readyPrompts: "برومبتات جاهزة",
    card1: "مكتبة ٢٠٠ برومبت",
    steps: ["حدّد السوق", "ابني المنتج", "سعّر ووسّع"],
    card2: "خطة ٣٠ يوم",
    searchLibrary: "دوّر جوه المكتبة",
    card3: "قوالب أتمتة ومجتمع",
  },
  pricing: {
    badge: "الباقات",
    title: "اختار نسختك",
    subtitle: "دفعة واحدة، وصول مدى الحياة، وتحديثات مجانية.",
    bookTitle: "الكتاب بس",
    bookDesc: "نسخة PDF و EPUB مع تحديثات مجانية.",
    bundleTitle: "الباقة الكاملة",
    bundleDesc: "الكتاب + مكتبة البرومبتات + ١٨ كتاب مختار + قوالب الأتمتة + المجتمع الخاص.",
    buy: "اشتري دلوقتي",
    loading: "بنحوّلك…",
    emailLabel: "إيميلك",
    emailPlaceholder: "name@example.com",
    emailHint: "بعد الدفع هتلاقي كل التفاصيل والروابط قدامك على طول في صفحة الطلب.",
    error: "معرفناش نبدأ الدفع، جرّب تاني.",
  },
  reviews: {
    badge: "آراء القرّاء",
    title: "نتايج حقيقية",
    subtitle: "٤.٩ من ٥ من أكتر من ١٢٠٠ قارئ.",
    items: [
      {
        name: "محمود سعيد",
        role: "صاحب وكالة تسويق",
        quote: "طبّقت فصل واحد بس، ودخل الوكالة بقى ٣ أضعاف في ٩٠ يوم. مش مبالغة.",
      },
      {
        name: "سارة العتيبي",
        role: "كاتبة محتوى",
        quote: "مكتبة البرومبتات لوحدها تسوى تمن الكتاب عشر مرات، بشتغل بيها كل يوم.",
      },
      {
        name: "أحمد فتحي",
        role: "مطوّر منتجات",
        quote: "أول منتج SaaS ليا نزل السوق في شهر بفضل خطة الـ٣٠ يوم.",
      },
      {
        name: "مروة عبد الرحمن",
        role: "مصممة جرافيك",
        quote: "كنت باخد ٣ مشاريع في الشهر، دلوقتي باخد ٨ ومش تعبانة — الأتمتة عملت الفرق.",
      },
      {
        name: "كريم الشناوي",
        role: "فريلانسر",
        quote: "أول عميل بالدولار جالي بعد أسبوعين من قراية الفصل الرابع. جد.",
      },
      {
        name: "نورهان مصطفى",
        role: "أخصائية سوشيال ميديا",
        quote: "بقيت بجهّز محتوى شهر كامل في يومين. مديري افتكر إني وظفت حد يساعدني 😅",
      },
      {
        name: "عمرو حسّان",
        role: "صاحب متجر إلكتروني",
        quote: "وصف المنتجات والإعلانات بقت كلها بالبرومبتات، ومعدل التحويل زاد ٢٢٪.",
      },
      {
        name: "دينا رأفت",
        role: "مدرّسة أونلاين",
        quote: "أسهل كتاب قريته في الموضوع ده، كلام مصري بسيط وخطوات تنفّذها فورًا.",
      },
      {
        name: "زياد الجندي",
        role: "مهندس برمجيات",
        quote: "الجزء بتاع التسعير غيّر تفكيري خالص، رفعت أسعاري الضعف ومحدش اعترض.",
      },
    ],
  },
  cta: {
    title: "ابدأ رحلتك النهاردة",
    subtitle: "نسخة واحدة تكفي تغيّر طريقة شغلك بالكامل.",
    button: "هات نسختك",
  },
  footer: { rights: "إزاي تكسب من الذكاء الاصطناعي © ٢٠٢٦" },
  library: {
    title: "مكتبتك الخاصة",
    subtitle: "١٨ مرجع مختار في الذكاء الاصطناعي + مكتبة البرومبتات.",
    locked: "المكتبة دي للمشتريين بس",
    lockedDesc: "بعد ما تدفع هتتحوّل على طول لصفحة فيها كل التفاصيل ورابط مكتبتك.",
    open: "افتح الكتاب",
    promptsNote: "مكتبة البرومبتات الخاصة",
    checking: "بنتأكد من الوصول…",
    invalid: "الرابط مش صالح أو الدفع لسه ماتمّش.",
  },
  thanks: {
    title: "تمام، الدفع نجح 🎉",
    subtitle: "دي تفاصيل طلبك كاملة، ومكتبتك جاهزة تفتحها دلوقتي.",
    emailSent: "كل حاجة جاهزة قدامك تحت.",
    openLibrary: "افتح مكتبتك دلوقتي",
    pending: "بنأكد عملية الدفع… ثواني.",
    failed: "معرفناش نأكد الدفع. كلّمنا لو المبلغ اتخصم.",
    orderTitle: "تفاصيل الطلب",
    orderId: "رقم الطلب",
    emailField: "الإيميل",
    productField: "المنتج",
    amountField: "المبلغ",
    dateField: "تاريخ الطلب",
    statusField: "الحالة",
    statusPaid: "مدفوع",
    statusPending: "قيد التأكيد",
    statusFailed: "فشل",
    productBook: "الكتاب بس",
    productBundle: "الباقة الكاملة",
    includes: "الطلب شامل",
    includesBook: "الكتاب PDF و EPUB",
    includesPrompts: "مكتبة ٢٠٠ برومبت",
    includesBooks: "١٨ كتاب مختار في الذكاء الاصطناعي",
    includesUpdates: "تحديثات مجانية مدى الحياة",
    saveLink: "احفظ الرابط ده، هو مفتاح مكتبتك.",
    copyLink: "انسخ رابط المكتبة",
    copied: "اتنسخ ✔",
    support: "أي مشكلة؟ كلّمنا وهنحلها على طول.",
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
      {
        title: "Clear visibility",
        desc: "A number-driven map of where you are and where you're going.",
      },
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
    emailHint: "Right after payment you get a page with your full order details and library link.",
    error: "Could not start checkout, please try again.",
  },
  reviews: {
    badge: "Reader reviews",
    title: "Real results",
    subtitle: "4.9 out of 5 from more than 1,200 readers.",
    items: [
      {
        name: "Mahmoud Saeed",
        role: "Agency founder",
        quote: "I applied one chapter and tripled agency revenue in 90 days.",
      },
      {
        name: "Sara Alotaibi",
        role: "Content writer",
        quote: "The prompt library alone is worth ten times the price.",
      },
      {
        name: "Ahmed Fathy",
        role: "Product developer",
        quote: "My first SaaS shipped in a month thanks to the roadmap.",
      },
      {
        name: "Marwa Abdelrahman",
        role: "Graphic designer",
        quote: "I went from 3 projects a month to 8 — automation made the difference.",
      },
      {
        name: "Karim Elshennawy",
        role: "Freelancer",
        quote: "My first dollar client landed two weeks after chapter four.",
      },
      {
        name: "Nourhan Mostafa",
        role: "Social media specialist",
        quote: "I now prepare a full month of content in two days.",
      },
      {
        name: "Amr Hassan",
        role: "Store owner",
        quote: "Product copy and ads run on prompts now, conversion is up 22%.",
      },
      {
        name: "Dina Raafat",
        role: "Online teacher",
        quote: "The simplest book on the topic — steps you can execute today.",
      },
      {
        name: "Ziad Elgendy",
        role: "Software engineer",
        quote: "The pricing section changed my thinking; I doubled my rates with no pushback.",
      },
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
    lockedDesc: "Right after checkout you land on a page with your details and library link.",
    open: "Open the book",
    promptsNote: "Private prompt library",
    checking: "Verifying access…",
    invalid: "This link is invalid or the payment isn't complete yet.",
  },
  thanks: {
    title: "Payment complete 🎉",
    subtitle: "Here are your full order details — your library is ready right now.",
    emailSent: "Everything you need is right below.",
    openLibrary: "Open your library now",
    pending: "Confirming your payment…",
    failed: "We couldn't confirm the payment. Contact us if you were charged.",
    orderTitle: "Order details",
    orderId: "Order ID",
    emailField: "Email",
    productField: "Product",
    amountField: "Amount",
    dateField: "Order date",
    statusField: "Status",
    statusPaid: "Paid",
    statusPending: "Confirming",
    statusFailed: "Failed",
    productBook: "Book only",
    productBundle: "Complete bundle",
    includes: "What's included",
    includesBook: "The book in PDF and EPUB",
    includesPrompts: "200-prompt library",
    includesBooks: "18 curated AI references",
    includesUpdates: "Free lifetime updates",
    saveLink: "Save this link — it's the key to your library.",
    copyLink: "Copy library link",
    copied: "Copied ✔",
    support: "Need help? Reach out and we'll sort it immediately.",
  },
};

export const dictionaries: Record<Lang, Dict> = { ar, en };
export const t = (lang: Lang) => dictionaries[lang];
export type { Dict };
