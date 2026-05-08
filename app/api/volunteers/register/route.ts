import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, city, state, ageGroup, availability, interests, howHeard, message } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    const supabase = await createServiceClient();

    await supabase.from("volunteer_applications").insert({
      full_name: name,
      email: email || null,
      phone,
      city: city || null,
      state: state || null,
      age_group: ageGroup || null,
      availability: availability || null,
      interests: interests || [],
      how_heard: howHeard || null,
      message: message || null,
      status: "pending",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("volunteer register error:", err);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
