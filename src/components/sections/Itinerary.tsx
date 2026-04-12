
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Palmtree, Landmark, ShoppingBag, Waves, Utensils, Camera } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function Itinerary() {
  const { t, language } = useLanguage();

  const sections = [
    {
      title: t('itin_sharm'),
      icon: Palmtree,
      items: [
        { name: language === 'ar' ? "خليج نعمة" : "Naama Bay", desc: language === 'ar' ? "جولة على شاطئ البحر والمحلات الشهيرة." : "Balade sur le front de mer et boutiques emblématiques.", icon: Waves, imageId: "naama-bay" },
        { name: language === 'ar' ? "مسجد الصحابة" : "Sahaba Mosque", desc: language === 'ar' ? "عمارة مذهلة ومركز روحي." : "Architecture impressionnante et centre spirituel.", icon: Landmark, imageId: "sahaba-mosque" },
        { name: language === 'ar' ? "السوق القديم" : "Old Market", desc: language === 'ar' ? "أجواء محلية وحرف يدوية تقليدية." : "Ambiance locale et artisanat traditionnel.", icon: ShoppingBag, imageId: "old-market" },
        { name: language === 'ar' ? "سوهو سكوير" : "Soho Square", desc: language === 'ar' ? "مجمع ترفيهي ونوافير موسيقية." : "Complexe de divertissement et fontaines musicales.", icon: Utensils, imageId: "soho-square" },
        { name: language === 'ar' ? "الغطس" : "Snorkeling", desc: language === 'ar' ? "استكشاف الشعاب المرجانية في البحر الأحمر." : "Exploration des récifs coralliens de la Mer Rouge.", icon: Camera, imageId: "snorkeling" },
      ]
    },
    {
      title: t('itin_cairo'),
      icon: Landmark,
      items: [
        { name: language === 'ar' ? "الأهرامات وأبو الهول" : "Pyramides & Sphinx", desc: language === 'ar' ? "عجيبة العالم القديم في متناول يدك." : "La merveille du monde antique à portée de main.", icon: Landmark, imageId: "pyramids" },
        { name: language === 'ar' ? "خان الخليلي" : "Khan El Khalili", desc: language === 'ar' ? "روح القاهرة التاريخية." : "L'âme historique du Caire islamique.", icon: ShoppingBag, imageId: "khan-el-khalili" },
        { name: language === 'ar' ? "جامع الأزهر" : "Mosquée Al-Azhar", desc: language === 'ar' ? "أكثر من 1000 عام من التاريخ والروحانية." : "Plus de 1000 ans d'histoire et de spiritualité.", icon: Landmark, imageId: "sahaba-mosque" },
        { name: language === 'ar' ? "رحلة نيلية" : "Croisière sur le Nil", desc: language === 'ar' ? "عشاء استعراضي على النهر الأسطوري." : "Dîner-spectacle sur le fleuve légendaire.", icon: Utensils, imageId: "nile-cruise" },
        { name: language === 'ar' ? "المتحف المصري الكبير" : "Grand Egyptian Museum", desc: language === 'ar' ? "أكبر متحف أثري في العالم." : "Le plus grand musée archéologique du monde.", icon: Landmark, imageId: "museum" },
      ]
    }
  ];

  return (
    <div className="space-y-16">
      {sections.map((section, idx) => (
        <div key={idx} className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/30">
              <section.icon className="h-6 w-6 text-gold" />
            </div>
            <h3 className="text-3xl font-headline text-gold">{section.title}</h3>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-gold/30 to-transparent" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items.map((item, i) => {
              const image = PlaceHolderImages.find(img => img.id === item.imageId);
              return (
                <Card key={i} className="glass-panel overflow-hidden border-gold/10 hover:border-gold/30 transition-all duration-500 group">
                  <div className="relative h-48 w-full overflow-hidden">
                    <div className="absolute inset-0 z-10 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                    <div className="absolute bottom-3 left-3 z-20 p-1.5 rounded-md bg-gold text-gold-foreground">
                      <item.icon className="h-4 w-4" />
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h4 className="font-bold text-foreground mb-1">{item.name}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
