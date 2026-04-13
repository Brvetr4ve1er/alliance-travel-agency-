"use client";

import React, { memo } from "react";
import { Check, X, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { TRIP_CONFIG } from "@/lib/trip-config";

export const Pricing = memo(() => {
  const { t } = useLanguage();
  return (
    <section id="pricing" className="space-y-12">
      <div className="text-center"><h2 className="text-4xl md:text-5xl font-headline mb-4">{t('price_title')}</h2><p className="text-muted-foreground">{t('price_subtitle')}</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel p-8 md:p-12 rounded-2xl border-gold/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-headline text-gold mb-6 flex items-center gap-2"><Check className="h-5 w-5" /> {t('price_in_title')}</h3>
              <ul className="space-y-4 text-sm">{TRIP_CONFIG.inclusions.map((item, i) => (<li key={i} className="flex items-start gap-3"><Check className="h-4 w-4 text-emerald-400 mt-0.5" /><span>{item}</span></li>))}</ul>
            </div>
            <div>
              <h3 className="text-2xl font-headline text-muted-foreground mb-6 flex items-center gap-2"><X className="h-5 w-5" /> {t('price_out_title')}</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">{TRIP_CONFIG.exclusions.map((item, i) => (<li key={i} className="flex items-start gap-3"><X className="h-4 w-4 text-red-400 mt-0.5" /><span>{item}</span></li>))}</ul>
            </div>
          </div>
        </div>
        <div className="bg-gold text-gold-foreground p-8 md:p-12 rounded-2xl flex flex-col justify-center text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><CreditCard className="h-32 w-32 -rotate-12" /></div>
          <p className="text-sm uppercase tracking-widest font-bold mb-4 opacity-80">{t('price_exclusive')}</p>
          <p className="text-lg mb-2">{t('hero_price_label')}</p>
          <h4 className="text-5xl md:text-6xl font-headline font-bold mb-8">{TRIP_CONFIG.basePrice}</h4>
          <Button size="lg" variant="secondary" className="w-full text-lg h-14" asChild><a href="#reservation">{t('price_cta')}</a></Button>
          <p className="mt-6 text-[10px] uppercase tracking-tighter opacity-70">{t('price_limited')}</p>
        </div>
      </div>
    </section>
  );
});
Pricing.displayName = "Pricing";
