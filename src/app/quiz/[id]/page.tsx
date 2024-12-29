"use client";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
// import { notFound } from "next/navigation";
import { QuizComponent } from "@/components/quiz";
import { useInitData } from "@/hooks/use-init-data";
import { Quiz } from "@/lib/supabase/types";

export default function QuizPage({ params }: { params: { id: string } }) {
  // const supabase = createServerComponentClient({ cookies });

  // const { data: quiz } = await supabase
  //   .from("quizzes")
  //   .select("*")
  //   .eq("id", params.id)
  //   .single();

  // const { data: questions } = await supabase
  //   .from("questions")
  //   .select("*")
  //   .eq("quiz_id", params.id);

  // if (!quiz || !questions) {
  //   notFound();
  // }

  const { data: quiz } = useInitData<Quiz>(`/api/quiz/${params.id || 0}`);

  if (!quiz) return <div>Quiz not found</div>;

  return (
    <div className="container mx-auto py-8">
      <QuizComponent quiz={quiz} />
    </div>
  );
}
