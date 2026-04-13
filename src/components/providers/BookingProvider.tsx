
"use client";

import React, { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { TRIP_CONFIG } from "@/lib/trip-config";

type RoomType = "single" | "double" | "triple";

interface BookingContextState {
  selectedHotelId: string;
  selectedDate: string;
  selectedRoomType: RoomType;
  adultCount: number;
  child1Count: number;
  child2Count: number;
  babyCount: number;
  priceData: {
    total: number;
    error: string | null;
  };
  setSelectedHotelId: (id: string) => void;
  setSelectedDate: (date: string) => void;
  setSelectedRoomType: (type: RoomType) => void;
  setAdultCount: (count: number) => void;
  setChild1Count: (count: number) => void;
  setChild2Count: (count: number) => void;
  setBabyCount: (count: number) => void;
}

const BookingContext = createContext<BookingContextState | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedHotelId, setSelectedHotelId] = useState<string>(TRIP_CONFIG.hotels[0].id);
  const [selectedDate, setSelectedDate] = useState<string>(TRIP_CONFIG.departureDates[0].label);
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType>("double");
  const [adultCount, setAdultCount] = useState<number>(2);
  const [child1Count, setChild1Count] = useState<number>(0);
  const [child2Count, setChild2Count] = useState<number>(0);
  const [babyCount, setBabyCount] = useState<number>(0);

  const priceData = useMemo(() => {
    const hotel = TRIP_CONFIG.hotels.find(h => h.id === selectedHotelId) || TRIP_CONFIG.hotels[0];
    const p = hotel.pricingGridNum;
    let total = 0;
    let error = null;

    if (selectedRoomType === "single" && adultCount !== 1) error = "Single room = 1 adulte";
    else if (selectedRoomType === "double" && adultCount > 2) error = "Double room = max 2 adultes";
    else if (selectedRoomType === "triple" && adultCount > 3) error = "Triple room = max 3 adultes";
    
    if (!error) {
      total += adultCount * p[selectedRoomType];
      if (child1Count > 0) total += p.child1;
      if (child2Count > 0) total += p.child2;
      total += babyCount * p.baby;
    }

    return { total, error };
  }, [selectedHotelId, selectedRoomType, adultCount, child1Count, child2Count, babyCount]);

  const value = useMemo(() => ({
    selectedHotelId,
    selectedDate,
    selectedRoomType,
    adultCount,
    child1Count,
    child2Count,
    babyCount,
    priceData,
    setSelectedHotelId,
    setSelectedDate,
    setSelectedRoomType,
    setAdultCount,
    setChild1Count,
    setChild2Count,
    setBabyCount
  }), [selectedHotelId, selectedDate, selectedRoomType, adultCount, child1Count, child2Count, babyCount, priceData]);

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used within a BookingProvider");
  return context;
}
