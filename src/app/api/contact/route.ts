import { client } from "@/lib/sanity";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, organization, website, subject, message } = body;

    // Basic server-side validation
    if (!fullName || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await client.withConfig({
      token: process.env.SANITY_API_TOKEN,
      useCdn: false 
    }).create({
      _type: "contactSubmission",
      fullName,
      email,
      phone,
      organization,
      website,
      subject,
      message,
      submittedAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true, id: result._id });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: error.message || "Failed to submit message" }, { status: 500 });
  }
}
