
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Waves, CheckCircle2 } from "lucide-react";

export function Hotels() {
  const hotels = [
    { name: "Verginia Aqua Park", stars: 4, type: "Aqua Park", price: "180 000 DA" },
    { name: "Tivoli Aqua Park", stars: 4, type: "Aqua Park", price: "185 000 DA" },
    { name: "Rehana Aqua Park", stars: 4, type: "Aqua Park", price: "202 000 DA" },
    { name: "Rehana Royal Beach", stars: 5, type: "Sea View", price: "227 000 DA", premium: true },
    { name: "Charmillion Club Aqua Park", stars: 5, type: "Luxury Aqua Park", price: "245 000 DA", premium: true },
    { name: "Cleopatra Luxury Resort", stars: 5, type: "Luxury Complex", price: "250 000 DA", premium: true },
    { name: "Pickalbatros Laguna Vista", stars: 5, type: "Prestige Chain", price: "265 000 DA", premium: true },
  ];

  return (
    <div className="space-y-8">
      <div className="p-4 bg-secondary/10 border-l-4 border-secondary rounded-r-lg text-sm text-foreground/80 leading-relaxed mb-8">
        <strong>Note de lecture :</strong> Les tarifs indiqués sont par personne en chambre double. 
        Formule All Inclusive Soft à Sharm El Sheikh. Petit déjeuner au Caire (Marwa Palace Hotel).
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {hotels.map((hotel, idx) => (
          <Card key={idx} className={`glass-panel overflow-hidden transition-all duration-300 hover:shadow-gold/10 ${hotel.premium ? 'border-gold/30' : ''}`}>
            <CardContent className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="text-xl font-headline font-bold text-foreground">{hotel.name}</h4>
                  {hotel.premium && <Badge className="bg-gold/20 text-gold border-gold/30 text-[10px] uppercase tracking-tighter">Prestige</Badge>}
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-gold text-gold" />
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground uppercase tracking-widest">
                  <Waves className="h-3 w-3" />
                  {hotel.type}
                </div>
              </div>
              
              <div className="text-left sm:text-right">
                <div className="text-xs text-muted-foreground mb-1">Double / Pers.</div>
                <div className="text-3xl font-headline font-bold text-gold">{hotel.price}</div>
                <div className="text-[10px] text-teal-400 mt-1">1er Enfant : 115 000 DA</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="bg-gold/5 border-dashed border-gold/40">
        <CardContent className="p-6 flex items-start gap-4">
          <CheckCircle2 className="h-6 w-6 text-gold flex-shrink-0" />
          <div className="text-sm">
            <h5 className="font-bold text-gold mb-1">Hébergement au Caire inclus</h5>
            <p className="text-muted-foreground">Le séjour comprend également 2 nuits au <strong>Marwa Palace Hotel (4★)</strong> en formule petit déjeuner.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
