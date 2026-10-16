import Link from "next/link";
import { Bot, CheckCircle2, ExternalLink, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#003087] via-[#0070BA] to-sky-400 text-white shadow-md shadow-sky-500/20">
              <Bot className="size-5" />
            </span>
            <span className="text-xl font-black tracking-tight">
              Pay<span className="text-sky-400">Agent</span>
            </span>
          </Link>
          <span className="hidden items-center gap-1 rounded-full border border-sky-400/30 bg-sky-950/60 px-2.5 py-0.5 text-[11px] font-semibold text-sky-300 sm:inline-flex">
            <Sparkles className="size-3 text-sky-400" />
            PayPal AI Hackathon 2026
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="hidden items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-1 text-emerald-400 md:flex">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>PayPal REST API v2 Live</span>
          </div>

          <a
            href="https://paypalaihackathon.devpost.com/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 font-medium text-slate-200 transition hover:bg-slate-700 hover:text-white"
          >
            <span>Devpost</span>
            <ExternalLink className="size-3" />
          </a>
        </div>
      </div>
    </header>
  );
}
