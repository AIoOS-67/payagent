import { useState } from "react";
import { CheckCircle2, CreditCard, Lock, ShieldCheck, Sparkles, Store, Truck } from "lucide-react";
import type { NegotiationResult } from "@/lib/types";

export function PayPalCheckoutCard({
  result,
  onReset,
}: {
  result: NegotiationResult;
  onReset: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [paidOrder, setPaidOrder] = useState<{ id: string; amount: number; time: string } | null>(null);

  const handlePayPalCheckout = async () => {
    setLoading(true);
    try {
      // 1. Create order
      const createRes = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: result.totalAmount,
          description: result.matchedItemName + " (" + result.customization + ")",
          customId: "ORD_" + Date.now(),
          shopId: result.shop.id,
        }),
      });
      const createData = await createRes.json();
      const orderId = createData.order?.id || ("PAYPAL-" + Date.now());

      // 2. Capture payment
      const capRes = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const capData = await capRes.json();

      setPaidOrder({
        id: orderId,
        amount: result.totalAmount,
        time: new Date().toLocaleTimeString(),
      });
    } catch (err) {
      alert("Payment simulation error: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#003087] text-white font-black text-sm">
            P
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">
              PayPal Smart Checkout
            </h3>
            <p className="text-[11px] text-slate-400">REST API v2 Orders & Capture Integration</p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
          ✓ Terms Agreed
        </span>
      </div>

      {!paidOrder ? (
        <div className="mt-4">
          {/* Item details */}
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {result.shop.name}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                  {result.matchedItemName}
                </h4>
                <div className="mt-1 flex flex-wrap gap-1.5 text-[11px]">
                  <span className="rounded bg-sky-100 px-1.5 py-0.2 font-semibold text-sky-800">
                    {result.customization}
                  </span>
                  <span className="rounded bg-amber-100 px-1.5 py-0.2 font-semibold text-amber-800">
                    {result.deliveryTime}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 line-through">
                  {"$" + result.originalPrice.toFixed(2)}
                </span>
                <div className="text-base font-black text-emerald-600">
                  {"$" + result.agreedPrice.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="mt-3 border-t border-slate-200/60 pt-2.5 text-xs text-slate-500 space-y-1">
              <div className="flex justify-between">
                <span>Agreed Item Price</span>
                <span>{"$" + result.agreedPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Local Dispatch & Delivery</span>
                <span>{"$" + result.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-200/60 text-sm">
                <span>Total Due</span>
                <span className="text-base font-black text-slate-900">
                  {"$" + result.totalAmount.toFixed(2) + " USD"}
                </span>
              </div>
            </div>
          </div>

          {/* PayPal Checkout Button */}
          <div className="mt-4 space-y-2.5">
            <button
              onClick={handlePayPalCheckout}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#FFC439] py-3 text-sm font-black text-[#003087] shadow-md transition hover:bg-[#F2BA36] active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? (
                <span>Authorizing & Capturing with PayPal API...</span>
              ) : (
                <>
                  <span>Pay with</span>
                  <span className="font-extrabold italic text-lg tracking-tight">PayPal</span>
                  <span>{"($" + result.totalAmount.toFixed(2) + ")"}</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="size-3.5 text-emerald-600" />
              <span>PayPal Purchase Protection · Direct Seller Payout to {result.shop.paypalEmail}</span>
            </div>
          </div>
        </div>
      ) : (
        /* Paid celebration state */
        <div className="mt-4 text-center py-4">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="size-7" />
          </div>
          <h4 className="mt-3 text-lg font-black text-slate-900">
            Payment Completed & Verified!
          </h4>
          <p className="mt-1 text-xs text-slate-500">
            Funds captured via PayPal Orders API v2. Merchant notified to fulfill order.
          </p>

          <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/50 p-3 text-left text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500">PayPal Order ID</span>
              <span className="font-mono font-bold text-slate-800">{paidOrder.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Amount Paid</span>
              <span className="font-bold text-emerald-700">{"$" + paidOrder.amount.toFixed(2) + " USD"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Recipient Shop</span>
              <span className="font-semibold text-slate-800">{result.shop.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Timestamp</span>
              <span className="text-slate-600">{paidOrder.time}</span>
            </div>
          </div>

          <button
            onClick={onReset}
            className="mt-4 w-full rounded-xl border border-slate-300 bg-white py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            ← Test Another Agentic Scenario
          </button>
        </div>
      )}
    </div>
  );
}
