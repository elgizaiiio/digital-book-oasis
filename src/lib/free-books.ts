export const PROMPT_LIBRARY_URL = "https://motionsites.ai";

export type FreeBook = {
  title: string;
  author: string;
  year: number;
  description: string;
  tag: string;
  url: string;
};

export const freeBooks: FreeBook[] = [
  {
    title: "Deep Learning",
    author: "Goodfellow, Bengio & Courville",
    year: 2016,
    description:
      "المرجع الأشمل في التعلم العميق: الأسس الرياضية والخوارزميات الحديثة، مجاناً من المؤلفين.",
    tag: "تعلم عميق",
    url: "https://www.deeplearningbook.org/",
  },
  {
    title: "Dive into Deep Learning",
    author: "Zhang, Lipton, Li & Smola",
    year: 2023,
    description:
      "كتاب تفاعلي يجمع الشرح النظري بالأكواد العملية (PyTorch/TensorFlow/JAX)، معتمد في أكثر من 500 جامعة.",
    tag: "كورس تفاعلي",
    url: "https://d2l.ai/",
  },
  {
    title: "Mathematics for Machine Learning",
    author: "Deisenroth, Faisal & Ong",
    year: 2020,
    description:
      "الجبر الخطي والتفاضل والاحتمالات: كل الرياضيات التي تحتاجها لفهم تعلم الآلة في كتاب واحد.",
    tag: "رياضيات",
    url: "https://mml-book.github.io/book/mml-book.pdf",
  },
  {
    title: "The Elements of Statistical Learning",
    author: "Hastie, Tibshirani & Friedman",
    year: 2009,
    description:
      "مرجع ستانفورد الكلاسيكي في التعلم الإحصائي والتنقيب عن البيانات، بنسخة PDF محدثة.",
    tag: "تعلم إحصائي",
    url: "https://hastie.su.domains/ElemStatLearn/download.html",
  },
  {
    title: "Artificial Intelligence: A Modern Approach",
    author: "Russell & Norvig",
    year: 2020,
    description:
      "الموقع الرسمي لأشهر كتاب في الذكاء الاصطناعي، مع فصول تمهيدية ومصادر تعليمية مجانية.",
    tag: "مرجع عام",
    url: "https://aima.cs.berkeley.edu/",
  },
  {
    title: "AIMA — Introduction Chapter",
    author: "Russell & Norvig",
    year: 2020,
    description:
      "الفصل التمهيدي الكامل من الطبعة الرابعة، متاح رسمياً من جامعة بيركلي.",
    tag: "فصل مجاني",
    url: "https://aima.eecs.berkeley.edu/newchap00.pdf",
  },
  {
    title: "AI Index Report 2024",
    author: "Stanford HAI",
    year: 2024,
    description:
      "التقرير السنوي الأشمل لتتبع تطورات الذكاء الاصطناعي التقنية والاقتصادية والسياسية عالمياً.",
    tag: "تقرير سوق",
    url: "https://hai.stanford.edu/assets/files/hai_ai-index-report-2024-smaller2.pdf",
  },
  {
    title: "Prompt Engineering Whitepaper",
    author: "Lee Boonstra — Google",
    year: 2024,
    description:
      "دليل جوجل الرسمي في هندسة الأوامر لنماذج اللغة الكبيرة، خطوة بخطوة مع أمثلة عملية.",
    tag: "برومبتات",
    url: "https://www.kaggle.com/whitepaper-prompt-engineering",
  },
  {
    title: "OpenAI Prompt Engineering Guide",
    author: "OpenAI",
    year: 2024,
    description:
      "أفضل ممارسات كتابة البرومبتات رسمياً من OpenAI للحصول على أفضل نتائج من نماذج GPT.",
    tag: "برومبتات",
    url: "https://platform.openai.com/docs/guides/prompt-engineering",
  },
  {
    title: "CS229 Machine Learning Notes",
    author: "Andrew Ng & Tengyu Ma",
    year: 2023,
    description:
      "ملاحظات مقرر تعلم الآلة الشهير في ستانفورد بقلم أندرو نج، كاملة ومجانية.",
    tag: "محاضرات",
    url: "https://cs229.stanford.edu/main_notes.pdf",
  },
  {
    title: "Reinforcement Learning: An Introduction",
    author: "Sutton & Barto",
    year: 2018,
    description:
      "الكتاب المرجعي الأساسي في التعلم المعزز، مجاناً من موقع المؤلف الرسمي.",
    tag: "تعلم معزز",
    url: "http://incompleteideas.net/book/the-book-2nd.html",
  },
  {
    title: "Speech and Language Processing",
    author: "Jurafsky & Martin",
    year: 2024,
    description:
      "المرجع الأشمل في معالجة اللغات الطبيعية والنماذج اللغوية الكبيرة، مسودة الطبعة الثالثة.",
    tag: "معالجة لغة",
    url: "https://web.stanford.edu/~jurafsky/slp3/ed3book.pdf",
  },
  {
    title: "Attention Is All You Need",
    author: "Vaswani et al. — Google",
    year: 2017,
    description:
      "الورقة التي قدّمت بنية المحوّلات (Transformers) التي تقوم عليها كل نماذج اللغة الحديثة.",
    tag: "ورقة بحثية",
    url: "https://arxiv.org/pdf/1706.03762",
  },
  {
    title: "توصية اليونسكو بشأن أخلاقيات الذكاء الاصطناعي",
    author: "UNESCO",
    year: 2022,
    description:
      "أول معيار عالمي شامل لأخلاقيات الذكاء الاصطناعي، متاح رسمياً باللغة العربية.",
    tag: "أخلاقيات",
    url: "https://unesdoc.unesco.org/ark:/48223/pf0000381137_ara",
  },
  {
    title: "الاستراتيجية الوطنية للبيانات والذكاء الاصطناعي",
    author: "سدايا (SDAIA)",
    year: 2025,
    description:
      "الوثيقة الرسمية لاستراتيجية السعودية في البيانات والذكاء الاصطناعي ضمن رؤية 2030.",
    tag: "استراتيجية",
    url: "https://sdaia.gov.sa/en/SDAIA/SdaiaStrategies/Documents/NSDAI.pdf",
  },
  {
    title: "دليلك إلى فهم الذكاء الاصطناعي: مدخل مبسَّط",
    author: "عثمان عمر خليفة و يوسف ناصر",
    year: 2025,
    description:
      "كتاب عربي مبسّط يقدّم مدخلاً ميسّراً لمفاهيم الذكاء الاصطناعي لغير المتخصصين.",
    tag: "عربي",
    url: "https://irep.iium.edu.my/124375/",
  },
  {
    title: "Probabilistic Machine Learning: An Introduction",
    author: "Kevin P. Murphy",
    year: 2022,
    description:
      "كتاب حديث وشامل عن تعلم الآلة الاحتمالي من MIT Press، متاح مجاناً من المؤلف.",
    tag: "احتمالات",
    url: "https://probml.github.io/pml-book/book1.html",
  },
  {
    title: "Neural Networks and Deep Learning",
    author: "Michael Nielsen",
    year: 2015,
    description:
      "كتاب تفاعلي يشرح الشبكات العصبية من الصفر بأسلوب تعليمي مبسّط جداً.",
    tag: "مبتدئين",
    url: "http://neuralnetworksanddeeplearning.com/",
  },
];
