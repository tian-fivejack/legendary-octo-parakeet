import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import supabaseClient from "@/lib/supabase/api-client";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Check if session is available
  if (data.session) {
    const cookieStore = cookies();
    cookieStore.set("supabase_session", data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: data.session.expires_in,
    });
  } else {
    return NextResponse.json(
      { error: "Session not available" },
      { status: 400 }
    );
  }

  return NextResponse.json({ user: data.user });
}
