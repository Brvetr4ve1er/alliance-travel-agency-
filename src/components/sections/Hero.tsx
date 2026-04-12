
"use client";

import { Badge } from "@/components/ui/badge";
import { Plane, Calendar, ShieldCheck, MapPin } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const HERO_INFO_DATA = [
  { icon: Calendar, key: 'info_duree_val' },
  { icon: ShieldCheck, key: 'info_pension_val' },
  { icon: Plane, key: 'info_vols_val' },
  { icon: MapPin, key: 'info_visa_val' },
];

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative pt-32 pb-20 px-6 flex flex-col items-center text-center overflow-hidden">
      <div className="animate-fade-up opacity-0 delay-100 flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs tracking-[0.2em] uppercase font-medium mb-8">
        <span className="text-base">🇪🇬</span> {t('hero_badge')}
      </div>
      
      <h1 
        className="animate-fade-up opacity-0 delay-200 text-5xl md:text-8xl font-headline font-light leading-[1.1] mb-6 max-w-4xl"
        dangerouslySetInnerHTML={{ __html: t('hero_title') }}
      />
      
      <p className="animate-fade-up opacity-0 delay-300 text-muted-foreground text-lg md:text-xl max-w-2xl font-light mb-10 leading-relaxed">
        {t('hero_desc')}
      </p>
      
      <div className="animate-fade-up opacity-0 delay-400 flex flex-wrap justify-center gap-3 mb-12">
        {HERO_INFO_DATA.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-foreground/80">
            <item.icon className="h-4 w-4 text-primary" />
            {t(item.key as any)}
          </div>
        ))}
      </div>

      <div className="animate-fade-up opacity-0 delay-500 text-2xl md:text-3xl font-headline text-primary">
        {t('hero_price_label')} <span className="font-bold text-4xl md:text-5xl mx-2">{t('hero_price_value')}</span>
      </div>
    </section>
  );
}
