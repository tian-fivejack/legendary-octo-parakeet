import { QuizResults } from "@/components/quiz/quiz-result";

export default async function ResultsPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { score: string; total: string };
}) {
  return (
    <QuizResults
      score={searchParams.score}
      total={searchParams.total}
      quizId={params.id}
    />
  );
}
