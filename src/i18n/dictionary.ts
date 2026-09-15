export type Locale = "ar" | "en";

export interface Dictionary {
  dir: "rtl" | "ltr";
  nav: {
    brand: string;
    products: string;
    cart: string;
    orders: string;
    dashboard: string;
    login: string;
    register: string;
    logout: string;
    hello: string;
  };
  hero: {
    title: string;
    subtitle: string;
    shopNow: string;
    tabs: string[];
    stats: {
      products: string;
      arrivals: string;
      off: string;
      satisfaction: string;
    };
  };
  products: {
    title: string;
    subtitle: string;
    addToCart: string;
    added: string;
    outOfStock: string;
    inStock: string;
    price: string;
    page: string;
    of: string;
    next: string;
    prev: string;
    categories: {
      womenswear: string;
      menswear: string;
      kidswear: string;
      accessories: string;
    };
    audiences: {
      all: string;
      mens: string;
      womens: string;
      kids: string;
    };
    fit: string;
  };
  cart: {
    title: string;
    empty: string;
    emptyHint: string;
    browse: string;
    quantity: string;
    remove: string;
    subtotal: string;
    total: string;
    checkout: string;
    checkoutSuccess: string;
    adminNotice: string;
    clearCart: string;
    clearCartTitle: string;
    clearCartConfirm: string;
    clearCartConfirmAction: string;
    cancel: string;
  };
  orders: {
    title: string;
    allOrdersTitle: string;
    customer: string;
    empty: string;
    orderNumber: string;
    status: string;
    date: string;
    total: string;
    statuses: {
      processing: string;
      shipped: string;
      delivered: string;
      cancelled: string;
    };
    protectedMessage: string;
    goLogin: string;
  };
  auth: {
    loginTitle: string;
    registerTitle: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    loginButton: string;
    registerButton: string;
    noAccount: string;
    haveAccount: string;
    goRegister: string;
    goLogin: string;
    demoHint: string;
    errors: {
      invalidCredentials: string;
      emailRequired: string;
      passwordRequired: string;
      nameRequired: string;
      emailInvalid: string;
      passwordShort: string;
      passwordMismatch: string;
      emailTaken: string;
    };
    registerSuccess: string;
  };
  common: {
    currency: string;
    loading: string;
    themeToggle: string;
    languageToggle: string;
    menuToggle: string;
    notAuthorized: string;
  };
  copy :{
    title: string;
    subtitle:string;
    cta: string;
  }
  trends: {
    title: string;
    subtitle: string;
    items: { title: string; desc: string }[];
  };
  journey: {
    title: string;
    subtitle: string;
    steps: { step: string; title: string; desc: string }[];
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: {
      name: string;
      location: string;
      rating: number;
      quote: string;
    }[];
  };
  footer: {
    tickerItems: string[];
    homeHeading: string;
    homeLinks: string[];
    productsHeading: string;
    productsLinks: string[];
    newsletterHeading: string;
    emailPlaceholder: string;
    copyright: string;
    terms: string;
    privacy: string;
  };
  legal: {
    termsTitle: string;
    termsBody: string;
    privacyTitle: string;
    privacyBody: string;
    backHome: string;
  };
  catalog: Record<string, { name: string; desc: string ; fit: string  }>;
  productDetails: {
    backToProducts: string;
    shopNow: string;
    mrpNote: string;
    materialsHeading: string;
    joinLifeHeading: string;
    joinLifeText: string;
    materialsSubheading: string;
    materialsText: string;
    featuresHeading: string;
    features: string[];
    sizesHeading: string;
    ratingsHeading: string;
    ratingsLabel: string;
    notFoundTitle: string;
    notFoundHint: string;
  };
  dashboard: {
  title: string;
  subtitle: string;
  addProductHeading: string;
  editProductHeading: string;

  name: string;
  nameEnglish: string;
  nameArabic: string;

  description: string;
  descriptionEnglish: string;
  descriptionArabic: string;

  price: string;
  category: string;
  audience: string;

  fit: string;
  fitEnglish: string;
  fitArabic: string;

  stock: string;
  rating: string;
  image: string;
  imageHint: string;
  submit: string;
  saveChanges: string;
  cancel: string;
  existingHeading: string;
  edit: string;
  delete: string;
  deleteConfirm: string;
  alert: string;
  deleteTitle: string;
  deleteConfirmAction: string;
  addSuccessTitle: string;
  addSuccessMessage: string;
  close: string;
  
};
  faq: {
    title: string;
    subtitle: string;
    items: { question: string; answer: string }[];
  };
}

export const dictionary: Record<Locale, Dictionary> = {
  ar: {
    dir: "rtl",
    nav: {
      brand: "Style.LOOM",
      products: "الصفحة الرئيسية",
      cart: "",
      orders: "طلباتي",
      dashboard: "لوحة التحكم",
      login: "تسجيل الدخول",
      register: "حساب جديد",
      logout: "تسجيل الخروج",
      hello: "أهلاً",
    },
    hero: {
      title: "ارتقِ بأناقتك مع StyleLoom",
      subtitle: "استكشفي عالماً من الموضة مع StyleLoom، حيث تلتقي أحدث صيحات الموضة بأسعار مناسبة للجميع.",
      shopNow: "تسوقي الآن",
      tabs: ["الكل", "رجالي", "نسائي", "أطفال"],
      stats: {
        products: "منتج متنوع",
        arrivals: "قطعة جديدة كل شهر",
        off: "خصم على قطع مختارة",
        satisfaction: "نسبة رضا العملاء",
      },
    },
    products: {
      title: "ارتقِ بأسلوبك مع تشكيلتنا الأحدث",
      subtitle: "كل قطعة صُممت لتُبرز حسّك في الموضة.",
      addToCart: "   أضف إلى السلة↗ ",
      added: "أُضيف",
      outOfStock: "غير متوفر",
      inStock: "متوفر",
      price: "السعر",
      page: "صفحة",
      of: "من",
      next: "التالي",
      prev: "السابق",
      categories: {
        womenswear: "ملابس نسائية",
        menswear: "ملابس رجالية",
        kidswear: "ملابس أطفال",
        accessories: "إكسسوارات",
      },
      audiences: {
        all: "الكل",
        mens: "رجالي",
        womens: "نسائي",
        kids: "أطفال",
      },
      fit: "المقاس",
    },
    cart: {
      title: "سلة المشتريات",
      empty: "سلتك فارغة حالياً",
      emptyHint: "تصفح المنتجات وأضف ما يعجبك",
      browse: "تصفح المنتجات",
      quantity: "الكمية",
      remove: "إزالة",
      subtotal: "المجموع الفرعي",
      total: "الإجمالي",
      checkout: "إتمام الطلب",
      checkoutSuccess: "تم إنشاء الطلب بنجاح",
      adminNotice: "حساب الأدمن لا يتسوق — استخدم لوحة التحكم لإدارة المنتجات",
      clearCart: "إفراغ السلة",
      clearCartTitle: "تأكيد إفراغ السلة",
      clearCartConfirm: "سوف يتم حذف كل المنتجات من سلتك. هاد الإجراء لا يمكن التراجع عنه",
      clearCartConfirmAction: "نعم، إفراغ السلة",
      cancel: "إلغاء",
    },
    orders: {
      title: "طلباتي السابقة",
      allOrdersTitle: "كل الطلبات",
      customer: "الزبون",
      empty: "لا توجد طلبات سابقة بعد",
      orderNumber: "طلب رقم",
      status: "الحالة",
      date: "التاريخ",
      total: "الإجمالي",
      statuses: {
        processing: "قيد المعالجة",
        shipped: "تم الشحن",
        delivered: "تم التوصيل",
        cancelled: "ملغي",
      },
      protectedMessage: "هذه الصفحة متاحة فقط للمستخدمين المسجلين",
      goLogin: "الذهاب لتسجيل الدخول",
    },
    auth: {
      loginTitle: "تسجيل الدخول",
      registerTitle: "إنشاء حساب جديد",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      loginButton: "دخول",
      registerButton: "إنشاء الحساب",
      noAccount: "ليس لديك حساب؟",
      haveAccount: "لديك حساب بالفعل؟",
      goRegister: "أنشئ حساباً",
      goLogin: "سجّل الدخول",
      demoHint: "بيانات تجريبية: admin@demo.com / admin123 أو sara@demo.com / user123",
      errors: {
        invalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
        emailRequired: "البريد الإلكتروني مطلوب",
        passwordRequired: "كلمة المرور مطلوبة",
        nameRequired: "الاسم مطلوب",
        emailInvalid: "صيغة البريد الإلكتروني غير صحيحة",
        passwordShort: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
        passwordMismatch: "كلمتا المرور غير متطابقتين",
        emailTaken: "هذا البريد الإلكتروني مستخدم بالفعل",
      },
      registerSuccess: "تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن",
    },
    common: {
      currency: "$",
      loading: "جاري التحميل...",
      themeToggle: "تبديل المظهر",
      languageToggle: "English",
      menuToggle: "فتح القائمة",
      notAuthorized: "هذه الصفحة غير متاحة لحسابك",
    },
      copy: {
    title: "ارتقِ بخزانة ملابسك",
    subtitle:
      "لا تفوّتي الفرصة — جرّبي أرقى ما بالموضة بضغطة \"اشتري الآن\"، وابدئي رحلتك نحو أناقة تصل لباب بيتك.",
    cta: "تسوّقي الآن",
  },
    trends: {
      title: "نصنع الاتجاهات، نُلهم الثقة",
      subtitle: "استكشف عالماً من الموضة مع StyleLoom، حيث تلتقي أحدث الصيحات بأسعار مناسبة للجميع.",
      items: [
        {
          title: "حرفية شغوفة",
          desc: "كل قطعة في StyleLoom مصنوعة بشغف، تعكس التزامنا بالجودة والابتكار.",
        },
        {
          title: "أزياء تسبق العصر",
          desc: "نحن أكثر من مجرد علامة تجارية؛ نحن صنّاع الاتجاهات، نبتكر أنماطاً تمنحك الثقة والإلهام.",
        },
        {
          title: "نهج يركّز على العميل",
          desc: "في StyleLoom، عملاؤنا هم محور كل ما نقوم به. رضاكم هو مقياس نجاحنا.",
        },
        {
          title: "إلهام عالمي",
          desc: "مستوحون من اتجاهات الموضة العالمية، نقدّم لكم مجموعة متنوعة وديناميكية تجسّد روح الموضة من كل أنحاء العالم.",
        },
        {
          title: "نمنح أسلوبك القوة",
          desc: "أكثر من مجرد ملابس، StyleLoom أسلوب حياة. انضم إلينا في رحلة التعبير عن الذات والتمكين من خلال الموضة.",
        },
        {
          title: "ممارسات مستدامة",
          desc: "تلتزم StyleLoom بالاستدامة، من خلال دمج ممارسات صديقة للبيئة في عملية الإنتاج لدينا.",
        },
      ],
    },
    journey: {
      title: "تعرّف على رحلة التسوّق في StyleLoom",
      subtitle: "في StyleLoom، صممنا تجربة تسوّق بسيطة وواضحة لنجعل الموضة في متناول الجميع.",
      steps: [
        {
          step: "الخطوة 01",
          title: "اكتشف أحدث الصيحات",
          desc: "تصفّح تشكيلتنا المختارة بعناية والتي تضم أكثر من 1000 قطعة من صيحات الموضة العالمية.",
        },
        {
          step: "الخطوة 02",
          title: "تصفّح سهل وبسيط",
          desc: "فلاتر وتصنيفات بديهية تساعدك على إيجاد القطع المثالية التي تناسب أسلوبك.",
        },
        {
          step: "الخطوة 03",
          title: "دفع آمن وموثوق",
          desc: "خيارات دفع متعددة ومعاملات مشفّرة تضمن لك عملية شراء آمنة وسلسة.",
        },
        {
          step: "الخطوة 04",
          title: "افرح بمنتجك الجديد",
          desc: "استقبل تجربة موضة راقية تصل إلى بابك مباشرة، جاهزة لترتقي بأسلوبك.",
        },
      ],
    },
    testimonials: {
      title: "مجموعة آراء عملاء StyleLoom.",
      subtitle: "في StyleLoom، عملاؤنا هم نبض علامتنا التجارية.",
      items: [
        {
          name: "سارة طومسون",
          location: "نيويورك، الولايات المتحدة",
          rating: 5,
          quote: "StyleLoom فاق توقعاتي. جودة وتصميم الفستان خلوني أحس إني ملكة. والشحن كان سريع كمان!",
        },
        {
          name: "راجيش باتيل",
          location: "مومباي، الهند",
          rating: 5,
          quote: "عجبني كتير ستايل ودفء الجاكيت. مزيج مثالي بين الأناقة والعملية!",
        },
        {
          name: "إيميلي ووكر",
          location: "لندن، بريطانيا",
          rating: 4,
          quote: "قطعة رائعة ومريحة! بنتي بتحب طقمها الجديد كتير. شكراً StyleLoom على تلبيس أصغر عاشقة موضة عندنا.",
        },
        {
          name: "أليخاندرو مارتينيز",
          location: "برشلونة، إسبانيا",
          rating: 5,
          quote: "انبهرت بالجودة والستايل. هالحذاء لفت الأنظار بكل مناسبة رحت فيها. StyleLoom، كسبتوا زبون دائم!",
        },
        {
          name: "بريا شارما",
          location: "دلهي، الهند",
          rating: 5,
          quote: "مقاس مثالي وجودة استثنائية. هالجينز صار خياري الأول للإطلالات اليومية والأنيقة.",
        },
        {
          name: "ماريا رودريغيز",
          location: "مكسيكو سيتي، المكسيك",
          rating: 5,
          quote: "سنيكرز أنيق بدون ما يضحّي بالراحة. StyleLoom عارفين كيف يوازنوا بين الموضة والعملية.",
        },
      ],
    },
    footer: {
      tickerItems: [
        "توب بحمالات",
        "تيشيرت",
        "تيشيرت أكمام طويلة",
        "قميص أكمام راجلان",
        "كروب توب",
        "قميص ياقة V",
        "قميص بلا أكمام",
      ],
      homeHeading: "الرئيسية",
      homeLinks: ["من نحن", "عنّا", "آراء العملاء", "الأسئلة الشائعة"],
      productsHeading: "المنتجات",
      productsLinks: ["رجالي", "نسائي", "أطفال"],
      newsletterHeading: "اشترك بالنشرة البريدية",
      emailPlaceholder: "بريدك الإلكتروني",
      copyright: "© 2024 StyleLoom. جميع الحقوق محفوظة.",
      terms: "الشروط والأحكام",
      privacy: "سياسة الخصوصية",
    },
    legal: {
      termsTitle: "الشروط والأحكام",
      termsBody:
        "هذا المتجر مشروع تجريبي (portfolio project) لأغراض العرض فقط، وليس متجراً حقيقياً — لا توجد معاملات شراء أو بيانات فعلية يتم جمعها أو معالجتها.",
      privacyTitle: "سياسة الخصوصية",
      privacyBody:
        "لا يقوم هذا المشروع بجمع أو تخزين أي بيانات شخصية حقيقية على خوادم خارجية. البيانات (السلة، الطلبات، تسجيل الدخول) تُخزَّن محلياً في متصفحك فقط لأغراض العرض التجريبي.",
      backHome: "العودة للرئيسية",
    },
       catalog: {
      f1: { name: "فستان سهرة أنيق قصّة A-line", desc: "قصّة كلاسيكية بطول الكاحل تناسب المناسبات المسائية", fit: "بطول الكاحل" },
      f2: { name: "فستان ماكسي بطبعة زهور", desc: "قماش خفيف بقصّة ضيقة يعكس أجواء الربيع", fit: "قصة ضيقة" },
      f3: { name: "فستان سهرة راقٍ", desc: "تنورة انسيابية تمنحك إطلالة فاخرة", fit: "تنورة انسيابية" },
      f4: { name: "حقيبة يد عصرية", desc: "مساحة واسعة تكفي كل مقتنياتك اليومية", fit: "واسعة" },
      f5: { name: "قبعة شمسية أنيقة", desc: "مقاس واحد يناسب الجميع، مثالية للصيف", fit: "مقاس واحد يناسب الجميع" },
      f6: { name: "وشاح بوهيمي مطبّع", desc: "قطعة خفيفة تضيف لمسة أناقة لأي إطلالة", fit: "خفيفة الوزن" },
      f7: { name: "قميص أكسفورد كلاسيكي", desc: "قصّة عادية مريحة تناسب الاستخدام اليومي", fit: "قصة عادية" },
      f8: { name: "بليزر صوف مفصّل", desc: "قصّة مفصّلة بمظهر رسمي أنيق", fit: "قصة مفصّلة" },
      f9: { name: "بوت جلدي تشيلسي", desc: "مقاس مطابق للمقاسات القياسية، متانة عالية", fit: "مطابق للمقاس القياسي" },
      f10: { name: "محفظة جلدية بسيطة", desc: "تصميم مدمج وعملي لحمل يومي خفيف", fit: "مضغوطة" },
      f11: { name: "رومبير قطني مريح", desc: "قصّة واسعة مريحة للحركة الحرة", fit: "قصة مريحة" },
      f12: { name: "سويتر محبوك دافئ", desc: "قماش مطاطي يمنح راحة وتمدداً مثالياً", fit: "قماش مطاطي" },
      f13: { name: "حذاء رياضي للمغامرات", desc: "مقاس مطابق للمقاسات القياسية، مناسب للعب", fit: "مطابق للمقاس القياسي" },
      f14: { name: "حقيبة ظهر بطبعة قوس قزح", desc: "مقاس واحد يناسب الجميع، ألوان مبهجة", fit: "مقاس واحد يناسب الجميع" },
    },
    productDetails: {
      backToProducts: "العودة إلى المنتجات",
      shopNow: "تسوقي الآن",
      mrpNote: "السعر شامل جميع الضرائب",
      materialsHeading: "الخامات، العناية والمنشأ",
      joinLifeHeading: "قصة الأصل",
      joinLifeText:
        "تعود جذور هذه القطعة إلى الأثواب الإغريقية القديمة، وتطورت عبر قرون طويلة، وغالباً ما صُنعت من أقمشة فاخرة كالحرير والساتان والمخمل.",
      materialsSubheading: "الخامات",
      materialsText:
        "من طيات الأثواب الإغريقية إلى بريق الحرير، تحمل كل قطعة من هذه التشكيلة قروناً من الحرفية إلى رفاهية العصر الحديث.",
      featuresHeading: "المميزات",
      features: [
        "تفاصيل مصقولة تمنح إطلالة أنيقة",
        "إغلاق أمامي بأزرار معدنية منقوشة",
        "جيبان أماميان بغطاء مزرر",
        "جيبان جانبيان لمزيد من العملية",
        "أساور قابلة للتعديل لملاءمة شخصية",
        "شرائط خلفية عند الخصر لتخصيص القصة",
      ],
      sizesHeading: "المقاسات المتوفرة",
      ratingsHeading: "التقييمات والآراء",
      ratingsLabel: "تقييم",
      notFoundTitle: "لم يتم العثور على هذا المنتج",
      notFoundHint: "ربما تمت إزالته أو أن الرابط غير صحيح",
    },
            dashboard: {
          title: "لوحة تحكم الأدمن",
          subtitle: "إدارة كتالوج المنتجات — إضافة منتجات جديدة أو حذف الموجودة",

          addProductHeading: "إضافة منتج جديد",
          editProductHeading: "تعديل المنتج",

          name: "اسم المنتج",
          nameEnglish: "اسم المنتج بالإنجليزية",
          nameArabic: "اسم المنتج بالعربية",

          description: "الوصف",
          descriptionEnglish: "الوصف بالإنجليزية",
          descriptionArabic: "الوصف بالعربية",

          price: "السعر",
          category: "الفئة",
          audience: "الجمهور",

          fit: "المقاس / القصة",
          fitEnglish: "المقاس / القصة بالإنجليزية",
          fitArabic: "المقاس / القصة بالعربية",

          stock: "الكمية بالمخزون",
          rating: "التقييم (٠-٥)",
          image: "مسار الصورة",

          imageHint:
            "مثال: /products/fashion/new-item.jpg — ضع الملف الحقيقي بهذا المسار داخل public",

          submit: "إضافة المنتج",
          alert: "تمت إضافة المنتج بنجاح",
          saveChanges: "حفظ التعديلات",
          cancel: "إلغاء",

          existingHeading: "المنتجات الحالية",
          edit: "تعديل",
          delete: "حذف",
          deleteConfirm: "هل أنت متأكد من حذف هذا المنتج؟",
          deleteTitle: "تأكيد حذف المنتج",
          deleteConfirmAction: "نعم، احذف المنتج",
          addSuccessTitle: "تمت الإضافة بنجاح",
          addSuccessMessage: "تمت إضافة المنتج بنجاح وسيظهر في الصفحة...",
          close: "حسنًا",
        },
     faq: {
      title: "الأسئلة الشائعة",
      subtitle: "كل شي حابة تعرفيه عن الطلب والتوصيل والإرجاع",
      items: [
        {
          question: "كيف بقدر أتابع حالة طلبي؟",
          answer:
            "من صفحة \"طلباتي\" بتلاقي كل طلباتك السابقة مع حالة كل طلب (قيد المعالجة، تم الشحن، تم التوصيل).",
        },
        {
          question: "شو سياسة الإرجاع؟",
          answer:
            "بيمكن إرجاع أي قطعة خلال 14 يوم من تاريخ الاستلام، بشرط تكون بحالتها الأصلية وبالتغليف الأصلي.",
        },
        {
          question: "قديش بتاخد مدة التوصيل؟",
          answer: "التوصيل عادةً بياخد من 3 إلى 7 أيام عمل حسب موقعك.",
        },
        {
          question: "كيف بختار المقاس الصح؟",
          answer:
            "كل منتج عنده معلومة \"Fit\" بصفحة تفاصيله (متل Slim Fit أو Ankle-length) بتساعدك تحددي القصة المناسبة إلك.",
        },
        {
          question: "شو طرق الدفع المتوفرة؟",
          answer: "بطاقات الائتمان الرئيسية، وأيضاً الدفع عند الاستلام بمعظم المناطق.",
        },
        {
          question: "بقدر عدّل أو ألغي طلبي بعد ما أأكده؟",
          answer:
            "طالما الطلب لسا بحالة \"قيد المعالجة\"، تواصلي معنا بأسرع وقت وبنساعدك تعدّليه أو تلغيه.",
        },
      ],
    },
  },
  en: {
    dir: "ltr",
    nav: {
      brand: "Style.LOOM",
      products: "Home",
      cart: "",
      orders: "My Orders",
      dashboard: "Dashboard",
      login: "Login",
      register: "Register",
      logout: "Log out",
      hello: "Hi",
    },
    hero: {
      title: "Elevate Your Style with StyleLoom",
      subtitle: "Explore a world of fashion at StyleLoom, where trends meet affordability. Immerse yourself in the latest styles and seize exclusive promotions.",
      shopNow: "Shop Now",
      tabs: ["All", "Mens", "Womens", "Kids"],
      stats: {
        products: "Fashion Products",
        arrivals: "New arrivals every month",
        off: "OFF on select items",
        satisfaction: "Customer Satisfaction Rate",
      },
    },
    products: {
      title: "Elevate Your Style With Our Latest Collection",
      subtitle: "Each piece is crafted to enhance your fashion statement.",
      addToCart: "Add To Cart ↗",
      added: "Added ",
      outOfStock: "Out of stock",
      inStock: "In stock",
      price: "Price",
      page: "Page",
      of: "of",
      next: "Next",
      prev: "Previous",
      categories: {
        womenswear: "Womenswear",
        menswear: "Menswear",
        kidswear: "Kidswear",
        accessories: "Accessories",
      },
      audiences: {
        all: "All",
        mens: "Mens",
        womens: "Womens",
        kids: "Kids",
      },
      fit: "Fit",
    },
    cart: {
      title: "Shopping Cart",
      empty: "Your cart is empty",
      emptyHint: "Browse the products and add what you like",
      browse: "Browse products",
      quantity: "Qty",
      remove: "Remove",
      subtotal: "Subtotal",
      total: "Total",
      checkout: "Checkout",
      checkoutSuccess: "Order placed successfully (demo)",
      adminNotice: "Admin accounts don't shop — use the dashboard to manage products",
      clearCart: "Clear cart",
      clearCartTitle: "Clear your cart?",
      clearCartConfirm: "This will remove all items from your cart. This action can't be undone.",
      clearCartConfirmAction: "Yes, clear cart",
      cancel: "Cancel",
    },
    orders: {
      title: "My Past Orders",
      allOrdersTitle: "All Orders",
      customer: "Customer",
      empty: "No past orders yet",
      orderNumber: "Order",
      status: "Status",
      date: "Date",
      total: "Total",
      statuses: {
        processing: "Processing",
        shipped: "Shipped",
        delivered: "Delivered",
        cancelled: "Cancelled",
      },
      protectedMessage: "This page is only available to logged-in users",
      goLogin: "Go to login",
    },
    auth: {
      loginTitle: "Login",
      registerTitle: "Create a new account",
      name: "Full name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm password",
      loginButton: "Log in",
      registerButton: "Create account",
      noAccount: "Don't have an account?",
      haveAccount: "Already have an account?",
      goRegister: "Create one",
      goLogin: "Log in",
      demoHint: "Demo accounts: admin@demo.com / admin123 or sara@demo.com / user123",
      errors: {
        invalidCredentials: "Invalid email or password",
        emailRequired: "Email is required",
        passwordRequired: "Password is required",
        nameRequired: "Name is required",
        emailInvalid: "Invalid email format",
        passwordShort: "Password must be at least 6 characters",
        passwordMismatch: "Passwords do not match",
        emailTaken: "This email is already registered",
      },
      registerSuccess: "Account created successfully! You can log in now",
    },
    common: {
      currency: "$",
      loading: "Loading...",
      themeToggle: "Toggle theme",
      languageToggle: "العربية",
      menuToggle: "Open menu",
      notAuthorized: "This page isn't available for your account",
    },
    copy : {
    title: "Elevate Your Wardrobe",
    subtitle:
    "Don't miss out — experience the epitome of fashion by clicking 'Buy Now' and embrace a world of chic elegance delivered to your doorstep. Your style journey begins here.",
    cta: "Shop Now",
     },
    trends: {
      title: "Crafting Trends, Inspiring Confidence",
      subtitle: "Explore a world of fashion at StyleLoom, where trends meet affordability.",
      items: [
        {
          title: "Passionate Craftsmanship",
          desc: "Every garment at StyleLoom is crafted with passion, reflecting our commitment to quality and innovation.",
        },
        {
          title: "Fashion Forward",
          desc: "We're more than a brand; we're trendsetters, curating styles that empower and inspire confidence.",
        },
        {
          title: "Customer-Centric Approach",
          desc: "At StyleLoom, our customers are at the heart of everything we do. Your satisfaction is our measure of success.",
        },
        {
          title: "Global Inspiration",
          desc: "Influenced by global trends, we bring you a diverse and dynamic collection, embodying the spirit of fashion from around the world.",
        },
        {
          title: "Empowering Your Style",
          desc: "Beyond clothing, StyleLoom is a lifestyle. Join us on a journey of self-expression and empowerment through fashion.",
        },
        {
          title: "Sustainable Practices",
          desc: "StyleLoom is committed to sustainability, integrating eco-friendly practices into our production process.",
        },
      ],
    },
    journey: {
      title: "Navigating the StyleLoom Fashion Journey.",
      subtitle: "At StyleLoom, we've designed a straightforward shopping experience to make fashion accessible.",
      steps: [
        {
          step: "Step 01",
          title: "Discover Trends",
          desc: "Explore our curated collection of over 1000 styles, spanning global fashion trends.",
        },
        {
          step: "Step 02",
          title: "Effortless Navigation",
          desc: "Intuitive filters and categories help you find the perfect pieces tailored to your style.",
        },
        {
          step: "Step 03",
          title: "Secure Checkout",
          desc: "Multiple payment options and encrypted transactions ensure a safe and hassle-free purchase.",
        },
        {
          step: "Step 04",
          title: "Unbox Happiness",
          desc: "Unbox a fashion-forward experience delivered right to your door, ready to elevate your style.",
        },
      ],
    },
    testimonials: {
      title: "The StyleLoom Testimonial Collection.",
      subtitle: "At StyleLoom, our customers are the heartbeat of our brand.",
      items: [
        {
          name: "Sarah Thompson",
          location: "New York, USA",
          rating: 5,
          quote: "StyleLoom exceeded my expectations. The gown's quality and design made me feel like a queen. Fast shipping, too!",
        },
        {
          name: "Rajesh Patel",
          location: "Mumbai, India",
          rating: 5,
          quote: "Absolutely love the style and warmth of the jacket. A perfect blend of fashion and functionality!",
        },
        {
          name: "Emily Walker",
          location: "London, UK",
          rating: 4,
          quote: "Adorable and comfortable! My daughter loves her new outfit. Thank you, StyleLoom, for dressing our little fashionista.",
        },
        {
          name: "Alejandro Martinez",
          location: "Barcelona, Spain",
          rating: 5,
          quote: "Impressed by the quality and style. These shoes turned heads at every event. StyleLoom, you've gained a loyal customer!",
        },
        {
          name: "Priya Sharma",
          location: "Delhi, India",
          rating: 5,
          quote: "Perfect fit and exceptional quality. These jeans have become my go-to for casual and chic outings.",
        },
        {
          name: "Maria Rodriguez",
          location: "Mexico City, Mexico",
          rating: 5,
          quote: "Stylish sneakers that don't compromise on comfort. StyleLoom knows how to balance fashion and functionality.",
        },
      ],
    },
    footer: {
      tickerItems: [
        "Tank Top",
        "T-Shirt",
        "Long-Sleeve T-Shirt",
        "Raglan Sleeve Shirt",
        "Crop Top",
        "V-Neck Shirt",
        "Muscle Shirt",
      ],
      homeHeading: "Home",
      homeLinks: ["Why Us", "About Us", "Testimonials", "FAQ's"],
      productsHeading: "Products",
      productsLinks: ["Menswear", "Womenswear", "Kidswear"],
      newsletterHeading: "Subscribe to Newsletter",
      emailPlaceholder: "Your Email",
      copyright: "© 2024 StyleLoom. All rights reserved.",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
    },
    legal: {
      termsTitle: "Terms & Conditions",
      termsBody:
        "This store is a portfolio demo project for showcase purposes only — it isn't a real store, and no real purchases or data processing take place here.",
      privacyTitle: "Privacy Policy",
      privacyBody:
        "This project doesn't collect or store any real personal data on external servers. Data (cart, orders, login) is kept only in your browser's local storage for demo purposes.",
      backHome: "Back to home",
    },
    catalog: {
      f1: { name: "Timeless A-line Evening Dress", desc: "Classic ankle-length cut for evening occasions", fit: "Ankle-length" },
      f2: { name: "Floral Bloom Maxi Dress", desc: "Lightweight fabric with a slim fit, perfect for spring", fit: "Slim Fit" },
      f3: { name: "Elegant Evening Gown", desc: "A flowing skirt for a refined, elevated look", fit: "Flowing skirt" },
      f4: { name: "Urban Chic Handbag", desc: "Spacious enough for all your daily essentials", fit: "Spacious" },
      f5: { name: "Sophisticate Sun Hat", desc: "One size fits all, ideal for summer days", fit: "One size fits all" },
      f6: { name: "Boho Chic Printed Scarf", desc: "A lightweight piece that elevates any outfit", fit: "Lightweight" },
      f7: { name: "Classic Oxford Shirt", desc: "Regular fit, comfortable for everyday wear", fit: "Regular Fit" },
      f8: { name: "Tailored Wool Blazer", desc: "A tailored fit with a sharp, formal look", fit: "Tailored Fit" },
      f9: { name: "Leather Chelsea Boots", desc: "True to size, built for durability", fit: "True to size" },
      f10: { name: "Minimalist Leather Wallet", desc: "A compact, practical design for daily carry", fit: "Compact" },
      f11: { name: "Playful Cotton Romper", desc: "Relaxed fit for free, easy movement", fit: "Relaxed Fit" },
      f12: { name: "Cozy Knit Sweater", desc: "Stretch fabric for a perfect, comfy fit", fit: "Stretch Fit" },
      f13: { name: "Adventure Sneakers", desc: "True to size, ready for active play", fit: "True to size" },
      f14: { name: "Rainbow Print Backpack", desc: "One size fits all, in cheerful colors", fit: "One size fits all" },
    },
    productDetails: {
      backToProducts: "Back to Products",
      shopNow: "Shop Now",
      mrpNote: "MRP incl. of all taxes",
      materialsHeading: "Materials, Care and origin",
      joinLifeHeading: "Join Life",
      joinLifeText:
        "Tracing its roots back to ancient Greek draped garments, this piece has evolved through centuries, often crafted from luxurious fabrics like silks, satin, and velvets.",
      materialsSubheading: "Materials",
      materialsText:
        "Flowing from Grecian folds to glittering silks, every piece in this collection carries centuries of craftsmanship into modern luxury.",
      featuresHeading: "Features",
      features: [
        "Distressed detailing for a refined look",
        "Button-up front closure with engraved metal buttons",
        "Two chest pockets with buttoned flaps",
        "Two side pockets for added functionality",
        "Adjustable buttoned cuffs for a personalized fit",
        "Back waist tabs for customizable styling",
      ],
      sizesHeading: "Available Sizes",
      ratingsHeading: "Ratings & Review",
      ratingsLabel: "Ratings",
      notFoundTitle: "We couldn't find that product",
      notFoundHint: "It may have been removed, or the link is incorrect",
    },
     faq: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you'd want to know about ordering, shipping, and returns",
      items: [
        {
          question: "How can I track my order?",
          answer:
            "Head to the \"My Orders\" page — you'll find every past order there along with its current status (processing, shipped, delivered).",
        },
        {
          question: "What's the return policy?",
          answer: "Items can be returned within 14 days of delivery, as long as they're in their original condition and packaging.",
        },
        {
          question: "How long does shipping take?",
          answer: "Delivery usually takes 3 to 7 business days depending on your location.",
        },
        {
          question: "How do I pick the right size?",
          answer:
            "Every product's details page shows a \"Fit\" note (like Slim Fit or Ankle-length) to help you pick the right cut for you.",
        },
        {
          question: "What payment methods do you accept?",
          answer: "Major credit cards, plus cash on delivery in most areas.",
        },
        {
          question: "Can I change or cancel my order after placing it?",
          answer:
            "As long as the order is still \"processing\", reach out to us as soon as possible and we'll help you update or cancel it.",
        },
      ],
    },
    dashboard: {
  title: "Admin Dashboard",
  subtitle:
    "Manage the product catalogue — add new products or remove existing ones",

  addProductHeading: "Add a new product",
  editProductHeading: "Edit product",

  name: "Product name",
  nameEnglish: "Product name (English)",
  nameArabic: "Product name (Arabic)",

  description: "Description",
  descriptionEnglish: "Description (English)",
  descriptionArabic: "Description (Arabic)",

  price: "Price",
  category: "Category",
  audience: "Audience",

  fit: "Fit",
  fitEnglish: "Fit (English)",
  fitArabic: "Fit (Arabic)",

  stock: "Stock quantity",
  rating: "Rating (0-5)",
  image: "Image path",

  imageHint:
    "e.g. /products/fashion/new-item.jpg — place the actual file at this path inside public",

  submit: "Add product",
  alert: "Product added successfully",
  saveChanges: "Save changes",
  cancel: "Cancel",

  existingHeading: "Current products",
  edit: "Edit",
  delete: "Delete",
  deleteConfirm: "Are you sure you want to delete this product?",
  deleteTitle: "Delete this product?",
  deleteConfirmAction: "Yes, delete it",
  addSuccessTitle: "Added successfully",
  addSuccessMessage: "The product was added to the catalogue and is now live on the site.",
  close: "Got it",
},
  },
};
