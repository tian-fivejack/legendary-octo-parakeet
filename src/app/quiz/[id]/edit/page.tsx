"use client";

import { QuizForm } from "@/components/quiz/quiz-form";
import { useInitData } from "@/hooks/use-init-data";
import { Quiz } from "@/lib/supabase/types";
import { Fragment } from "react";

export default function EditQuizPage({ params }: { params: { id: string } }) {
  const { data: quiz } = useInitData<Quiz>(`/api/quiz/${params.id}/`);

  if (!quiz) return <Fragment />;

  return (
    <div className="container mx-auto py-8">
      <QuizForm
        mode="edit"
        initialData={{ quiz, questions: quiz?.questions || [] }}
      />
    </div>
  );
}
