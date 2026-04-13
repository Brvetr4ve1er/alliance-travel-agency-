/**
 * @fileOverview Single Source of Truth for the Egypt 2026 Tour Package.
 * All pricing, durations, and hotel data are managed here to ensure consistency across the app.
 */

export const TRIP_CONFIG = {
  id: "egypt-2026",
  name: "Égypte 2026",
  tagline: "Les Pyramides & la Mer Rouge",
  duration: {
    days: 10,
    nights: 8,
    label: "10 Jours / 8 Nuits",
    labelAr: "10 أيام / 8 ليالٍ"
  },
  basePrice: "180 000 DA",
  visaFee: "25 USD",
  departureDates: [
    { label: "09 Avril au 18 Avril 2026", return: "18 Avril" },
    { label: "23 Avril au 02 Mai 2026", return: "02 Mai" },
    { label: "07 Mai au 16 Mai 2026", return: "16 Mai" },
    { label: "04 Juin au 13 Juin 2026", return: "13 Juin" },
    { label: "18 Juin au 27 Juin 2026", return: "27 Juin" },
  ],
  sharmNights: 6,
  cairoNights: 2,
  mainWhatsApp: "0561616267",
  counselors: [
    "0561616266",
    "0561616267",
    "0561616268",
    "0561616269"
  ],
  hotels: [
    { 
      id: "verginia",
      name: "Verginia Sharm Resort & Aqua Park", 
      stars: 4, 
      type: "Resort & Aqua Park", 
      price: "180 000 DA", 
      imageId: "hotel-1",
      pricingGrid: {
        triple: "178 000 DA",
        double: "180 000 DA",
        single: "225 000 DA",
        child1: "115 000 DA",
        child2: "145 000 DA",
        baby: "25 000 DA"
      },
      amenities: ["Free Shuttle", "Private Beach", "Aqua Park", "Spa & Wellness", "WiFi"],
      highlights: ["Cascade Pool", "Kid's Club", "Evening Shows"]
    },
    { 
      id: "tivoli",
      name: "Tivoli Aqua Park", 
      stars: 4, 
      type: "Aqua Park", 
      price: "185 000 DA", 
      imageId: "hotel-2",
      pricingGrid: {
        triple: "182 000 DA",
        double: "185 000 DA",
        single: "230 000 DA",
        child1: "115 000 DA",
        child2: "145 000 DA",
        baby: "25 000 DA"
      },
      amenities: ["Aqua Park", "Large Pools", "Restaurants", "Bar", "Animation"],
      highlights: ["Multiple Slides", "Central Location", "Family Friendly"]
    },
    { 
      id: "rehana-aqua",
      name: "Rehana Aqua Park", 
      stars: 4, 
      type: "Aqua Park", 
      price: "202 000 DA", 
      imageId: "hotel-3",
      pricingGrid: {
        triple: "198 000 DA",
        double: "202 000 DA",
        single: "255 000 DA",
        child1: "115 000 DA",
        child2: "155 000 DA",
        baby: "25 000 DA"
      },
      amenities: ["Spa", "Buffet Restaurant", "Aqua Park", "Tennis Courts"],
      highlights: ["Night Life", "Professional Service", "Spacious Rooms"]
    },
    { 
      id: "rehana-royal",
      name: "Rehana Royal Beach & Aqua Park", 
      stars: 5, 
      type: "Sea View", 
      price: "227 000 DA", 
      premium: true, 
      imageId: "hotel-4",
      pricingGrid: {
        triple: "222 000 DA",
        double: "227 000 DA",
        single: "290 000 DA",
        child1: "115 000 DA",
        child2: "175 000 DA",
        baby: "25 000 DA"
      },
      amenities: ["Beach Front", "Luxury Spa", "Gourmet Dining", "VIP Lounge"],
      highlights: ["Sunset Views", "Private Pier", "Elite Services"]
    },
    { 
      id: "charmillion",
      name: "Charmillion Garden & Aqua Park", 
      stars: 5, 
      type: "Luxury Aqua Park", 
      price: "245 000 DA", 
      premium: true, 
      imageId: "hotel-5",
      pricingGrid: {
        triple: "240 000 DA",
        double: "245 000 DA",
        single: "320 000 DA",
        child1: "115 000 DA",
        child2: "185 000 DA",
        baby: "25 000 DA"
      },
      amenities: ["Mega Aqua Park", "Club Access", "International Buffet", "Modern Gym"],
      highlights: ["Wave Pool", "24/7 Service", "Luxury Suites"]
    },
    { 
      id: "cleopatra",
      name: "Cleopatra Luxury Resort", 
      stars: 5, 
      type: "Luxury Complex", 
      price: "250 000 DA", 
      premium: true, 
      imageId: "hotel-6",
      pricingGrid: {
        triple: "245 000 DA",
        double: "250 000 DA",
        single: "330 000 DA",
        child1: "115 000 DA",
        child2: "190 000 DA",
        baby: "25 000 DA"
      },
      amenities: ["Infinity Pool", "Private Concierge", "Diving Center", "Organic Food"],
      highlights: ["Panoramic Views", "Fine Dining", "Tranquil Ambiance"]
    },
    { 
      id: "pickalbatros",
      name: "Pickalbatros Laguna Vista / Royal Moderna", 
      stars: 5, 
      type: "Prestige Chain", 
      price: "265 000 DA", 
      premium: true, 
      imageId: "hotel-7",
      pricingGrid: {
        triple: "260 000 DA",
        double: "265 000 DA",
        single: "360 000 DA",
        child1: "115 000 DA",
        child2: "205 000 DA",
        baby: "25 000 DA"
      },
      amenities: ["Sandy Lagoon", "Premium Bedding", "Yoga Studio", "Live Cooking"],
      highlights: ["Lagoon Beach", "Award Winning Spa", "Best for Couples"]
    },
  ],
  inclusions: [
    "Vols internationaux Constantine-Istanbul (Turkish Airlines)",
    "Vols Istanbul-Sharm El Sheikh (Transit)",
    "6 nuits à Sharm en All Inclusive Soft",
    "2 nuits au Caire avec petit-déjeuner",
    "Toutes les excursions mentionnées au programme",
    "Transferts en bus climatisé",
    "Accompagnateur Alliance Travel dédié",
    "Lettre de garantie pour le visa",
  ],
  exclusions: [
    "Frais de visa (25 USD à payer sur place)",
    "Assurance voyage individuelle",
    "Dépenses personnelles et pourboires",
    "Entrée au Grand Egyptian Museum (Optionnel)",
  ]
};
