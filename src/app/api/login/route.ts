import { NextResponse } from "next/server";
import { cookies } from "next/headers";
// import supabaseClient from "@/lib/supabase/api-client";
import { createClient } from "@/lib/supabase/client";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  const cookieStore = cookies();
  cookieStore.set("sb-access-token", data.session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: data.session.expires_in,
  });

  return NextResponse.json({ user: data.user });
}
