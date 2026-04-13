
"use client";

import React, { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Palmtree, Landmark, ShoppingBag, Waves, Utensils, Camera } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useLanguage } from "@/components/providers/LanguageProvider";

export const Itinerary = memo(() => {
  const { t, language } = useLanguage();
  const sections = [
    {
      title: t('itin_sharm'), icon: Palmtree,
      items: [
        { name: language === 'ar' ? "خليج نعمة" : "Naama Bay", desc: "Balade sur le front de mer.", icon: Waves, imageId: "naama-bay" },
        { name: language === 'ar' ? "مسجد الصحابة" : "Sahaba Mosque", desc: "Architecture impressionnante.", icon: Landmark, imageId: "sahaba-mosque" },
        { name: language === 'ar' ? "السوق القديم" : "Old Market", desc: "Ambiance locale.", icon: ShoppingBag, imageId: "old-market" },
      ]
    },
    {
      title: t('itin_cairo'), icon: Landmark,
      items: [
        { name: language === 'ar' ? "الأهرامات وأبو الهول" : "Pyramides & Sphinx", desc: "Merveille du monde antique.", icon: Landmark, imageId: "pyramids" },
        { name: language === 'ar' ? "خان الخليلي" : "Khan El Khalili", desc: "L'âme historique du Caire.", icon: ShoppingBag, imageId: "khan-el-khalili" },
        { name: language === 'ar' ? "رحلة نيلية" : "Croisière sur le Nil", desc: "Dîner-spectacle légendaire.", icon: Utensils, imageId: "nile-cruise" },
      ]
    }
  ];

  return (
    <div className="space-y-16">
      {sections.map((section, idx) => (
        <div key={idx} className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/30"><section.icon className="h-6 w-6 text-gold" /></div>
            <h3 className="text-3xl font-headline text-gold">{section.title}</h3>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-gold/30 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {section.items.map((item, i) => {
              const image = PlaceHolderImages.find(img => img.id === item.imageId);
              return (
                <Card key={i} className="glass-panel overflow-hidden border-gold/10 hover:border-gold/30 transition-all duration-500 group">
                  <div className="relative h-48 w-full overflow-hidden">
                    <div className="absolute inset-0 z-10 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    {image && <Image src={image.imageUrl} alt={image.description} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" data-ai-hint={image.imageHint} />}
                    <div className="absolute bottom-3 left-3 z-20 p-1.5 rounded-md bg-gold text-gold-foreground"><item.icon className="h-4 w-4" /></div>
                  </div>
                  <CardContent className="p-5"><h4 className="font-bold text-foreground mb-1">{item.name}</h4><p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p></CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
});
Itinerary.displayName = "Itinerary";
