import { createClient } from "@/lib/supabase/client";
import { Question } from "@/lib/supabase/types";
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const {
    title,
    description,
    questions,
  }: { title: string; description: string; questions: Question[] } =
    await request.json();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error: quizError } = await supabase
    .from("quizzes")
    .update({ title, description })
    .eq("id", params.id)
    .eq("created_by", user.id);

  if (quizError) {
    return NextResponse.json({ error: quizError.message }, { status: 500 });
  }

  const { error: deleteError } = await supabase
    .from("questions")
    .delete()
    .eq("quiz_id", params.id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  const { error: questionsError } = await supabase.from("questions").insert(
    questions.map((q) => ({
      quiz_id: params.id,
      question: q.question,
      options: q.options,
      correct_answer: q.correct_answer,
    }))
  );

  if (questionsError) {
    return NextResponse.json(
      { error: questionsError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: quiz, error: fetchQuizError } = await supabase
    .from("quizzes")
    .select("id")
    .eq("id", params.id)
    .eq("created_by", user.id)
    .single();

  if (fetchQuizError || !quiz) {
    return NextResponse.json(
      { error: "Quiz not found or unauthorized" },
      { status: 404 }
    );
  }

  const { error: deleteQuestionsError } = await supabase
    .from("questions")
    .delete()
    .eq("quiz_id", params.id);

  if (deleteQuestionsError) {
    return NextResponse.json(
      { error: deleteQuestionsError.message },
      { status: 500 }
    );
  }

  const { error: deleteQuizError } = await supabase
    .from("quizzes")
    .delete()
    .eq("id", params.id)
    .eq("created_by", user.id);

  if (deleteQuizError) {
    return NextResponse.json(
      { error: deleteQuizError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
