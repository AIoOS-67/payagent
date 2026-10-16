import type { MicroShop } from "../types";

export const MOCK_SHOPS: MicroShop[] = [
  {
    id: "shop_flushing_bakery",
    name: "Flushing Sweet Art Artisan Bakery",
    ownerName: "Vivian Lin",
    category: "bakery",
    area: "Flushing, Queens, NY",
    avatar: "🎂",
    rating: 4.95,
    ordersCompleted: 1420,
    paypalEmail: "vivian.bakery.sandbox@ai168.io",
    agentRules: {
      baseDeliveryFee: 5.0,
      freeDeliveryThreshold: 60.0,
      maxDeliveryMiles: 8,
      minAdvanceHours: 4,
      negotiationFlexibility: 0.1, // Up to 10% discount for budget matches
      dietaryOptions: ["Low-Sugar", "Gluten-Free", "Vegan", "Matcha", "Dairy-Free", "Fruit Fresh"],
      specialties: ["Custom Birthday Cakes", "Matcha Crepe", "Low-Sugar Roll", "Chiffon"],
    },
    sampleItems: [
      { id: "item_b1", name: "Custom 8-Inch Low-Sugar Matcha Birthday Cake", basePrice: 52.0, description: "Japanese Uji matcha chiffon with low-sugar organic cream and fresh strawberries." },
      { id: "item_b2", name: "Mango Pomelo Sago Mousse Cake", basePrice: 48.0, description: "Fresh mango puree with coconut jelly and pomelo pulps." },
      { id: "item_b3", name: "Earl Grey Tea Basque Cheesecake", basePrice: 45.0, description: "Rich, creamy Basque cheesecake infused with Twinings Earl Grey." },
    ],
  },
  {
    id: "shop_brooklyn_plumbing",
    name: "Master Chen Sunset Park Emergency Plumbing",
    ownerName: "Master Da-Wei Chen",
    category: "services",
    area: "8th Ave Sunset Park, Brooklyn, NY",
    avatar: "🔧",
    rating: 4.98,
    ordersCompleted: 2150,
    paypalEmail: "chen.plumbing.sandbox@ai168.io",
    agentRules: {
      baseDeliveryFee: 15.0, // Emergency dispatch fee
      freeDeliveryThreshold: 200.0,
      maxDeliveryMiles: 12,
      minAdvanceHours: 1, // Rapid 1-2 hour response
      negotiationFlexibility: 0.12,
      dietaryOptions: [],
      specialties: ["Pipe Leaks", "Sink Unclogging", "Water Heater", "Gas Piping", "24/7 Rapid Dispatch"],
    },
    sampleItems: [
      { id: "item_p1", name: "Emergency Kitchen Sink Leak Diagnosis & Pipe Replacement", basePrice: 145.0, description: "Includes immediate 90-min on-site arrival, high-pressure PVC pipe replacement & 1-year guarantee." },
      { id: "item_p2", name: "Commercial Grease Trap Hydro-Jetting", basePrice: 280.0, description: "Heavy duty hydro jetting for commercial restaurant drains." },
      { id: "item_p3", name: "Bathroom Toilet Tank Valve & Flapper Overhaul", basePrice: 95.0, description: "Complete internal mechanism overhaul with Kohler genuine parts." },
    ],
  },
  {
    id: "shop_chinatown_bento",
    name: "Lotus Garden Handcrafted Gourmet & Bento",
    ownerName: "Chef Johnny Zhao",
    category: "dining",
    area: "Chinatown & Lower East Side, NY",
    avatar: "🍱",
    rating: 4.92,
    ordersCompleted: 3890,
    paypalEmail: "lotus.bento.sandbox@ai168.io",
    agentRules: {
      baseDeliveryFee: 8.0,
      freeDeliveryThreshold: 100.0,
      maxDeliveryMiles: 10,
      minAdvanceHours: 3,
      negotiationFlexibility: 0.15, // Up to 15% discount for bulk orders
      dietaryOptions: ["Vegetarian", "Vegan", "Halal Friendly", "Low-Sodium", "Keto"],
      specialties: ["Office Meeting Bento", "Organic Grain Bowls", "Dim Sum Platters"],
    },
    sampleItems: [
      { id: "item_d1", name: "Executive Meeting Bento Set (10-15 Pax Mix)", basePrice: 185.0, description: "Includes grilled salmon, tender braised beef, organic tofu, and seasonal greens with Japanese rice." },
      { id: "item_d2", name: "Organic Buddha Delight Vegan Bento Platter", basePrice: 150.0, description: "Assorted wild mushrooms, ginkgo nuts, lotus roots, and edamame salad." },
      { id: "item_d3", name: "Artisan Dim Sum Assortment Box (36 pcs)", basePrice: 88.0, description: "Freshly steamed crystal shrimp har gow, siu mai, and pan-fried pork buns." },
    ],
  },
];
