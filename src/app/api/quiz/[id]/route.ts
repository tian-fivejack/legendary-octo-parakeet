import { createClient } from "@/lib/supabase/client";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Quiz ID is required" },
        { status: 400 }
      );
    }

    // Fetch the quiz by ID
    const { data: quiz, error: quizError } = await supabase
      .from("quizzes")
      .select("*")
      .eq("id", id)
      .single();

    if (quizError) {
      return NextResponse.json(
        { success: false, message: "Quiz not found", error: quizError.message },
        { status: 404 }
      );
    }

    // Optionally, fetch questions associated with the quiz
    const { data: questions, error: questionsError } = await supabase
      .from("questions")
      .select("*")
      .eq("quiz_id", id);

    if (questionsError) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch questions",
          error: questionsError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: { ...quiz, questions },
        message: "Quiz retrieved successfully",
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
