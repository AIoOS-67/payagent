import { CheckCircle2, ShieldCheck, Sparkles, Store, Utensils, Wrench } from "lucide-react";
import { MOCK_SHOPS } from "@/lib/mock-shops/database";
import type { MicroShop } from "@/lib/types";

export function MerchantStorefront({ selectedShopId }: { selectedShopId?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <Store className="size-4" />
          </span>
          <div>
            <h3 className="text-base font-black text-slate-900">
              Active Micro-Shop Digital Twins (Multi-Agent Registry)
            </h3>
            <p className="text-[11px] text-slate-400">Autonomous Shop AI rules configured for zero-code negotiation</p>
          </div>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">
          3 Live Agents
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {MOCK_SHOPS.map((shop) => {
          const isSelected = shop.id === selectedShopId;
          return (
            <div
              key={shop.id}
              className={"rounded-xl border p-3.5 transition " + (
                isSelected
                  ? "border-sky-500 bg-sky-50/40 shadow-xs ring-1 ring-sky-400"
                  : "border-slate-100 bg-slate-50/50 hover:border-slate-200"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">{shop.avatar}</span>
                <span className="rounded-md bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 text-[10px] font-bold text-emerald-700">
                  PayPal Active
                </span>
              </div>

              <h4 className="mt-2 text-xs font-bold text-slate-900">
                {shop.name}
              </h4>
              <p className="text-[11px] text-slate-500">
                Owner: {shop.ownerName} · {shop.area}
              </p>

              <div className="mt-2.5 rounded-lg border border-slate-200/60 bg-white p-2 text-[10px] space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <span>Negotiation Flexibility</span>
                  <span className="font-bold text-emerald-600">
                    {"Up to " + Math.round(shop.agentRules.negotiationFlexibility * 100) + "%"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Base Delivery</span>
                  <span>{"$" + shop.agentRules.baseDeliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rating / Completed</span>
                  <span>{shop.rating}★ ({shop.ordersCompleted})</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
