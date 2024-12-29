import { createClient } from "@/lib/supabase/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: quizzes, error } = await supabase
      .from("quizzes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch quizzes",
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: quizzes }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
        error: (err as Error).message,
      },
      { status: 500 }
    );
  }
}

type Question = {
  question: string;
  options: string[];
  correct_answer: string;
};

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      title,
      description,
      questions,
    }: {
      title: string;
      description: string;
      questions: Question[];
    } = await request.json();

    if (
      !title ||
      !description ||
      !Array.isArray(questions) ||
      questions.length === 0
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid input data" },
        { status: 400 }
      );
    }

    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = authData.user;

    const { data: quiz, error: quizError } = await supabase
      .from("quizzes")
      .insert([{ title, description, created_by: user.id }])
      .select()
      .single();

    if (quizError) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create quiz",
          error: quizError.message,
        },
        { status: 500 }
      );
    }

    const formattedQuestions = questions.map((q) => ({
      quiz_id: quiz.id,
      question: q.question,
      options: q.options,
      correct_answer: q.correct_answer,
    }));

    const { error: questionsError } = await supabase
      .from("questions")
      .insert(formattedQuestions);

    if (questionsError) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to add questions",
          error: questionsError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data: quiz, message: "Quiz created successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
        error: (err as Error).message,
      },
      { status: 500 }
    );
  }
}
