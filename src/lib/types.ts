export interface MicroShop {
  id: string;
  name: string;
  ownerName: string;
  category: "bakery" | "services" | "dining" | "craft";
  area: string;
  avatar: string;
  rating: number;
  ordersCompleted: number;
  paypalEmail: string;
  agentRules: {
    baseDeliveryFee: number;
    freeDeliveryThreshold: number;
    maxDeliveryMiles: number;
    minAdvanceHours: number;
    negotiationFlexibility: number; // 0 to 0.15 (15% discount room)
    dietaryOptions: string[];
    specialties: string[];
  };
  sampleItems: {
    id: string;
    name: string;
    basePrice: number;
    description: string;
  }[];
}

export type AgentStepStatus = "pending" | "running" | "completed" | "failed";

export interface AgentStep {
  id: string;
  title: string;
  description: string;
  status: AgentStepStatus;
  timestamp: string;
  details?: Record<string, unknown>;
}

export interface NegotiationResult {
  shop: MicroShop;
  matchedItemName: string;
  customization: string;
  originalPrice: number;
  agreedPrice: number;
  deliveryFee: number;
  totalAmount: number;
  deliveryTime: string;
  deliveryAddress: string;
  negotiationLog: {
    role: "buyer_agent" | "merchant_agent" | "system";
    message: string;
    timestamp: string;
  }[];
}

export interface PayPalOrderResponse {
  id: string;
  status: "CREATED" | "SAVED" | "APPROVED" | "VOIDED" | "COMPLETED" | "PAYER_ACTION_REQUIRED";
  intent: "CAPTURE";
  purchase_units: {
    reference_id: string;
    amount: {
      currency_code: string;
      value: string;
    };
    description?: string;
  }[];
  create_time: string;
  links?: {
    href: string;
    rel: string;
    method: string;
  }[];
}
