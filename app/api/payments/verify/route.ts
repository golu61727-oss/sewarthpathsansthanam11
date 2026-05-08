import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      donationId,
      membershipId,
    } = body;

    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = hmac.digest("hex");

    if (digest !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const supabase = await createServiceClient();

    if (donationId) {
      await supabase
        .from("donations")
        .update({
          status: "completed",
          razorpay_payment_id,
          paid_at: new Date().toISOString(),
        })
        .eq("id", donationId);
    }

    if (membershipId) {
      await supabase
        .from("memberships")
        .update({
          status: "active",
          razorpay_payment_id,
          activated_at: new Date().toISOString(),
        })
        .eq("id", membershipId);
    }

    await supabase.from("payment_events").insert({
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      event_type: "payment.authorized",
      entity_type: donationId ? "donation" : "membership",
      entity_id: donationId ?? membershipId,
      raw_payload: body,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("verify error:", err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
