
"use client";

import { Clock, Star, Plane, ShieldCheck, Coffee } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function QuickInfoBar() {
  const { t } = useLanguage();

  const info = [
    { icon: Clock, label: t('info_duree'), value: t('info_duree_val') },
    { icon: Star, label: t('info_hotels'), value: t('info_hotels_val') },
    { icon: Plane, label: t('info_vols'), value: t('info_vols_val') },
    { icon: ShieldCheck, label: t('info_visa'), value: t('info_visa_val') },
    { icon: Coffee, label: t('info_pension'), value: t('info_pension_val') },
  ];

  return (
    <section className="relative z-20 -mt-10 max-w-6xl mx-auto px-6">
      <div className="glass-panel rounded-2xl border-gold/20 flex flex-wrap items-center justify-between p-6 md:p-8 gap-8 md:gap-4">
        {info.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 flex-1 min-w-[140px] justify-center md:justify-start">
            <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
              <item.icon className="h-5 w-5 text-gold" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{item.label}</p>
              <p className="text-sm font-bold text-foreground">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
