
"use client";

import { ShieldCheck, Award, Users, Star } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function TrustSection() {
  const { t } = useLanguage();

  const points = [
    { icon: ShieldCheck, title: t('trust_p1_title'), desc: t('trust_p1_desc') },
    { icon: Award, title: t('trust_p2_title'), desc: t('trust_p2_desc') },
    { icon: Users, title: t('trust_p3_title'), desc: t('trust_p3_desc') },
  ];

  return (
    <div className="space-y-8">
      <div className="glass-panel p-8 rounded-2xl border-gold/10">
        <h3 className="text-3xl font-headline mb-8">{t('trust_title')}</h3>
        <div className="space-y-8">
          {points.map((p, i) => (
            <div key={i} className="flex gap-4">
              <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                <p.icon className="h-5 w-5 text-gold" />
              </div>
              <div>
                <h4 className="font-bold mb-1">{p.title}</h4>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel p-8 rounded-2xl border-emerald-500/20 bg-emerald-500/5">
        <div className="flex gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-4 w-4 fill-emerald-500 text-emerald-500" />)}
        </div>
        <p className="italic text-sm leading-relaxed mb-4">
          {t('trust_quote')}
        </p>
        <p className="text-xs font-bold uppercase tracking-widest">— {t('trust_author')}</p>
      </div>
    </div>
  );
}
