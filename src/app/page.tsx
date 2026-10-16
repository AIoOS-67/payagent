"use client";

import { useState } from "react";
import { Bot, ChevronRight, MessageSquare, Play, Send, Sparkles, Terminal } from "lucide-react";
import { Header } from "@/components/Header";
import { JudgePresets } from "@/components/JudgePresets";
import { AgentThoughtChain } from "@/components/AgentThoughtChain";
import { PayPalCheckoutCard } from "@/components/PayPalCheckoutCard";
import { MerchantStorefront } from "@/components/MerchantStorefront";
import type { AgentStep, NegotiationResult } from "@/lib/types";

const INITIAL_STEPS: AgentStep[] = [
  { id: "step_1_intent", title: "1. Buyer Intent & Constraint Decomposition", description: "Waiting for buyer request...", status: "pending", timestamp: "--:--" },
  { id: "step_2_discovery", title: "2. Autonomous Micro-Shop Discovery", description: "Matching local merchant registry by radius & specialty...", status: "pending", timestamp: "--:--" },
  { id: "step_3_negotiation", title: "3. Agentic Commerce Negotiation Protocol", description: "Buyer Agent negotiating quote & SLA with Merchant Agent...", status: "pending", timestamp: "--:--" },
  { id: "step_4_settlement", title: "4. PayPal Smart Settlement Ready", description: "Generating PayPal Orders API v2 payload with seller protection...", status: "pending", timestamp: "--:--" },
];

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [steps, setSteps] = useState<AgentStep[]>(INITIAL_STEPS);
  const [result, setResult] = useState<NegotiationResult | null>(null);

  const runNegotiation = async (inputPrompt?: string) => {
    const q = (inputPrompt || prompt).trim();
    if (!q || isRunning) return;

    if (inputPrompt) setPrompt(inputPrompt);
    setIsRunning(true);
    setResult(null);

    // Reset steps
    setSteps(INITIAL_STEPS);

    try {
      const res = await fetch("/api/agent/negotiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: q }),
      });

      const data = await res.json();
      if (data.ok && data.result) {
        // Animate progression for judge visual clarity
        const now = () => new Date().toLocaleTimeString();

        setSteps((prev) =>
          prev.map((s, idx) =>
            idx === 0
              ? { ...s, status: "completed", timestamp: now(), description: "Targeting [" + data.result.shop.category.toUpperCase() + "] with custom SLA constraints." }
              : idx === 1
              ? { ...s, status: "completed", timestamp: now(), description: "Discovered " + data.result.shop.name + " (" + data.result.shop.rating + "★, " + data.result.shop.ordersCompleted + " orders)." }
              : idx === 2
              ? { ...s, status: "completed", timestamp: now(), description: "Agreed: $" + data.result.agreedPrice.toFixed(2) + " item + $" + data.result.deliveryFee.toFixed(2) + " delivery." }
              : { ...s, status: "completed", timestamp: now(), description: "PayPal Orders v2 payload generated with seller protection." }
          )
        );

        setResult(data.result);
      } else {
        alert("Agent negotiation error: " + (data.error || "Unknown"));
      }
    } catch (err) {
      alert("Network error: " + (err as Error).message);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setPrompt("");
    setResult(null);
    setSteps(INITIAL_STEPS);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-[#001C64] p-6 sm:p-8 text-white shadow-xl">
          <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 -bottom-16 size-72 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/40 bg-sky-500/15 px-3 py-1 text-xs font-bold text-sky-300">
                <Sparkles className="size-3.5 text-sky-400" />
                PayPal AI Hackathon 2026 Submission
              </span>
              <span className="rounded-full bg-amber-400/20 border border-amber-300/30 px-2.5 py-0.5 text-xs font-bold text-amber-300">
                Best Use of Agentic Commerce
              </span>
            </div>

            <h1 className="mt-3 text-2xl font-black sm:text-4xl tracking-tight leading-tight">
              PayAgent: Autonomous Multi-Agent Commerce & Instant PayPal Settlement
            </h1>

            <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Empowering local micro-shops (home bakers, custom artisans, emergency handymen) with autonomous AI digital twins. Buyer agents negotiate custom quotes, verify ingredients, and finalize orders, converting natural language directly into PayPal Orders API v2 settlement in seconds.
            </p>
          </div>
        </div>

        {/* Judge 1-Click Test Presets */}
        <div className="mt-6">
          <JudgePresets onSelect={(p) => runNegotiation(p)} disabled={isRunning} />
        </div>

        {/* Natural Language Prompt Input */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <MessageSquare className="size-3.5 text-sky-600" />
              <span>Or Enter Any Custom Buyer Prompt (English or Chinese):</span>
            </label>
            <span className="text-[11px] text-slate-400">e.g., custom cake, plumbing repair, bento catering</span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              runNegotiation();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Order a low-sugar matcha birthday cake in Flushing tomorrow by 3 PM, budget $50..."
              className="flex-1 rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition"
              disabled={isRunning}
            />
            <button
              type="submit"
              disabled={isRunning || !prompt.trim()}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#003087] to-[#0070BA] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition hover:from-[#002766] hover:to-[#005a96] disabled:opacity-50"
            >
              <Send className="size-3.5" />
              <span>Run Agent</span>
            </button>
          </form>
        </div>

        {/* Execution Graph & PayPal Checkout Grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2 items-start">
          <AgentThoughtChain steps={steps} result={result} isRunning={isRunning} />

          {result ? (
            <PayPalCheckoutCard result={result} onReset={handleReset} />
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-100/50 p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm border border-slate-200">
                <Bot className="size-6 text-slate-400" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-slate-700">
                Awaiting Agent Negotiation
              </h3>
              <p className="mt-1 text-xs text-slate-400 max-w-xs leading-relaxed">
                Click any of the 3 judge preset scenarios above or enter a prompt to watch the Buyer Agent and Merchant AI negotiate terms and generate PayPal Orders API v2 settlement.
              </p>
            </div>
          )}
        </div>

        {/* Live Merchant AI Registry Inspector */}
        <div className="mt-8">
          <MerchantStorefront selectedShopId={result?.shop.id} />
        </div>
      </main>

      <footer className="mt-12 border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">PayAgent</span>
            <span>· Built for PayPal AI Hackathon 2026</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>PayPal REST API v2</span>
            <span>·</span>
            <span>Agentic Commerce Protocol</span>
            <span>·</span>
            <span>MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
