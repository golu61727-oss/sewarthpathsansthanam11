import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature") ?? "";
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET!;

    const hmac = crypto.createHmac("sha256", webhookSecret);
    hmac.update(body);
    const digest = hmac.digest("hex");

    if (digest !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body) as {
      event: string;
      payload: {
        payment?: { entity: { id: string; order_id: string; status: string } };
      };
    };

    const supabase = await createServiceClient();

    await supabase.from("payment_events").insert({
      event_type: event.event,
      razorpay_payment_id: event.payload.payment?.entity.id ?? null,
      razorpay_order_id: event.payload.payment?.entity.order_id ?? null,
      raw_payload: event,
    });

    if (event.event === "payment.captured") {
      const paymentId = event.payload.payment?.entity.id;
      const orderId = event.payload.payment?.entity.order_id;

      if (paymentId && orderId) {
        await Promise.all([
          supabase
            .from("donations")
            .update({ status: "completed", razorpay_payment_id: paymentId, paid_at: new Date().toISOString() })
            .eq("razorpay_order_id", orderId)
            .eq("status", "pending"),
          supabase
            .from("memberships")
            .update({ status: "active", razorpay_payment_id: paymentId, activated_at: new Date().toISOString() })
            .eq("razorpay_order_id", orderId)
            .eq("status", "pending"),
        ]);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("webhook error:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
