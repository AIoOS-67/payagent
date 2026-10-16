import { NextResponse } from "next/server";
import { executeAgentNegotiation } from "@/lib/agent/engine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = (body.prompt || "").trim();

    if (!prompt) {
      return NextResponse.json({ ok: false, error: "Prompt is required" }, { status: 400 });
    }

    const result = await executeAgentNegotiation(prompt);
    return NextResponse.json({ ok: true, result });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
