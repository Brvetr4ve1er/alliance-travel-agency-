
"use client";

import React, { memo } from "react";
import { useBooking } from "@/components/providers/BookingProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { TRIP_CONFIG } from "@/lib/trip-config";
import { MessageCircle } from "lucide-react";

export const WhatsAppFAB = memo(() => {
  const { t } = useLanguage();
  const { selectedHotelId, selectedDate, selectedRoomType, adultCount, child1Count, child2Count, babyCount, priceData } = useBooking();
  const hotel = TRIP_CONFIG.hotels.find(h => h.id === selectedHotelId) || TRIP_CONFIG.hotels[0];
  const formattedPrice = new Intl.NumberFormat('fr-DZ').format(priceData.total) + " DA";
  
  const msg = `Bonjour, je souhaite réserver l'offre Égypte 2026. Hôtel: ${hotel.name}, Chambre: ${selectedRoomType}, Date: ${selectedDate}, Voyageurs: ${adultCount} Adultes, ${(child1Count > 0 ? 1 : 0) + (child2Count > 0 ? 1 : 0)} Enfants, ${babyCount} Bébé. Total: ${formattedPrice}`;

  return (
    <a 
      href={`https://wa.me/213561616267?text=${encodeURIComponent(msg)}`} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-24 right-8 z-[300] bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group flex items-center gap-3"
    >
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-medium">{t('whatsapp_cta')}</span>
      <MessageCircle className="h-6 w-6" />
    </a>
  );
});
WhatsAppFAB.displayName = "WhatsAppFAB";
