import { CheckCircle2, Clock, Loader2, MessageSquare, ShieldCheck, Sparkles, Store } from "lucide-react";
import type { AgentStep, NegotiationResult } from "@/lib/types";

export function AgentThoughtChain({
  steps,
  result,
  isRunning,
}: {
  steps: AgentStep[];
  result: NegotiationResult | null;
  isRunning: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
            <Sparkles className="size-4" />
          </span>
          <h3 className="text-base font-black text-slate-900">
            Autonomous Commerce Agent Execution Graph
          </h3>
        </div>
        {isRunning && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-bold text-sky-700">
            <Loader2 className="size-3.5 animate-spin" />
            Agent Reasoning...
          </span>
        )}
      </div>

      {/* Steps List */}
      <div className="mt-4 space-y-3">
        {steps.map((s) => {
          const isDone = s.status === "completed";
          const isRunningStep = s.status === "running";

          return (
            <div
              key={s.id}
              className={"flex items-start gap-3 rounded-xl border p-3 transition " + (
                isRunningStep
                  ? "border-sky-300 bg-sky-50/50 shadow-xs"
                  : isDone
                  ? "border-emerald-100 bg-emerald-50/20"
                  : "border-slate-100 bg-slate-50/40 opacity-60"
              )}
            >
              <div className="mt-0.5">
                {isDone ? (
                  <CheckCircle2 className="size-4 text-emerald-600" />
                ) : isRunningStep ? (
                  <Loader2 className="size-4 animate-spin text-sky-600" />
                ) : (
                  <Clock className="size-4 text-slate-400" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={"text-xs font-bold " + (isRunningStep ? "text-sky-900" : isDone ? "text-emerald-950" : "text-slate-600")}>
                    {s.title}
                  </h4>
                  <span className="text-[10px] text-slate-400">{s.timestamp}</span>
                </div>
                <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Autonomous Dialogue Log */}
      {result && result.negotiationLog.length > 0 && (
        <div className="mt-5 rounded-xl border border-indigo-100 bg-indigo-50/30 p-4">
          <div className="mb-2.5 flex items-center gap-1.5 text-xs font-bold text-indigo-900">
            <MessageSquare className="size-3.5 text-indigo-600" />
            <span>Agent-to-Agent Autonomous Negotiation Transcript</span>
          </div>

          <div className="space-y-2.5 text-xs">
            {result.negotiationLog.map((msg, i) => {
              const isBuyer = msg.role === "buyer_agent";
              return (
                <div key={i} className="flex gap-2">
                  <span
                    className={"shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-black uppercase " + (
                      isBuyer
                        ? "bg-blue-600 text-white"
                        : "bg-emerald-600 text-white"
                    )}
                  >
                    {isBuyer ? "Buyer AI" : "Merchant AI"}
                  </span>
                  <div className="flex-1 text-slate-700 leading-relaxed">
                    <span>{msg.message}</span>
                    <span className="ml-1 text-[10px] text-slate-400">({msg.timestamp})</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
