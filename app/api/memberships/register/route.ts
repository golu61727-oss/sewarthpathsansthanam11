import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createServiceClient } from "@/lib/supabase/server";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, city, state, planCode, amount } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const supabase = await createServiceClient();

    // Upsert profile by email
    const { data: profile } = await supabase
      .from("profiles")
      .upsert(
        { email, full_name: name, phone: phone || null, city: city || null, state: state || null },
        { onConflict: "email" }
      )
      .select("id")
      .single();

    const profileId = profile?.id;
    const publicMemberId = `SPS-${Date.now().toString(36).toUpperCase()}`;

    let expiresAt: string | null = null;
    if (planCode === "ANNUAL_365") {
      const d = new Date();
      d.setFullYear(d.getFullYear() + 1);
      expiresAt = d.toISOString();
    } else if (planCode === "SUPPORTER_1001") {
      const d = new Date();
      d.setFullYear(d.getFullYear() + 1);
      expiresAt = d.toISOString();
    }

    if (amount === 0) {
      // Free volunteer membership — activate immediately
      const { data: membership } = await supabase
        .from("memberships")
        .insert({
          profile_id: profileId ?? null,
          plan_code: planCode,
          status: "active",
          public_member_id: publicMemberId,
          expires_at: expiresAt,
          activated_at: new Date().toISOString(),
        })
        .select("id")
        .single();

      return NextResponse.json({ success: true, membershipId: membership?.id, publicMemberId });
    }

    // Paid — create Razorpay order
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `mem_${randomUUID().slice(0, 8)}`,
    });

    const { data: membership } = await supabase
      .from("memberships")
      .insert({
        profile_id: profileId ?? null,
        plan_code: planCode,
        status: "pending",
        razorpay_order_id: order.id,
        public_member_id: publicMemberId,
        expires_at: expiresAt,
      })
      .select("id")
      .single();

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      keyId: process.env.RAZORPAY_KEY_ID,
      membershipId: membership?.id,
      publicMemberId,
    });
  } catch (err) {
    console.error("membership register error:", err);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
