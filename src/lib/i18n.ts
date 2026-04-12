
export type Language = 'fr' | 'ar';

export const translations = {
  fr: {
    // Navbar
    nav_programme: "Programme",
    nav_hotels: "Hôtels",
    nav_vols: "Vols",
    nav_reserver: "Réserver",
    
    // Hero
    hero_badge: "Égypte 2026 · Caire & Sharm El Sheikh",
    hero_title: "Les <em class='italic text-primary'>Pyramides</em> & <br /> la Mer Rouge",
    hero_desc: "Sept nuits inoubliables — entre les merveilles du Caire antique et les eaux cristallines de Sharm El Sheikh. Vol Egyptair, hôtels All Inclusive, excursions incluses.",
    hero_price_label: "À partir de",
    hero_price_value: "180 000 DA",
    
    // Quick Info
    info_duree: "Durée",
    info_duree_val: "8 Jours / 7 Nuits",
    info_hotels: "Hôtels",
    info_hotels_val: "4★ à 5★ Luxe",
    info_vols: "Vols",
    info_vols_val: "Egyptair Inclus",
    info_visa: "Visa",
    info_visa_val: "Support Inclus",
    info_pension: "Pension",
    info_pension_val: "All Inclusive Soft",
    
    // Experience
    exp_title: "L'Expérience Alliance Travel",
    exp_desc: "Plus qu'un simple voyage, nous vous offrons une immersion sensorielle au cœur de l'histoire, sublimée par un confort moderne.",
    exp_h1: "Éternité de Gizeh",
    exp_h1_desc: "Contemplez les Pyramides et le Sphinx, ultimes témoins des merveilles antiques.",
    exp_h2: "Pureté de la Mer Rouge",
    exp_h2_desc: "Plongez dans les eaux cristallines de Sharm El Sheikh pour un repos absolu.",
    exp_h3: "Magie du Nil",
    exp_h3_desc: "Vivez une soirée d'exception lors d'un dîner-croisière sur le fleuve légendaire.",
    exp_h4: "Contrastes Égyptiens",
    exp_h4_desc: "De l'effervescence des bazars du Caire à la sérénité des récifs coralliens.",
    
    // Hotels
    hotels_section_title: "Confort & Prestige",
    hotels_section_desc: "Une sélection rigoureuse d'établissements d'excellence pour un séjour sans compromis.",
    hotels_note: "Les tarifs indiqués sont par personne en chambre double. Formule All Inclusive Soft à Sharm El Sheikh. Petit déjeuner au Caire.",
    hotels_premium_badge: "Prestige",
    hotels_price_sub: "Double / Pers.",
    hotels_child_price: "1er Enfant : 115 000 DA",
    hotels_cairo_title: "Hébergement au Caire inclus",
    hotels_cairo_desc: "Le séjour comprend également 2 nuits au Marwa Palace Hotel (4★) en formule petit déjeuner.",
    
    // Itinerary
    itin_title: "Votre Itinéraire",
    itin_sharm: "Sharm El Sheikh — 5 nuits",
    itin_cairo: "Le Caire — 2 nuits",
    
    // Pricing
    price_title: "Investissez dans vos Souvenirs",
    price_subtitle: "Une tarification transparente pour une sérénité totale.",
    price_in_title: "Inclus dans votre forfait",
    price_out_title: "Non inclus",
    price_exclusive: "Offre exclusive 2026",
    price_cta: "Réserver mon siège",
    price_limited: "Disponibilité limitée · 4 dates seulement",
    
    // Documents
    docs_title: "Documents Requis",
    docs_note: "L'agence Alliance Travel fournit la lettre de garantie indispensable à l'obtention de votre visa à l'arrivée.",
    
    // Trust
    trust_title: "Pourquoi nous choisir ?",
    trust_p1_title: "Sérénité Totale",
    trust_p1_desc: "Plus de 10 ans d'expertise sur la destination Égypte.",
    trust_p2_title: "Qualité Garantie",
    trust_p2_desc: "Hôtels sélectionnés et testés par nos équipes.",
    trust_p3_title: "Prise en Charge",
    trust_p3_desc: "Accompagnateur dédié d'Alger au retour.",
    trust_quote: "\"Un voyage exceptionnel. L'organisation d'Alliance Travel était impeccable, du visa à l'arrivée jusqu'au retour à Alger.\"",
    trust_author: "Famille Mansouri, Voyage 2024",
    
    // Form
    form_help_title: "Besoin d'aide ?",
    form_help_desc: "Notre IA est disponible 24/7 pour répondre à toutes vos questions techniques sur le séjour.",
    form_section_title: "Commencez Votre Voyage",
    form_section_desc: "Remplissez le formulaire ci-dessous pour recevoir votre devis personnalisé.",
    form_name: "Nom Complet",
    form_phone: "Téléphone (WhatsApp)",
    form_date: "Date Souhaitée",
    form_v_count: "Nombre de Voyageurs",
    form_message: "Message ou Questions",
    form_cta: "Vérifier la disponibilité",
    form_toast_title: "Demande envoyée !",
    form_toast_desc: "Un conseiller Alliance Travel vous contactera sous 24h.",
    
    // Final CTA
    final_title: "Prêt pour l'évasion ?",
    final_desc: "Les places pour les départs d'avril sont déjà réservées à 70%. Sécurisez votre voyage dès aujourd'hui.",
    final_cta_primary: "Réserver Maintenant",
    final_cta_secondary: "Appeler un conseiller",
    
    // Assistant
    ai_title: "Assistant Voyage IA",
    ai_welcome: "Bonjour ! Je suis votre assistant Alliance Travel. Posez-moi vos questions sur notre voyage en Égypte 2026.",
    ai_placeholder: "Posez votre question...",
    ai_error: "Désolé, j'ai rencontré une erreur. Veuillez réessayer.",
    
    // Footer
    footer_copy: "© 2026 Alliance Travel — Licence d'État A. Tous droits réservés.",
    footer_slogan: "L'expertise au service de vos émotions.",
    whatsapp_cta: "Réserver via WhatsApp"
  },
  ar: {
    // Navbar
    nav_programme: "البرنامج",
    nav_hotels: "الفنادق",
    nav_vols: "الرحلات",
    nav_reserver: "احجز الآن",
    
    // Hero
    hero_badge: "مصر 2026 · القاهرة وشرم الشيخ",
    hero_title: "الأهرامات <em class='italic text-primary'>والبحر</em> <br /> الأحمر",
    hero_desc: "سبع ليالٍ لا تُنسى — بين عجائب القاهرة القديمة ومياه شرم الشيخ الكريستالية. طيران مصر للطيران، فنادق شاملة كلياً، ورحلات متضمنة.",
    hero_price_label: "ابتداءً من",
    hero_price_value: "180,000 دج",
    
    // Quick Info
    info_duree: "المدة",
    info_duree_val: "8 أيام / 7 ليالٍ",
    info_hotels: "الفنادق",
    info_hotels_val: "4★ إلى 5★ فاخرة",
    info_vols: "الرحلات",
    info_vols_val: "مصر للطيران مشمولة",
    info_visa: "التأشيرة",
    info_visa_val: "الدعم مشمول",
    info_pension: "الإقامة",
    info_pension_val: "إقامة شاملة (سوفت)",
    
    // Experience
    exp_title: "تجربة أليانس ترافل",
    exp_desc: "أكثر من مجرد رحلة، نحن نقدم لك انغماساً حسياً في قلب التاريخ، معززاً بالراحة العصرية.",
    exp_h1: "خلود الجيزة",
    exp_h1_desc: "تأمل الأهرامات وأبو الهول، الشهود النهائيين على عجائب العالم القديم.",
    exp_h2: "نقاء البحر الأحمر",
    exp_h2_desc: "اغطس في مياه شرم الشيخ الكريستالية للاسترخاء التام.",
    exp_h3: "سحر النيل",
    exp_h3_desc: "عِش أمسية استثنائية خلال عشاء في رحلة نيلية على النهر الأسطوري.",
    exp_h4: "التناقضات المصرية",
    exp_h4_desc: "من صخب أسواق القاهرة إلى هدوء الشعاب المرجانية.",
    
    // Hotels
    hotels_section_title: "الراحة والفخامة",
    hotels_section_desc: "اختيار دقيق للمنشآت المتميزة لإقامة بلا تنازلات.",
    hotels_note: "الأسعار المذكورة للفرد في غرفة مزدوجة. إقامة شاملة (سوفت) في شرم الشيخ. إفطار في القاهرة.",
    hotels_premium_badge: "فخامة",
    hotels_price_sub: "مزدوجة / للفرد",
    hotels_child_price: "الطفل الأول: 115,000 دج",
    hotels_cairo_title: "الإقامة في القاهرة مشمولة",
    hotels_cairo_desc: "تشمل الرحلة أيضاً ليلتين في فندق مروة بالاس (4★) مع وجبة الإفطار.",
    
    // Itinerary
    itin_title: "مسار رحلتك",
    itin_sharm: "شرم الشيخ — 5 ليالٍ",
    itin_cairo: "القاهرة — ليلتان",
    
    // Pricing
    price_title: "استثمر في ذكرياتك",
    price_subtitle: "تسعير شفاف لراحة بال تامة.",
    price_in_title: "مشمول في باقتك",
    price_out_title: "غير مشمول",
    price_exclusive: "عرض حصري 2026",
    price_cta: "احجز مقعدك",
    price_limited: "التوفر محدود · 4 مواعيد فقط",
    
    // Documents
    docs_title: "الوثائق المطلوبة",
    docs_note: "توفر وكالة أليانس ترافل خطاب الضمان الضروري للحصول على التأشيرة عند الوصول.",
    
    // Trust
    trust_title: "لماذا تختارنا ؟",
    trust_p1_title: "راحة بال تامة",
    trust_p1_desc: "أكثر من 10 سنوات من الخبرة في الوجهة المصرية.",
    trust_p2_title: "جودة مضمونة",
    trust_p2_desc: "فنادق مختارة ومختبرة من قبل فرقنا.",
    trust_p3_title: "رعاية كاملة",
    trust_p3_desc: "مرافق مخصص من الجزائر حتى العودة.",
    trust_quote: "\"رحلة استثنائية. كان تنظيم أليانس ترافل مثالياً، من التأشيرة عند الوصول حتى العودة إلى الجزائر.\"",
    trust_author: "عائلة منصوري، رحلة 2024",
    
    // Form
    form_help_title: "تحتاج لمساعدة ؟",
    form_help_desc: "ذكاؤنا الاصطناعي متاح 24/7 للإجابة على جميع أسئلتك التقنية حول الرحلة.",
    form_section_title: "ابدأ رحلتك",
    form_section_desc: "املأ النموذج أدناه لتلقي عرضك المخصص.",
    form_name: "الاسم الكامل",
    form_phone: "الهاتف (واتساب)",
    form_date: "التاريخ المفضل",
    form_v_count: "عدد المسافرين",
    form_message: "رسالة أو أسئلة",
    form_cta: "تحقق من التوفر",
    form_toast_title: "تم إرسال الطلب !",
    form_toast_desc: "سيتواصل معك مستشار أليانس ترافل في غضون 24 ساعة.",
    
    // Final CTA
    final_title: "جاهز للانطلاق ؟",
    final_desc: "تم حجز 70% من الأماكن لرحلات أفريل. أمن رحلتك اليوم.",
    final_cta_primary: "احجز الآن",
    final_cta_secondary: "اتصل بمستشار",
    
    // Assistant
    ai_title: "مساعد السفر الذكي",
    ai_welcome: "مرحباً ! أنا مساعدك من أليانس ترافل. اسألني عن رحلتنا إلى مصر 2026.",
    ai_placeholder: "اسأل سؤالك هنا...",
    ai_error: "عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.",
    
    // Footer
    footer_copy: "© 2026 أليانس ترافل — رخصة الدولة أ. جميع الحقوق محفوظة.",
    footer_slogan: "الخبرة في خدمة مشاعرك.",
    whatsapp_cta: "احجز عبر واتساب"
  }
};

export type TranslationKey = keyof typeof translations.fr;
