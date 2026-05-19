import { client } from "@/lib/sanity";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, date, hours, interests } = body;

    // Basic server-side validation
    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create document in Sanity
    const token = process.env.SANITY_API_TOKEN;

    if (!token) {
      console.error("SANITY_API_TOKEN is not defined in environment variables");
      return NextResponse.json({ 
        error: "Server configuration error: Write token missing. Please add SANITY_API_TOKEN to your .env.local file." 
      }, { status: 500 });
    }

    const result = await client.withConfig({
      token: token,
      useCdn: false 
    }).create({
      _type: "volunteerApplication",
      firstName,
      lastName,
      email,
      phone,
      date,
      hours,
      interests,
      submittedAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true, id: result._id });
  } catch (error: any) {
    console.error("Volunteer API error:", error);
    return NextResponse.json({ error: error.message || "Failed to submit application" }, { status: 500 });
  }
}
