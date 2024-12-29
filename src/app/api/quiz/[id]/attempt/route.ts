import { createClient } from "@/lib/supabase/client";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const { score, time_taken } = await request.json();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("quiz_attempts")
    .insert([
      {
        quiz_id: params.id,
        user_id: user.id,
        score,
        time_taken,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();

    if (!params.id) {
      return NextResponse.json(
        { success: false, message: "Quiz ID is required" },
        { status: 400 }
      );
    }
    console.log(request);

    // Fetch the quiz by ID
    const { data: attempts, error: attemptError } = await supabase
      .from("quiz_attempts")
      .select("*")
      .eq("quiz_id", params.id)
      .order("score", { ascending: false })
      .limit(10);

    if (attemptError) {
      return NextResponse.json(
        {
          success: false,
          message: "Attempts not found",
          error: attemptError.message,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: attempts,
        message: "Attempts retrieved successfully",
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: (err as Error).message || "Unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
