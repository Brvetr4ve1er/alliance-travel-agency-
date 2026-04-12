
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Waves, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const HOTELS_DATA = [
  { name: "Verginia Aqua Park", stars: 4, type: "Aqua Park", price: "180 000 DA", imageId: "hotel-1" },
  { name: "Tivoli Aqua Park", stars: 4, type: "Aqua Park", price: "185 000 DA", imageId: "hotel-2" },
  { name: "Rehana Aqua Park", stars: 4, type: "Aqua Park", price: "202 000 DA", imageId: "hotel-3" },
  { name: "Rehana Royal Beach", stars: 5, type: "Sea View", price: "227 000 DA", premium: true, imageId: "hotel-4" },
  { name: "Charmillion Club Aqua Park", stars: 5, type: "Luxury Aqua Park", price: "245 000 DA", premium: true, imageId: "hotel-5" },
  { name: "Cleopatra Luxury Resort", stars: 5, type: "Luxury Complex", price: "250 000 DA", premium: true, imageId: "hotel-6" },
  { name: "Pickalbatros Laguna Vista", stars: 5, type: "Prestige Chain", price: "265 000 DA", premium: true, imageId: "hotel-7" },
];

export function Hotels() {
  const { t } = useLanguage();

  return (
    <div className="space-y-12">
      <div className="p-4 bg-primary/5 border-s-4 border-primary rounded-e-lg text-sm text-foreground/80 leading-relaxed max-w-2xl mx-auto">
        <strong>{t('hotels_note').split(':')[0]} :</strong> 
        {t('hotels_note').split(':')[1]}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {HOTELS_DATA.map((hotel, idx) => {
          const hotelImage = PlaceHolderImages.find(img => img.id === hotel.imageId);
          return (
            <Card key={idx} className={`glass-panel overflow-hidden transition-all duration-300 hover:shadow-gold/20 flex flex-col ${hotel.premium ? 'border-gold/30' : 'border-gold/10'}`}>
              <div className="relative w-full aspect-[4/3] md:aspect-video shrink-0 group overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                {hotelImage && (
                  <Image
                    src={hotelImage.imageUrl}
                    alt={hotelImage.description}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    priority={idx < 2}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    data-ai-hint={hotelImage.imageHint}
                  />
                )}
                {hotel.premium && (
                  <div className="absolute top-4 start-4 z-20">
                    <Badge className="bg-gold text-gold-foreground border-none text-[10px] uppercase tracking-tighter shadow-lg font-bold">
                      {t('hotels_premium_badge')}
                    </Badge>
                  </div>
                )}
              </div>
              
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h4 className="text-xl font-headline font-bold text-foreground leading-tight">{hotel.name}</h4>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-medium">
                      <Waves className="h-3.5 w-3.5 text-gold/60" />
                      {hotel.type}
                    </div>
                  </div>
                  <div className="flex gap-0.5 shrink-0">
                    {Array.from({ length: hotel.stars }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gold/10 flex items-end justify-between">
                  <div className="space-y-1">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">{t('hotels_price_sub')}</div>
                    <div className="text-3xl font-headline font-bold text-gold">{hotel.price}</div>
                  </div>
                  <div className="text-end">
                    <div className="text-[11px] text-teal-400 font-bold uppercase tracking-tight bg-teal-400/10 px-2 py-1 rounded">
                      {t('hotels_child_price')}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <Card className="bg-gold/5 border-dashed border-gold/40 max-w-2xl mx-auto">
        <CardContent className="p-6 flex items-start gap-4">
          <CheckCircle2 className="h-6 w-6 text-gold flex-shrink-0" />
          <div className="text-sm">
            <h5 className="font-bold text-gold mb-1 uppercase tracking-wide">{t('hotels_cairo_title')}</h5>
            <p className="text-muted-foreground leading-relaxed">{t('hotels_cairo_desc')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
