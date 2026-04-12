
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Waves, CheckCircle2, Info, MapPin, Coffee, Utensils, Wifi, Wind, ShieldCheck, Clock, Users, User, Baby } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
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

// Performance hoisting of static data to prevent re-allocation on render
const HOTELS_DATA = [
  { 
    id: "verginia",
    name: "Verginia Sharm Resort & Aqua Park", 
    stars: 4, 
    type: "Resort & Aqua Park", 
    price: "160 000 DA", 
    imageId: "hotel-1",
    durationOverride: "10 Jours / 08 Nuits",
    pricingGrid: {
      triple: "158 000 DA",
      double: "160 000 DA",
      single: "205 000 DA",
      child1: "110 000 DA",
      child2: "140 000 DA",
      baby: "25 000 DA"
    },
    description: {
      fr: "Situé à Sharm El Sheikh, ce complexe dispose d'une grande piscine extérieure avec cascade, d'un spa complet et d'une plage privée accessible par navette gratuite. L'ambiance y est familiale et relaxante.",
      ar: "يقع هذا المنتجع في شرم الشيخ، ويتميز بمسبح خارجي كبير مع شلال، وسبا كامل، وشاطئ خاص يمكن الوصول إليه عبر حافلة مجانية. الأجواء عائلية ومريحة."
    },
    amenities: ["Free Shuttle", "Private Beach", "Aqua Park", "Spa & Wellness", "Fitness Center", "WiFi"],
    highlights: ["Cascade Pool", "Kid's Club", "Evening Shows"]
  },
  { 
    id: "tivoli",
    name: "Tivoli Aqua Park", 
    stars: 4, 
    type: "Aqua Park", 
    price: "155 000 DA", 
    imageId: "hotel-2",
    durationOverride: "10 Jours / 08 Nuits",
    pricingGrid: {
      triple: "150 000 DA",
      double: "155 000 DA",
      single: "180 000 DA",
      child1: "110 000 DA",
      child2: "130 000 DA",
      baby: "25 000 DA"
    },
    description: {
      fr: "Un paradis pour les amateurs de glisse ! Le Tivoli offre une expérience dynamique avec ses multiples toboggans et ses activités sportives quotidiennes.",
      ar: "جنة لعشاق الألعاب المائية! يقدم تيفولي تجربة ديناميكية مع منزلقاته المتعددة وأنشطته الرياضية اليومية."
    },
    amenities: ["Aqua Park", "Large Pools", "Restaurants", "Bar", "Animation", "Kids Area"],
    highlights: ["Multiple Slides", "Central Location", "Family Friendly"]
  },
  { 
    id: "rehana-aqua",
    name: "Rehana Aqua Park", 
    stars: 4, 
    type: "Aqua Park", 
    price: "185 000 DA", 
    imageId: "hotel-3",
    durationOverride: "10 Jours / 08 Nuits",
    pricingGrid: {
      triple: "180 000 DA",
      double: "185 000 DA",
      single: "220 000 DA",
      child1: "110 000 DA",
      child2: "150 000 DA",
      baby: "25 000 DA"
    },
    description: {
      fr: "Le Rehana Aqua Park combine confort moderne et divertissement aquatique de premier ordre. Idéal pour les familles cherchant un service de qualité.",
      ar: "يجمع ريحانة أكوا بارك بين الراحة الحديثة والترفيه المائي من الدرجة الأولى. مثالي للعائلات التي تبحث عن خدمة عالية الجودة."
    },
    amenities: ["Spa", "Buffet Restaurant", "Aqua Park", "Tennis Courts", "Free WiFi"],
    highlights: ["Night Life", "Professional Service", "Spacious Rooms"]
  },
  { 
    id: "rehana-royal",
    name: "Rehana Royal Beach & Aqua Park", 
    stars: 5, 
    type: "Sea View", 
    price: "210 000 DA", 
    premium: true, 
    imageId: "hotel-4",
    durationOverride: "10 Jours / 08 Nuits",
    pricingGrid: {
      triple: "205 000 DA",
      double: "210 000 DA",
      single: "260 000 DA",
      child1: "120 000 DA",
      child2: "160 000 DA",
      baby: "25 000 DA"
    },
    description: {
      fr: "Une expérience luxueuse en bord de mer. Avec sa plage privée and ses jardins luxuriants, cet établissement 5 étoiles redéfinit l'élégance à Sharm.",
      ar: "تجربة فاخرة على شاطئ البحر. مع شاطئه الخاص وحدائقه المورقة، يعيد هذا المنتجع ذو الخمس نجوم تعريف الأناقة في شرم الشيخ."
    },
    amenities: ["Beach Front", "Luxury Spa", "Gourmet Dining", "VIP Lounge", "Premium WiFi"],
    highlights: ["Sunset Views", "Private Pier", "Elite Services"]
  },
  { 
    id: "charmillion",
    name: "Charmillion Garden & Aqua Park", 
    stars: 5, 
    type: "Luxury Aqua Park", 
    price: "250 000 DA", 
    premium: true, 
    imageId: "hotel-5",
    durationOverride: "10 Jours / 08 Nuits",
    pricingGrid: {
      triple: "248 000 DA",
      double: "250 000 DA",
      single: "335 000 DA",
      child1: "115 000 DA",
      child2: "185 000 DA",
      baby: "25 000 DA"
    },
    description: {
      fr: "Le Charmillion Garden Aqua Park est un havre de paix 5 étoiles offrant un mélange parfait de détente et d'amusement aquatique. Idéal pour des vacances mémorables.",
      ar: "شارميليون جاردن أكوا بارك هو ملاذ 5 نجوم يوفر مزيجًا مثاليًا من الاسترخاء والمتعة المائية. مثالي لقضاء عطلات لا تنسى."
    },
    amenities: ["Mega Aqua Park", "Club Access", "International Buffet", "Modern Gym", "Valet Parking"],
    highlights: ["Wave Pool", "24/7 Service", "Luxury Suites"]
  },
  { 
    id: "cleopatra",
    name: "Cleopatra Luxury Resort", 
    stars: 5, 
    type: "Luxury Complex", 
    price: "267 000 DA", 
    premium: true, 
    imageId: "hotel-6",
    durationOverride: "10 Jours / 08 Nuits",
    pricingGrid: {
      triple: "265 000 DA",
      double: "267 000 DA",
      single: "355 000 DA",
      child1: "115 000 DA",
      child2: "207 000 DA",
      baby: "25 000 DA"
    },
    description: {
      fr: "La quintessence du luxe égyptien. Architecture majestueuse, piscines à débordement et service personnalisé pour un séjour d'exception.",
      ar: "جوهر الفخامة المصرية. عمارة مهيبة، مسابح لا متناهية، وخدمة شخصية لإقامة استثنائية."
    },
    amenities: ["Infinity Pool", "Private Concierge", "Diving Center", "Organic Food", "Luxury Spa"],
    highlights: ["Panoramic Views", "Fine Dining", "Tranquil Ambiance"]
  },
  { 
    id: "pickalbatros",
    name: "Pickalbatros Laguna Vista", 
    stars: 5, 
    type: "Prestige Chain", 
    price: "306 000 DA", 
    premium: true, 
    imageId: "hotel-7",
    durationOverride: "10 Jours / 08 Nuits",
    pricingGrid: {
      triple: "303 000 DA",
      double: "306 000 DA",
      single: "460 000 DA",
      child1: "115 000 DA",
      child2: "207 000 DA",
      baby: "25 000 DA"
    },
    description: {
      fr: "Fleuron de la chaîne Pickalbatros, cet hôtel offre une plage de sable fin unique et un design inspiré des lagons naturels.",
      ar: "جوهر سلسلة بيك الباتروس، يقدم هذا الفندق شاطئاً رملياً ناعماً فريداً وتصميماً مستوحى من البحيرات الطبيعية."
    },
    amenities: ["Sandy Lagoon", "Premium Bedding", "Yoga Studio", "Live Cooking", "Super High-speed WiFi"],
    highlights: ["Lagoon Beach", "Award Winning Spa", "Best for Couples"]
  },
];

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

export function Hotels() {
  const { t, language, isRtl } = useLanguage();

  return (
    <div className="space-y-12">
      <div className="p-4 bg-primary/5 border-s-4 border-primary rounded-e-lg text-sm text-foreground/80 leading-relaxed max-w-2xl mx-auto">
        <strong>{t('hotels_note').split(':')[0]} :</strong> 
        {t('hotels_note').split(':')[1]}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {HOTELS_DATA.map((hotel, idx) => {
          const hotelImage = PlaceHolderImages.find(img => img.id === hotel.imageId);
          return (
            <Sheet key={hotel.id}>
              <SheetTrigger asChild>
                <Card 
                  className={cn(
                    "glass-panel overflow-hidden transition-all duration-500 hover:shadow-gold/30 flex flex-col h-full cursor-pointer group hover:-translate-y-1",
                    hotel.premium ? 'border-gold/30 bg-gold/5' : 'border-gold/10'
                  )}
                >
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
                    <div className="absolute top-4 start-4 z-20 flex flex-col gap-2">
                      {hotel.premium && (
                        <Badge className="bg-gold text-gold-foreground border-none text-[10px] uppercase tracking-tighter shadow-xl font-bold px-3 py-1">
                          {t('hotels_premium_badge')}
                        </Badge>
                      )}
                      <div className="bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-gold/20 flex items-center justify-center">
                        <span className="text-[11px] font-bold text-gold px-2 py-0.5">{hotel.stars} ★</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                          <h4 className="text-2xl font-headline font-bold text-foreground leading-tight group-hover:text-gold transition-colors">{hotel.name}</h4>
                          <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-medium">
                            <Waves className="h-3.5 w-3.5 text-gold" />
                            {hotel.type}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-gold/10 flex items-end justify-between">
                      <div className="space-y-1">
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">{t('hotels_price_sub')}</div>
                        <div className="text-3xl font-headline font-bold text-gold">{hotel.price}</div>
                      </div>
                      <div className="text-end flex flex-col items-end gap-2">
                        <div className="text-[11px] text-teal-400 font-bold uppercase tracking-tight bg-teal-400/10 px-2 py-1 rounded">
                          {hotel.pricingGrid ? `${t('hotels_child_1')} : ${hotel.pricingGrid.child1}` : t('hotels_child_price')}
                        </div>
                        <Button variant="ghost" size="sm" className="text-gold h-auto p-0 hover:bg-transparent hover:text-gold/80 flex items-center gap-1">
                          <Info className="h-4 w-4" />
                          <span className="text-xs font-bold uppercase tracking-tighter">Details</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                      <div className="flex items-center gap-1 text-gold font-bold">
                        <span>{hotel.stars} ★</span>
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
                        {language === 'ar' ? hotel.description.ar : hotel.description.fr}
                      </SheetDescription>
                    </div>

                    {hotel.durationOverride && (
                      <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-4">
                        <Clock className="h-6 w-6 text-gold" />
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Durée du séjour</p>
                          <p className="text-lg font-bold text-gold">{hotel.durationOverride}</p>
                        </div>
                      </div>
                    )}

                    {hotel.pricingGrid && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 text-gold">
                          <ShieldCheck className="h-5 w-5" />
                          <h5 className="text-lg font-headline font-bold tracking-wide uppercase">{t('hotels_price_grid')}</h5>
                        </div>
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
                    )}

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

                    <div className="space-y-6">
                      <div className="flex items-center gap-2 text-gold">
                        <Star className="h-5 w-5" />
                        <h5 className="text-lg font-headline font-bold tracking-wide uppercase">{t('hotels_drawer_highlights')}</h5>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {hotel.highlights.map((highlight) => (
                          <Badge key={highlight} variant="outline" className="border-gold/30 text-gold py-1 px-3">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-8 border-t border-gold/10">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{t('hotels_price_sub')}</p>
                          <p className="text-4xl font-headline font-bold text-gold">{hotel.price}</p>
                        </div>
                        <div className="text-end">
                          <p className="text-xs text-teal-400 font-bold uppercase mb-1">Inclus :</p>
                          <div className="flex flex-col gap-1 text-[10px] text-muted-foreground uppercase tracking-tighter">
                            <span className="flex items-center justify-end gap-1"><Coffee className="h-3 w-3" /> All Inclusive Soft</span>
                            <span className="flex items-center justify-end gap-1"><Utensils className="h-3 w-3" /> Gastronomie</span>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full bg-gold hover:bg-gold/80 text-gold-foreground h-14 text-lg font-bold shadow-2xl">
                        {t('hotels_drawer_cta')}
                      </Button>
                    </div>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
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
