import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email and message are required" }, { status: 400 });
    }

    const supabase = await createServiceClient();

    await supabase.from("contact_messages").insert({
      full_name: name,
      email,
      phone: phone || null,
      subject: subject || null,
      message,
      status: "unread",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("contact error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
