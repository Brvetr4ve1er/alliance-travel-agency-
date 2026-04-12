
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plane, Calendar, ShieldCheck, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const HERO_INFO_DATA = [
  { icon: Calendar, key: 'info_duree_val' },
  { icon: ShieldCheck, key: 'info_pension_val' },
  { icon: Plane, key: 'info_vols_val' },
  { icon: MapPin, key: 'info_visa_val' },
];

export function Hero() {
  const { t, isRtl } = useLanguage();

  return (
    <section className="relative pt-32 pb-20 px-6 flex flex-col items-center text-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 blur-[120px] rounded-full pointer-events-none opacity-50 z-0" />

      <div className="relative z-10 animate-fade-up opacity-0 delay-100 flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-[10px] md:text-xs tracking-[0.2em] uppercase font-medium mb-8">
        <Sparkles className="h-3 w-3" /> {t('hero_badge')}
      </div>
      
      <h1 
        className="relative z-10 animate-fade-up opacity-0 delay-200 text-5xl md:text-8xl font-headline font-light leading-[1.1] mb-6 max-w-4xl"
        dangerouslySetInnerHTML={{ __html: t('hero_title') }}
      />
      
      <p className="relative z-10 animate-fade-up opacity-0 delay-300 text-muted-foreground text-lg md:text-xl max-w-2xl font-light mb-10 leading-relaxed px-4">
        {t('hero_desc')}
      </p>

      {/* Primary CTAs for direct funnel traffic */}
      <div className="relative z-10 animate-fade-up opacity-0 delay-400 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full max-w-lg px-6">
        <Button size="lg" className="bg-gold hover:bg-gold/90 text-gold-foreground h-14 px-8 text-lg font-bold w-full sm:w-auto shadow-xl" asChild>
          <a href="#reservation">
            {t('hero_cta_primary')}
            <ArrowRight className={isRtl ? "ms-2 h-5 w-5 rotate-180" : "ms-2 h-5 w-5"} />
          </a>
        </Button>
        <Button size="lg" variant="outline" className="border-gold/30 text-gold hover:bg-gold/5 h-14 px-8 text-lg w-full sm:w-auto" asChild>
          <a href="#expert-ia">
            {t('hero_cta_secondary')}
          </a>
        </Button>
      </div>
      
      <div className="relative z-10 animate-fade-up opacity-0 delay-500 flex flex-wrap justify-center gap-3 mb-12">
        {HERO_INFO_DATA.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] md:text-sm font-medium text-foreground/80">
            <item.icon className="h-3 w-3 md:h-4 md:w-4 text-primary" />
            {t(item.key as any)}
          </div>
        ))}
      </div>

      <div className="relative z-10 animate-fade-up opacity-0 delay-[600ms] text-2xl md:text-3xl font-headline text-primary bg-primary/5 px-6 py-2 rounded-full border border-primary/20">
        {t('hero_price_label')} <span className="font-bold text-4xl md:text-5xl mx-2">{t('hero_price_value')}</span>
      </div>
    </section>
  );
}
