"use client";

import { QuizComponent } from "@/components/quiz";
import { useInitData } from "@/hooks/use-init-data";
import { Quiz } from "@/lib/supabase/types";

export default function QuizPage({ params }: { params: { id: string } }) {
  const { data: quiz } = useInitData<Quiz>(`/api/quiz/${params.id || 0}`);

  if (!quiz) return <div>Quiz not found</div>;

  return (
    <div className="container mx-auto py-8">
      <QuizComponent quiz={quiz} />
    </div>
  );
}
