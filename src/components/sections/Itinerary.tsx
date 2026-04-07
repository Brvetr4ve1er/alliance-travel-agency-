
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Palmtree, Landmark, ShoppingBag, Waves, Utensils, Camera } from "lucide-react";

export function Itinerary() {
  const sections = [
    {
      title: "Sharm El Sheikh — 5 nuits",
      icon: Palmtree,
      items: [
        { name: "Naama Bay", desc: "Balade sur le front de mer, boutiques, restaurants et la plage emblématique de Sharm.", icon: Waves },
        { name: "Sahaba Mosque", desc: "L'une des plus grandes mosquées d'Égypte, architecture impressionnante.", icon: Landmark },
        { name: "Old Market", desc: "Marché traditionnel (Sharm El Maya), artisanat et ambiance locale authentique.", icon: ShoppingBag },
        { name: "Soho Square", desc: "Complexe de divertissement, fontaines musicales, restaurants et shows nocturnes.", icon: Utensils },
        { name: "Snorkeling", desc: "Plongée optionnelle dans les récifs coralliens de la Mer Rouge.", icon: Camera },
      ]
    },
    {
      title: "Le Caire — 2 nuits",
      icon: Landmark,
      items: [
        { name: "Pyramides & Sphinx", desc: "L'une des 7 merveilles du monde antique à Gizeh.", icon: Landmark },
        { name: "Khan El Khalili", desc: "Grand bazar historique du Caire islamique depuis le XIVe siècle.", icon: ShoppingBag },
        { name: "Mosquée Al-Azhar", desc: "Centre spirituel de l'islam depuis plus de 1000 ans.", icon: Landmark },
        { name: "Croisière sur le Nil", desc: "Dîner-spectacle de danse orientale et musique traditionnelle.", icon: Utensils },
        { name: "Grand Egyptian Museum", desc: "Optionnel. Le plus grand musée archéologique du monde.", icon: Landmark },
      ]
    }
  ];

  return (
    <div className="space-y-12">
      {sections.map((section, idx) => (
        <div key={idx} className="relative">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/30">
              <section.icon className="h-6 w-6 text-gold" />
            </div>
            <h3 className="text-3xl font-headline text-gold">{section.title}</h3>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-gold/30 to-transparent" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6 pl-10 border-l-2 border-gold/20">
            {section.items.map((item, i) => (
              <Card key={i} className="glass-panel hover:border-gold/30 transition-colors group">
                <CardContent className="p-5 flex gap-4">
                  <div className="p-2 rounded-lg bg-white/5 text-gold group-hover:bg-gold/10 transition-colors">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{item.name}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
