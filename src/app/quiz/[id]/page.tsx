import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { QuizComponent } from "@/src/components/quiz";

export default async function QuizPage({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });

  const { data: quiz } = await supabase
    .from("quizzes")
    .select("*")
    .eq("id", params.id)
    .single();

  const { data: questions } = await supabase
    .from("questions")
    .select("*")
    .eq("quiz_id", params.id);

  if (!quiz || !questions) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <QuizComponent quiz={quiz} questions={questions} />
    </div>
  );
}
