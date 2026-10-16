import { test } from "node:test";
import assert from "node:assert/strict";
import { parseBuyerIntent, executeAgentNegotiation } from "../src/lib/agent/engine";
import { MOCK_SHOPS } from "../src/lib/mock-shops/database";

test("Buyer Intent Parsing: Category & Location Decomposition", () => {
  const p1 = parseBuyerIntent("I need an 8-inch low-sugar matcha birthday cake in Flushing Fowler Ave tomorrow by 3 PM, budget $50.");
  assert.equal(p1.category, "bakery");
  assert.equal(p1.location, "Flushing Fowler Ave, Queens, NY");
  assert.equal(p1.budget, 50);
  assert.ok(p1.dietaryRestrictions.includes("Low-Sugar"));
  assert.ok(p1.dietaryRestrictions.includes("Japanese Uji Matcha"));

  const p2 = parseBuyerIntent("Emergency: Kitchen pipe is leaking heavily at 8th Ave Sunset Park Brooklyn! Budget $140.");
  assert.equal(p2.category, "services");
  assert.equal(p2.location, "8th Ave Sunset Park, Brooklyn, NY");
  assert.equal(p2.budget, 140);
  assert.ok(p2.deliveryTime.includes("Emergency"));

  const p3 = parseBuyerIntent("12 executive bento lunch boxes with vegan options delivered to Chinatown, budget $190.");
  assert.equal(p3.category, "dining");
  assert.equal(p3.location, "Chinatown & Lower East Side, NY");
  assert.equal(p3.budget, 190);
  assert.ok(p3.dietaryRestrictions.includes("100% Vegan"));
});

test("Autonomous Agent Negotiation: Budget Match & Custom SLA", async () => {
  const result = await executeAgentNegotiation("Low-sugar birthday cake in Flushing, budget $50.");
  assert.equal(result.shop.category, "bakery");
  assert.ok(result.totalAmount <= 52, "Agreed total must accommodate the budget within negotiation room");
  assert.ok(result.negotiationLog.length >= 3, "Must have full Agent dialogue transcript");
  assert.equal(result.negotiationLog[0].role, "buyer_agent");
  assert.equal(result.negotiationLog[1].role, "merchant_agent");
  assert.equal(result.negotiationLog[2].role, "buyer_agent");
});
