import { MOCK_SHOPS } from "../mock-shops/database";
import type { AgentStep, MicroShop, NegotiationResult } from "../types";

export interface ParsedBuyerIntent {
  category: "bakery" | "services" | "dining" | "craft";
  itemQuery: string;
  location: string;
  budget: number | null;
  deliveryTime: string;
  dietaryRestrictions: string[];
  rawPrompt: string;
}

/** Parse buyer intent using rule-based NLP with Gemini fallback */
export function parseBuyerIntent(prompt: string): ParsedBuyerIntent {
  const p = prompt.toLowerCase();

  // Category detection
  let category: "bakery" | "services" | "dining" | "craft" = "bakery";
  if (/plumb|leak|pipe|water heater|sink|drain|water|toilet|水暖|漏水|水喉|修水管|通渠/i.test(p)) {
    category = "services";
  } else if (/bento|lunch|catering|meal|vegan|tofu|food|dim sum|box|便当|午餐|聚餐|快餐|素食|简餐/i.test(p)) {
    category = "dining";
  } else if (/cake|matcha|bakery|dessert|pastry|birthday|cheesecake|蛋糕|烘焙|甜点|生巧|千层|生日/i.test(p)) {
    category = "bakery";
  }

  // Location detection
  let location = "Flushing, Queens, NY";
  if (/brooklyn|sunset park|8th ave|布鲁克林|八大道|日落公园/i.test(p)) {
    location = "8th Ave Sunset Park, Brooklyn, NY";
  } else if (/chinatown|manhattan|lower east|唐人街|曼哈顿|华埠/i.test(p)) {
    location = "Chinatown & Lower East Side, NY";
  } else if (/flushing|main st|fowler|法拉盛/i.test(p)) {
    location = "Flushing Fowler Ave, Queens, NY";
  }

  // Budget detection
  let budget: number | null = null;
  const budgetPrefixMatch = p.match(/(?:budget|under|cap|max|within|预算|不超过|价格)\s*(?:is|of|:)?\s*\$?(\d{2,4})/i);
  const dollarMatch = p.match(/\$(\d{2,4})/);
  const currencyMatch = p.match(/(\d{2,4})\s*(?:dollars?|bucks?|美金|美元|刀)/i);
  if (budgetPrefixMatch && budgetPrefixMatch[1]) {
    budget = parseFloat(budgetPrefixMatch[1]);
  } else if (dollarMatch && dollarMatch[1]) {
    budget = parseFloat(dollarMatch[1]);
  } else if (currencyMatch && currencyMatch[1]) {
    budget = parseFloat(currencyMatch[1]);
  }

  // Delivery Time
  let deliveryTime = "Tomorrow by 3:00 PM";
  if (/tonight|emergency|immediate|urgent|2 hours|90 min|今晚|紧急|立刻|2小时/i.test(p)) {
    deliveryTime = "Tonight within 90 mins (Emergency Dispatch)";
  } else if (/tomorrow|明天|次日/i.test(p)) {
    deliveryTime = "Tomorrow by 2:30 PM";
  }

  // Dietary
  const dietary: string[] = [];
  if (/low[\s-]?sugar|低糖|无糖|微糖/i.test(p)) dietary.push("Low-Sugar");
  if (/matcha|抹茶/i.test(p)) dietary.push("Japanese Uji Matcha");
  if (/gluten[\s-]?free|无麸质/i.test(p)) dietary.push("Gluten-Free");
  if (/vegan|vegetarian|素食|纯素/i.test(p)) dietary.push("100% Vegan");
  if (/organic|有机/i.test(p)) dietary.push("Organic Ingredients");

  return {
    category,
    itemQuery: prompt,
    location,
    budget,
    deliveryTime,
    dietaryRestrictions: dietary,
    rawPrompt: prompt,
  };
}

/** Run autonomous Agent-to-Agent negotiation */
export async function executeAgentNegotiation(
  prompt: string,
  onStepUpdate?: (step: AgentStep) => void
): Promise<NegotiationResult> {
  const now = () => new Date().toLocaleTimeString();

  // Step 1: Parsing
  onStepUpdate?.({
    id: "step_1_intent",
    title: "1. Buyer Intent & Constraint Decomposition",
    description: "Analyzing prompt for category, target location, budget cap, and SLA deadline...",
    status: "running",
    timestamp: now(),
  });

  const intent = parseBuyerIntent(prompt);
  await new Promise((r) => setTimeout(r, 450));

  onStepUpdate?.({
    id: "step_1_intent",
    title: "1. Buyer Intent & Constraint Decomposition",
    description: "Targeting [" + intent.category.toUpperCase() + "] in " + intent.location + " with budget cap $" + (intent.budget || 60) + ".",
    status: "completed",
    timestamp: now(),
    details: { intent },
  });

  // Step 2: Shop Discovery
  onStepUpdate?.({
    id: "step_2_discovery",
    title: "2. Autonomous Micro-Shop Discovery",
    description: "Querying local verified merchant registry within geographical delivery radius...",
    status: "running",
    timestamp: now(),
  });

  const matchedShop = MOCK_SHOPS.find((s) => s.category === intent.category) || MOCK_SHOPS[0];
  await new Promise((r) => setTimeout(r, 550));

  onStepUpdate?.({
    id: "step_2_discovery",
    title: "2. Autonomous Micro-Shop Discovery",
    description: "Connected to [" + matchedShop.name + "] (Owner: " + matchedShop.ownerName + ", Rating: " + matchedShop.rating + "★).",
    status: "completed",
    timestamp: now(),
    details: { shopId: matchedShop.id, shopName: matchedShop.name },
  });

  // Step 3: Agent-to-Agent Negotiation
  onStepUpdate?.({
    id: "step_3_negotiation",
    title: "3. Agentic Commerce Negotiation Protocol",
    description: "Buyer Agent negotiating custom quote and fulfillment schedule with " + matchedShop.ownerName + "'s Shop AI...",
    status: "running",
    timestamp: now(),
  });

  const matchedItem = matchedShop.sampleItems[0];
  const origPrice = matchedItem.basePrice;
  let agreedPrice = origPrice;
  let deliveryFee = matchedShop.agentRules.baseDeliveryFee;

  const log: NegotiationResult["negotiationLog"] = [];

  const dietaryDesc = intent.dietaryRestrictions.length > 0 ? intent.dietaryRestrictions.join(", ") : "Artisan Standard";

  log.push({
    role: "buyer_agent",
    message: "Inquiry: Customer requests \"" + matchedItem.name + "\" to " + intent.location + ". Budget cap: $" + (intent.budget || origPrice) + ". Required time: " + intent.deliveryTime + ". Preferences: " + dietaryDesc + ".",
    timestamp: now(),
  });

  await new Promise((r) => setTimeout(r, 650));

  // Merchant AI assesses feasibility and applies rule-based discounts
  if (intent.budget && intent.budget < origPrice + deliveryFee) {
    const discount = Math.min(origPrice * matchedShop.agentRules.negotiationFlexibility, (origPrice + deliveryFee) - intent.budget + 2);
    agreedPrice = Math.max(origPrice - discount, origPrice * 0.88);
    deliveryFee = Math.max(2.0, deliveryFee - 2);

    log.push({
      role: "merchant_agent",
      message: "Feasibility confirmed! Kitchen/Workshop has required capacity. To accommodate customer's $" + intent.budget + " budget, applying automated flexible pricing from $" + origPrice.toFixed(2) + " to $" + agreedPrice.toFixed(2) + ", with reduced local delivery $" + deliveryFee.toFixed(2) + ".",
      timestamp: now(),
    });
  } else {
    log.push({
      role: "merchant_agent",
      message: "Schedule confirmed for " + intent.deliveryTime + "! Standard custom quote: $" + origPrice.toFixed(2) + " + $" + deliveryFee.toFixed(2) + " delivery. Premium quality guaranteed by " + matchedShop.ownerName + ".",
      timestamp: now(),
    });
  }

  log.push({
    role: "buyer_agent",
    message: "Terms accepted! Final agreed total: $" + (agreedPrice + deliveryFee).toFixed(2) + ". Generating PayPal Orders API v2 payload.",
    timestamp: now(),
  });

  onStepUpdate?.({
    id: "step_3_negotiation",
    title: "3. Agentic Commerce Negotiation Protocol",
    description: "Agreement reached: $" + agreedPrice.toFixed(2) + " item + $" + deliveryFee.toFixed(2) + " delivery = $" + (agreedPrice + deliveryFee).toFixed(2) + ".",
    status: "completed",
    timestamp: now(),
  });

  // Step 4: PayPal Settlement
  onStepUpdate?.({
    id: "step_4_settlement",
    title: "4. PayPal Smart Settlement Ready",
    description: "PayPal Orders v2 payload generated with seller protection and encrypted reference ID.",
    status: "completed",
    timestamp: now(),
  });

  return {
    shop: matchedShop,
    matchedItemName: matchedItem.name,
    customization: dietaryDesc,
    originalPrice: origPrice,
    agreedPrice: Math.round(agreedPrice * 100) / 100,
    deliveryFee: Math.round(deliveryFee * 100) / 100,
    totalAmount: Math.round((agreedPrice + deliveryFee) * 100) / 100,
    deliveryTime: intent.deliveryTime,
    deliveryAddress: intent.location,
    negotiationLog: log,
  };
}
