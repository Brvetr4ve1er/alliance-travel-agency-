"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Waves, CheckCircle2, Info, MapPin, Wind, ShieldCheck, Clock, Users, User, Baby, Check, Utensils, Wifi, Coffee } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { TRIP_CONFIG } from "@/lib/trip-config";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const AMENITY_ICONS: Record<string, any> = {
  "Free Shuttle": Wind,
  "Private Beach": Waves,
  "Aqua Park": Waves,
  "Spa & Wellness": ShieldCheck,
  "Fitness Center": ShieldCheck,
  "WiFi": Wifi,
  "Beach Front": Waves,
  "Luxury Spa": ShieldCheck,
  "Gourmet Dining": Utensils,
  "VIP Lounge": Info,
  "Premium WiFi": Wifi,
  "Mega Aqua Park": Waves,
  "International Buffet": Utensils,
  "Modern Gym": ShieldCheck,
  "Infinity Pool": Waves,
  "Private Concierge": Info,
  "Diving Center": Waves,
  "Organic Food": Coffee,
  "Sandy Lagoon": Waves,
  "Premium Bedding": Info,
  "Yoga Studio": ShieldCheck,
  "Live Cooking": Utensils,
};

interface HotelsProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export function Hotels({ selectedId, onSelect }: HotelsProps) {
  const { t, language, isRtl } = useLanguage();

  return (
    <div className="space-y-12">
      <div className="p-4 bg-primary/5 border-s-4 border-primary rounded-e-lg text-sm text-foreground/80 leading-relaxed max-w-2xl mx-auto">
        <strong>{t('hotels_note').split(':')[0]} :</strong> 
        {t('hotels_note').split(':')[1]}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {TRIP_CONFIG.hotels.map((hotel, idx) => {
          const hotelImage = PlaceHolderImages.find(img => img.id === hotel.imageId);
          const isSelected = selectedId === hotel.id;
          
          const hotelDescription = language === 'ar' 
            ? `فندق ${hotel.stars} نجوم في شرم الشيخ، يقدم تجربة ${hotel.type} مميزة.`
            : `Hôtel ${hotel.stars} étoiles à Sharm El Sheikh, offrant une expérience ${hotel.type} exceptionnelle.`;

          return (
            <Card 
              key={hotel.id}
              className={cn(
                "glass-panel overflow-hidden transition-all duration-500 flex flex-col h-full group relative",
                isSelected ? 'border-gold ring-2 ring-gold shadow-2xl shadow-gold/20' : 'border-gold/10 hover:border-gold/30',
                hotel.premium && !isSelected ? 'bg-gold/5' : ''
              )}
            >
              {isSelected && (
                <div className="absolute top-4 end-4 z-30 bg-gold text-gold-foreground p-1 rounded-full shadow-xl">
                  <Check className="h-4 w-4" />
                </div>
              )}
              
              <div className="relative w-full aspect-video md:aspect-[16/10] shrink-0 overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                {hotelImage && (
                  <Image
                    src={hotelImage.imageUrl}
                    alt={hotelImage.description}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    priority={idx < 2}
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    data-ai-hint={hotelImage.imageHint}
                  />
                )}
                <div className="absolute top-4 start-4 z-20 flex gap-2">
                  {hotel.premium && (
                    <Badge className="bg-gold text-gold-foreground border-none text-[10px] uppercase tracking-tighter shadow-xl font-bold px-3 py-1">
                      {t('hotels_premium_badge')}
                    </Badge>
                  )}
                </div>
              </div>
              
              <CardContent className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <h4 className="text-2xl font-headline font-bold text-foreground leading-tight group-hover:text-gold transition-colors">{hotel.name}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-medium">
                        <Waves className="h-3.5 w-3.5 text-gold" />
                        {hotel.type}
                      </div>
                    </div>
                    <div className="shrink-0 flex items-center gap-2 bg-gold/20 px-4 py-2 rounded-xl border border-gold/30 shadow-md">
                      <span className="text-xl font-bold text-gold leading-none">{hotel.stars}</span>
                      <Star className="h-5 w-5 fill-gold text-gold" />
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gold/10 flex items-end justify-between">
                  <div className="space-y-1">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Trip Total / Per Person</div>
                    <div className="text-3xl font-headline font-bold text-gold">{hotel.price}</div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <div className="flex gap-2">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline" size="sm" className="border-gold/30 text-gold hover:bg-gold/5 h-9">
                            <Info className="h-4 w-4" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent side={isRtl ? "left" : "right"} className="glass-panel border-gold/20 w-full sm:max-w-xl p-0">
                          <ScrollArea className="h-full">
                            <div className="relative h-64 w-full">
                              {hotelImage && (
                                <Image
                                  src={hotelImage.imageUrl}
                                  alt={hotelImage.description}
                                  fill
                                  className="object-cover"
                                />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                              <div className="absolute bottom-6 start-6">
                                <SheetTitle className="text-3xl md:text-4xl font-headline text-white mb-2">{hotel.name}</SheetTitle>
                                <div className="flex items-center gap-2 text-gold font-bold text-xl">
                                  <span>{hotel.stars}</span>
                                  <Star className="h-5 w-5 fill-gold" />
                                </div>
                              </div>
                            </div>

                            <div className="p-8 space-y-10">
                              <div className="space-y-4">
                                <div className="flex items-center gap-2 text-gold">
                                  <Info className="h-5 w-5" />
                                  <h5 className="text-lg font-headline font-bold tracking-wide uppercase">Description</h5>
                                </div>
                                <SheetDescription className="text-base text-muted-foreground leading-relaxed italic border-s-2 border-gold/30 ps-4">
                                  {hotelDescription}
                                </SheetDescription>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-4">
                                  <Clock className="h-6 w-6 text-gold" />
                                  <div>
                                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Séjour</p>
                                    <p className="text-sm font-bold text-gold">{TRIP_CONFIG.duration.label}</p>
                                  </div>
                                </div>
                                <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-4">
                                  <MapPin className="h-6 w-6 text-gold" />
                                  <div>
                                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Ville</p>
                                    <p className="text-sm font-bold text-gold">Sharm El Sheikh</p>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-6">
                                <div className="flex items-center gap-2 text-gold">
                                  <ShieldCheck className="h-5 w-5" />
                                  <h5 className="text-lg font-headline font-bold tracking-wide uppercase">{t('hotels_price_grid')}</h5>
                                </div>
                                <p className="text-xs text-muted-foreground mb-4">Prices represent the total trip cost per person for this hotel choice.</p>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                                    <p className="text-[10px] text-muted-foreground uppercase flex items-center gap-1"><Users className="h-3 w-3" /> {t('hotels_triple')}</p>
                                    <p className="text-sm font-bold text-gold">{hotel.pricingGrid.triple}</p>
                                  </div>
                                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                                    <p className="text-[10px] text-muted-foreground uppercase flex items-center gap-1"><Users className="h-3 w-3" /> {t('hotels_double')}</p>
                                    <p className="text-sm font-bold text-gold">{hotel.pricingGrid.double}</p>
                                  </div>
                                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                                    <p className="text-[10px] text-muted-foreground uppercase flex items-center gap-1"><User className="h-3 w-3" /> {t('hotels_single')}</p>
                                    <p className="text-sm font-bold text-gold">{hotel.pricingGrid.single}</p>
                                  </div>
                                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                                    <p className="text-[10px] text-muted-foreground uppercase flex items-center gap-1"><Baby className="h-3 w-3" /> {t('hotels_child_1')}</p>
                                    <p className="text-sm font-bold text-gold">{hotel.pricingGrid.child1}</p>
                                  </div>
                                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                                    <p className="text-[10px] text-muted-foreground uppercase flex items-center gap-1"><Baby className="h-3 w-3" /> {t('hotels_child_2')}</p>
                                    <p className="text-sm font-bold text-gold">{hotel.pricingGrid.child2}</p>
                                  </div>
                                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                                    <p className="text-[10px] text-muted-foreground uppercase flex items-center gap-1"><Baby className="h-3 w-3" /> {t('hotels_baby')}</p>
                                    <p className="text-sm font-bold text-gold">{hotel.pricingGrid.baby}</p>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-6">
                                <div className="flex items-center gap-2 text-gold">
                                  <CheckCircle2 className="h-5 w-5" />
                                  <h5 className="text-lg font-headline font-bold tracking-wide uppercase">{t('hotels_drawer_amenities')}</h5>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  {hotel.amenities.map((amenity) => {
                                    const Icon = AMENITY_ICONS[amenity] || Info;
                                    return (
                                      <div key={amenity} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                                        <Icon className="h-4 w-4 text-gold" />
                                        <span className="text-sm font-medium">{amenity}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              <div className="pt-8 border-t border-gold/10">
                                <Button 
                                  onClick={() => onSelect(hotel.id)} 
                                  className={cn(
                                    "w-full h-14 text-lg font-bold shadow-2xl",
                                    isSelected ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "bg-gold hover:bg-gold/80 text-gold-foreground"
                                  )}
                                >
                                  {isSelected ? <><Check className="h-5 w-5 me-2" /> {t('hotels_drawer_cta')} (Selectionné)</> : t('hotels_drawer_cta')}
                                </Button>
                              </div>
                            </div>
                          </ScrollArea>
                        </SheetContent>
                      </Sheet>
                      <Button 
                        variant={isSelected ? "default" : "secondary"} 
                        size="sm" 
                        onClick={() => onSelect(hotel.id)}
                        className={cn(
                          "h-9 font-bold uppercase tracking-tighter transition-all",
                          isSelected ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "bg-gold/10 text-gold hover:bg-gold hover:text-gold-foreground"
                        )}
                      >
                        {isSelected ? <Check className="h-4 w-4" /> : t('hotels_drawer_cta')}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <Card className="bg-gold/5 border-dashed border-gold/40 max-w-2xl mx-auto shadow-inner">
        <CardContent className="p-6 flex items-start gap-4">
          <MapPin className="h-6 w-6 text-gold flex-shrink-0" />
          <div className="text-sm">
            <h5 className="font-bold text-gold mb-1 uppercase tracking-wide">{t('hotels_cairo_title')}</h5>
            <p className="text-muted-foreground leading-relaxed">{t('hotels_cairo_desc')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
