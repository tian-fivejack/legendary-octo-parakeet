import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });

  const { data: quizzes, error } = await supabase
    .from("quizzes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(quizzes);
}

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    title,
    description,
    questions,
  }: {
    title: string;
    description: string;
    questions: Array<{
      question: string;
      options: Array<string>;
      correct_answer: string;
    }>;
  } = await request.json();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: quiz, error: quizError } = await supabase
    .from("quizzes")
    .insert([
      {
        title,
        description,
        created_by: user.id,
      },
    ])
    .select()
    .single();

  if (quizError) {
    return NextResponse.json({ error: quizError.message }, { status: 500 });
  }

  const { error: questionsError } = await supabase.from("questions").insert(
    questions.map((q) => ({
      quiz_id: quiz.id,
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

  return NextResponse.json(quiz);
}
