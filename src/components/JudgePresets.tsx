import { Sparkles } from "lucide-react";

interface Preset {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  prompt: string;
  badge: string;
  badgeColor: string;
}

export const JUDGE_PRESETS: Preset[] = [
  {
    id: "laundry",
    category: "Laundromat & Dry Cleaning",
    title: "Brooklyn Eco Laundromat (Ken Li)",
    subtitle: "20 lbs wash-and-fold + 1 wool coat, doorstep pickup tonight, budget $40",
    prompt: "I need 20 lbs of wash-and-fold laundry plus 1 wool coat dry cleaned. Need doorstep pickup at 8th Ave Sunset Park tonight within 2 hours. My budget is $40.",
    badge: "Scenario 1 · Brooklyn Laundry",
    badgeColor: "bg-blue-500/10 text-blue-700 border-blue-200",
  },
  {
    id: "cake",
    category: "Artisan Bakery",
    title: "Flushing Birthday Cake",
    subtitle: "Low-sugar matcha cake to Fowler Ave tomorrow 3 PM, budget $50",
    prompt: "I need to order an 8-inch low-sugar matcha birthday cake for my friend at Flushing Fowler Ave tomorrow by 3:00 PM. My budget is $50.",
    badge: "Scenario 2 · Budget Match",
    badgeColor: "bg-pink-500/10 text-pink-700 border-pink-200",
  },
  {
    id: "bento",
    category: "Organic Catering",
    title: "Chinatown Corporate Bento",
    subtitle: "12 custom executive lunch boxes with 4 vegan meals, budget $190",
    prompt: "We need 12 executive bento lunch boxes with 4 vegetarian options delivered to our Chinatown office tomorrow by 12:30 PM. Budget is $190.",
    badge: "Scenario 3 · Bulk Custom",
    badgeColor: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  },
];

export function JudgePresets({
  onSelect,
  disabled,
}: {
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Sparkles className="size-3.5" />
          </span>
          <h3 className="text-xs font-black tracking-wider uppercase text-slate-500">
            Judges 1-Click Test Scenarios (Instant Agentic Commerce Demos)
          </h3>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">Click any scenario to auto-run</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {JUDGE_PRESETS.map((p) => (
          <button
            key={p.id}
            disabled={disabled}
            onClick={() => onSelect(p.prompt)}
            className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/60 p-3 text-left transition hover:border-sky-400 hover:bg-sky-50/40 hover:shadow-xs disabled:opacity-50"
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{p.category}</span>
                <span className={"rounded-md border px-1.5 py-0.2 text-[10px] font-bold " + p.badgeColor}>
                  {p.badge}
                </span>
              </div>
              <h4 className="mt-1 text-sm font-bold text-slate-900 group-hover:text-sky-700 transition">
                {p.title}
              </h4>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                {p.subtitle}
              </p>
            </div>
            <div className="mt-3 flex items-center justify-end">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-600 group-hover:underline">
                Run Scenario →
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
