"use client";

import React, { memo } from "react";
import { Camera, Waves, Landmark, Sparkles } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useLanguage } from "@/components/providers/LanguageProvider";

export const Experience = memo(() => {
  const { t } = useLanguage();
  const highlights = [
    { icon: Landmark, title: t('exp_h1'), desc: t('exp_h1_desc'), imageId: "pyramids" },
    { icon: Waves, title: t('exp_h2'), desc: t('exp_h2_desc'), imageId: "sharm-beach" },
    { icon: Sparkles, title: t('exp_h3'), desc: t('exp_h3_desc'), imageId: "nile-cruise" },
    { icon: Camera, title: t('exp_h4'), desc: t('exp_h4_desc'), imageId: "khan-el-khalili" },
  ];

  return (
    <section className="space-y-16">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-headline mb-6">{t('exp_title')}</h2>
        <p className="text-muted-foreground text-lg leading-relaxed">{t('exp_desc')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {highlights.map((h, i) => {
          const image = PlaceHolderImages.find(img => img.id === h.imageId);
          return (
            <div key={i} className="group space-y-6">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-gold/20 transition-transform duration-500 group-hover:scale-[1.02]">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                {image && <Image src={image.imageUrl} alt={image.description} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover" data-ai-hint={image.imageHint} />}
                <div className="absolute top-4 left-4 z-20 h-10 w-10 rounded-lg bg-gold/90 flex items-center justify-center text-gold-foreground backdrop-blur-sm"><h.icon className="h-5 w-5" /></div>
              </div>
              <div className="px-2">
                <h3 className="text-xl font-headline font-bold mb-2 group-hover:text-gold transition-colors">{h.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
});
Experience.displayName = "Experience";
