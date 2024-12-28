import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import supabaseClient from "@/lib/supabase/api-client";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  const cookieStore = cookies();
  cookieStore.set("supabase_session", data.session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: data.session.expires_in,
  });

  return NextResponse.json({ user: data.user });
}
