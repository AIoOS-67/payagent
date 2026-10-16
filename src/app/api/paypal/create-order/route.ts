import { NextResponse } from "next/server";
import { createPayPalOrder } from "@/lib/paypal/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const amount = parseFloat(body.amount);
    const description = body.description || "PayAgent Commerce Order";
    const customId = body.customId || ("PAY-" + Date.now());

    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json({ ok: false, error: "Valid amount is required" }, { status: 400 });
    }

    const order = await createPayPalOrder({
      amount,
      currency: "USD",
      description,
      customId,
    });

    return NextResponse.json({ ok: true, order });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
