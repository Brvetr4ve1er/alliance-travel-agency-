
"use client";

import { FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function DocumentsRequired() {
  const { t, language } = useLanguage();

  const docs = language === 'ar' ? [
    { title: "جواز السفر", desc: "صالح لمدة 6 أشهر على الأقل بعد تاريخ العودة." },
    { title: "الصور", desc: "صورتان شخصيتان حديثتان بخلفية بيضاء." },
    { title: "رسوم التأشيرة", desc: "25 دولاراً نقداً للطابع في المطار." },
    { title: "المستندات الداعمة", desc: "نسخة من بطاقة التعريف الوطنية." },
  ] : [
    { title: "Passeport", desc: "Valide au moins 6 mois après la date de retour." },
    { title: "Photos", desc: "2 photos d'identité récentes fond blanc." },
    { title: "Visa Fee", desc: "25 USD en espèces pour le timbre à l'aéroport." },
    { title: "Justificatifs", desc: "Copie de la carte d'identité nationale." },
  ];

  return (
    <div className="glass-panel p-8 rounded-2xl border-gold/10 h-full">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center">
          <FileText className="h-6 w-6 text-gold" />
        </div>
        <h2 className="text-3xl font-headline">{t('docs_title')}</h2>
      </div>
      
      <div className="space-y-6">
        {docs.map((doc, i) => (
          <div key={i} className="flex gap-4">
            <CheckCircle2 className="h-5 w-5 text-gold flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-foreground">{doc.title}</h4>
              <p className="text-sm text-muted-foreground">{doc.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg flex gap-3">
        <AlertCircle className="h-5 w-5 text-gold flex-shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong>{language === 'ar' ? 'ملاحظة :' : 'Note :'}</strong> {t('docs_note')}
        </p>
      </div>
    </div>
  );
}
