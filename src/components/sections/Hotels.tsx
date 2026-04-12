
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Waves, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Hotels() {
  const { t, isRtl } = useLanguage();

  const hotels = [
    { name: "Verginia Aqua Park", stars: 4, type: "Aqua Park", price: "180 000 DA", imageId: "hotel-1" },
    { name: "Tivoli Aqua Park", stars: 4, type: "Aqua Park", price: "185 000 DA", imageId: "hotel-2" },
    { name: "Rehana Aqua Park", stars: 4, type: "Aqua Park", price: "202 000 DA", imageId: "hotel-3" },
    { name: "Rehana Royal Beach", stars: 5, type: "Sea View", price: "227 000 DA", premium: true, imageId: "hotel-4" },
    { name: "Charmillion Club Aqua Park", stars: 5, type: "Luxury Aqua Park", price: "245 000 DA", premium: true, imageId: "hotel-5" },
    { name: "Cleopatra Luxury Resort", stars: 5, type: "Luxury Complex", price: "250 000 DA", premium: true, imageId: "hotel-6" },
    { name: "Pickalbatros Laguna Vista", stars: 5, type: "Prestige Chain", price: "265 000 DA", premium: true, imageId: "hotel-7" },
  ];

  return (
    <div className="space-y-8">
      <div className="p-4 bg-secondary/10 border-l-4 border-secondary rounded-r-lg text-sm text-foreground/80 leading-relaxed mb-8">
        <strong>{t('hotels_note').split(':')[0]} :</strong> 
        {t('hotels_note').split(':')[1]}
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {hotels.map((hotel, idx) => {
          const hotelImage = PlaceHolderImages.find(img => img.id === hotel.imageId);
          return (
            <Card key={idx} className={`glass-panel overflow-hidden transition-all duration-300 hover:shadow-gold/10 flex flex-col md:flex-row ${hotel.premium ? 'border-gold/30' : 'border-gold/10'}`}>
              <div className="relative w-full md:w-72 h-48 md:h-auto shrink-0 group overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                {hotelImage && (
                  <Image
                    src={hotelImage.imageUrl}
                    alt={hotelImage.description}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    data-ai-hint={hotelImage.imageHint}
                  />
                )}
                {hotel.premium && (
                  <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} z-20`}>
                    <Badge className="bg-gold text-gold-foreground border-none text-[10px] uppercase tracking-tighter shadow-lg">
                      {t('hotels_premium_badge')}
                    </Badge>
                  </div>
                )}
              </div>
              
              <CardContent className="flex-1 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xl font-headline font-bold text-foreground">{hotel.name}</h4>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: hotel.stars }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-gold text-gold" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground uppercase tracking-widest">
                    <Waves className="h-3 w-3 text-gold/60" />
                    {hotel.type}
                  </div>
                </div>
                
                <div className="text-left sm:text-right rtl:text-right">
                  <div className="text-xs text-muted-foreground mb-1">{t('hotels_price_sub')}</div>
                  <div className="text-3xl font-headline font-bold text-gold">{hotel.price}</div>
                  <div className="text-[10px] text-teal-400 mt-1 font-medium">{t('hotels_child_price')}</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <Card className="bg-gold/5 border-dashed border-gold/40">
        <CardContent className="p-6 flex items-start gap-4">
          <CheckCircle2 className="h-6 w-6 text-gold flex-shrink-0" />
          <div className="text-sm">
            <h5 className="font-bold text-gold mb-1">{t('hotels_cairo_title')}</h5>
            <p className="text-muted-foreground">{t('hotels_cairo_desc')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
