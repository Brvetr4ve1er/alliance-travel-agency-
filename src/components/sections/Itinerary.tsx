
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Palmtree, Landmark, ShoppingBag, Waves, Utensils, Camera } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Itinerary() {
  const sections = [
    {
      title: "Sharm El Sheikh — 5 nuits",
      icon: Palmtree,
      items: [
        { name: "Naama Bay", desc: "Balade sur le front de mer et boutiques emblématiques.", icon: Waves, imageId: "naama-bay" },
        { name: "Sahaba Mosque", desc: "Architecture impressionnante et centre spirituel.", icon: Landmark, imageId: "sahaba-mosque" },
        { name: "Old Market", desc: "Ambiance locale et artisanat traditionnel.", icon: ShoppingBag, imageId: "old-market" },
        { name: "Soho Square", desc: "Complexe de divertissement et fontaines musicales.", icon: Utensils, imageId: "soho-square" },
        { name: "Snorkeling", desc: "Exploration des récifs coralliens de la Mer Rouge.", icon: Camera, imageId: "snorkeling" },
      ]
    },
    {
      title: "Le Caire — 2 nuits",
      icon: Landmark,
      items: [
        { name: "Pyramides & Sphinx", desc: "La merveille du monde antique à portée de main.", icon: Landmark, imageId: "pyramids" },
        { name: "Khan El Khalili", desc: "L'âme historique du Caire islamique.", icon: ShoppingBag, imageId: "khan-el-khalili" },
        { name: "Mosquée Al-Azhar", desc: "Plus de 1000 ans d'histoire et de spiritualité.", icon: Landmark, imageId: "sahaba-mosque" },
        { name: "Croisière sur le Nil", desc: "Dîner-spectacle sur le fleuve légendaire.", icon: Utensils, imageId: "nile-cruise" },
        { name: "Grand Egyptian Museum", desc: "Le plus grand musée archéologique du monde.", icon: Landmark, imageId: "museum" },
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
