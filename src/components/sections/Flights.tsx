
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, ArrowRight } from "lucide-react";

export function Flights() {
  const departures = [
    { 
      date: "05 Avril 2026",
      flights: [
        { no: "MS 846", route: ["Alger", "Caire"], date: "05 Avr", time: "12:55 → 17:40" },
        { no: "MS 028", route: ["Caire", "Sharm"], date: "05 Avr", time: "19:50 → 20:50" },
        { no: "MS 029", route: ["Sharm", "Caire"], date: "10 Avr", time: "21:30 → 22:30" },
        { no: "MS 845", route: ["Caire", "Alger"], date: "12 Avr", time: "08:45 → 11:55" },
      ]
    },
    { 
      date: "19 Avril 2026",
      flights: [
        { no: "MS 846", route: ["Alger", "Caire"], date: "19 Avr", time: "12:55 → 17:40" },
        { no: "MS 028", route: ["Caire", "Sharm"], date: "19 Avr", time: "19:50 → 20:50" },
        { no: "MS 025", route: ["Sharm", "Caire"], date: "24 Avr", time: "08:40 → 09:40" },
        { no: "MS 845", route: ["Caire", "Alger"], date: "26 Avr", time: "09:45 → 11:55" },
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-8">
      {departures.map((dep, idx) => (
        <Card key={idx} className="glass-panel border-gold/10">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="text-gold font-headline text-xl uppercase tracking-widest flex items-center gap-3">
              <Plane className="h-5 w-5" />
              Départ {dep.date}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {dep.flights.map((flight, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4 hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs px-2 py-1 rounded bg-gold/10 text-gold border border-gold/20">
                      {flight.no}
                    </span>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      {flight.route[0]} <ArrowRight className="h-3 w-3 text-muted-foreground" /> {flight.route[1]}
                    </div>
                  </div>
                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="text-xs text-muted-foreground">{flight.date}</span>
                    <span className="font-medium">{flight.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
      <p className="text-center text-xs text-muted-foreground italic">
        * Tous les vols sont opérés par Egyptair (MS).
      </p>
    </div>
  );
}
