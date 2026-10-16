import { NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/paypal/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orderId = body.orderId;

    if (!orderId) {
      return NextResponse.json({ ok: false, error: "orderId is required" }, { status: 400 });
    }

    const capture = await capturePayPalOrder(orderId);
    return NextResponse.json({ ok: true, capture });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
