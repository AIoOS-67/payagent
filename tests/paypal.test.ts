import { test } from "node:test";
import assert from "node:assert/strict";
import { createPayPalOrder, capturePayPalOrder } from "../src/lib/paypal/client";

test("PayPal REST API v2: Order Creation & Schema Verification", async () => {
  const order = await createPayPalOrder({
    amount: 51.5,
    currency: "USD",
    description: "Custom Low-Sugar Matcha Cake Order",
    customId: "ORD_TEST_12345",
  });

  assert.ok(order.id, "Must have valid PayPal Order ID");
  assert.equal(order.status, "CREATED");
  assert.equal(order.intent, "CAPTURE");
  assert.equal(order.purchase_units[0].amount.value, "51.50");
  assert.equal(order.purchase_units[0].amount.currency_code, "USD");
  assert.equal(order.purchase_units[0].reference_id, "ORD_TEST_12345");
});

test("PayPal REST API v2: Order Capture Verification", async () => {
  const capture = await capturePayPalOrder("PAYPAL-AGENT-TEST-9988");
  assert.equal(capture.success, true);
  assert.equal(capture.status, "COMPLETED");
  assert.equal(capture.id, "PAYPAL-AGENT-TEST-9988");
});
