"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, ArrowRight, Clock, MapPin, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Badge } from "@/components/ui/badge";

export function Flights() {
  const { t, isRtl } = useLanguage();

  const departures = [
    { 
      date: "09 Avril au 18 Avril 2026",
      airline: "Egyptair",
      duration: "10 Jours / 8 Nuits",
      checkIn: "10 Avril 2026",
      flights: [
        { no: "MS 846", route: ["Alger", "Caire"], type: "direct", time: "12:55 → 17:40" },
        { no: "MS 028", route: ["Caire", "Sharm"], type: "direct", time: "19:50 → 20:50" },
        { no: "MS 029", route: ["Sharm", "Caire"], type: "direct", time: "21:30 → 22:30" },
        { no: "MS 845", route: ["Caire", "Alger"], type: "direct", time: "08:45 → 11:55" },
      ]
    },
    { 
      date: "23 Avril au 02 Mai 2026",
      airline: "Egyptair",
      duration: "10 Jours / 8 Nuits",
      checkIn: "24 Avril 2026",
      flights: [
        { no: "MS 846", route: ["Alger", "Caire"], type: "direct", time: "12:55 → 17:40" },
        { no: "MS 028", route: ["Caire", "Sharm"], type: "direct", time: "19:50 → 20:50" },
        { no: "MS 025", route: ["Sharm", "Caire"], type: "direct", time: "08:40 → 09:40" },
        { no: "MS 845", route: ["Caire", "Alger"], type: "direct", time: "09:45 → 11:55" },
      ]
    },
    { 
      date: "07 Mai au 16 Mai 2026",
      airline: "Egyptair",
      duration: "10 Jours / 8 Nuits",
      checkIn: "08 Mai 2026",
      flights: [
        { no: "MS 846", route: ["Alger", "Caire"], type: "direct", time: "12:55 → 17:40" },
        { no: "MS 028", route: ["Caire", "Sharm"], type: "direct", time: "19:50 → 20:50" },
        { no: "MS 025", route: ["Sharm", "Caire"], type: "direct", time: "08:40 → 09:40" },
        { no: "MS 845", route: ["Caire", "Alger"], type: "direct", time: "09:45 → 11:55" },
      ]
    },
    { 
      date: "04 Juin au 13 Juin 2026",
      airline: "Egyptair",
      duration: "10 Jours / 8 Nuits",
      checkIn: "05 Juin 2026",
      flights: [
        { no: "MS 846", route: ["Alger", "Caire"], type: "direct", time: "12:55 → 17:40" },
        { no: "MS 028", route: ["Caire", "Sharm"], type: "direct", time: "19:50 → 20:50" },
        { no: "MS 025", route: ["Sharm", "Caire"], type: "direct", time: "08:40 → 09:40" },
        { no: "MS 845", route: ["Caire", "Alger"], type: "direct", time: "09:45 → 11:55" },
      ]
    },
    { 
      date: "18 Juin au 27 Juin 2026",
      airline: "Egyptair",
      duration: "10 Jours / 8 Nuits",
      checkIn: "19 Juin 2026",
      flights: [
        { no: "MS 846", route: ["Alger", "Caire"], type: "direct", time: "12:55 → 17:40" },
        { no: "MS 028", route: ["Caire", "Sharm"], type: "direct", time: "19:50 → 20:50" },
        { no: "MS 025", route: ["Sharm", "Caire"], type: "direct", time: "08:40 → 09:40" },
        { no: "MS 845", route: ["Caire", "Alger"], type: "direct", time: "09:45 → 11:55" },
      ]
    }
  ];

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {departures.map((dep, idx) => (
          <Card key={idx} className="glass-panel border-gold/10 overflow-hidden group hover:border-gold/30 transition-all duration-500">
            <CardHeader className="border-b border-gold/10 bg-gold/5 p-6">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="border-gold/30 text-gold uppercase tracking-widest text-[10px]">
                  {dep.airline}
                </Badge>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {dep.duration}
                </div>
              </div>
              <CardTitle className="text-foreground font-headline text-xl md:text-2xl flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                    <Plane className="h-5 w-5" />
                  </div>
                  {dep.date}
                </div>
                <div className="text-xs text-primary font-medium uppercase tracking-wider ps-13">
                  Check-in : {dep.checkIn}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gold/10">
                {dep.flights.map((flight, i) => (
                  <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 gap-4 hover:bg-gold/5 transition-colors">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-gold/10 text-gold border border-gold/20">
                          {flight.no}
                        </span>
                        <Badge variant="ghost" className="text-[10px] text-teal-400 p-0 font-medium">
                          {flight.type === 'direct' ? t('flights_direct') : t('flights_transit')}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                        <MapPin className="h-3 w-3 text-gold" />
                        {flight.route[0]} 
                        <ArrowRight className={isRtl ? "h-3 w-3 text-muted-foreground rotate-180" : "h-3 w-3 text-muted-foreground"} /> 
                        {flight.route[1]}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 w-full sm:w-auto">
                      <span className="text-lg font-headline font-bold text-gold">{flight.time}</span>
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{t('info_vols_val')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="max-w-2xl mx-auto p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-center gap-4">
        <ShieldCheck className="h-6 w-6 text-emerald-500 shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed italic">
          * Les horaires sont donnés à titre indicatif et peuvent être sujets à des modifications mineures par la compagnie aérienne Egyptair.
        </p>
      </div>
    </div>
  );
}