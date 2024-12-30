import { NextResponse } from "next/server";
import { cookies } from "next/headers";
// import supabaseClient from "@/lib/supabase/api-client";
import { createClient } from "@/lib/supabase/client";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const supabase = await createClient();
  const requestUrl = new URL(request.url);
  const redirectTo = `${requestUrl.origin}/signup/callback`;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectTo,
    },
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
      {
        message: "Signup successful! Please check your email for verification.",
      },
      { status: 200 }
    );
  }

  return NextResponse.json({ user: data.user });
}
