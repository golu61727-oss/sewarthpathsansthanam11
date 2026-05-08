import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, donorName, donorEmail, donorPhone, purpose, pan, isAnonymous, type } = body;

    if (!amount || amount < 1) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    const supabase = await createServiceClient();
    let donationId: string | null = null;

    if (type === "donation") {
      const { data } = await supabase
        .from("donations")
        .insert({
          donor_name: isAnonymous ? "Anonymous" : donorName,
          donor_email: donorEmail,
          donor_phone: donorPhone,
          amount,
          purpose: purpose || "general",
          pan: pan || null,
          is_anonymous: isAnonymous || false,
          razorpay_order_id: order.id,
          status: "pending",
        })
        .select("id")
        .single();
      donationId = data?.id ?? null;
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      keyId: process.env.RAZORPAY_KEY_ID,
      donationId,
    });
  } catch (err) {
    console.error("create-order error:", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
