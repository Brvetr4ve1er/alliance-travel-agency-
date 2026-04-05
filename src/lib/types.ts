
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed';
export type LeadSource = 'web_form' | 'whatsapp' | 'itinerary_gen';
export type TransportClass = 'economy' | 'business' | 'private';

export interface Lead {
  id?: string;
  name: string;
  email?: string;
  phone: string;
  destination?: string;
  travelDate?: string;
  message: string;
  offerRef?: string;
  source: LeadSource;
  status: LeadStatus;
  createdAt: any;
}

export interface ProgramBlock {
  day: number;
  title: string;
  description: string;
}

export interface HotelOption {
  name: string;
  stars: number;
  type: string; // e.g., "All Inclusive Soft"
  price_double: number;
  price_child?: number;
  price_baby?: number;
  is_premium?: boolean;
}

export interface FlightPlan {
  airline: string;
  route: string;
  class: TransportClass;
}

export interface DepartureDate {
  start: string;
  end: string;
}

export interface TravelOffer {
  id?: string;
  title: string;
  country: string;
  city: string[];
  slug: string;
  duration: string;
  base_price: number;
  tags: string[];
  departure_dates: DepartureDate[];
  highlights: string[];
  includes: string[];
  program: ProgramBlock[];
  hotels: HotelOption[];
  flights?: FlightPlan[];
  featured?: boolean;
  seats_left?: number;
  images: string[];
  createdAt: any;
}

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  coverImage: string;
  tags: string[];
  publishedAt: any;
}
