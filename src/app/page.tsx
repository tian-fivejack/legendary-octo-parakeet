import { QuizList } from "@/components/quiz-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Available Quizzes</h1>
        <Button asChild>
          <Link href="/quiz/create">Create Quiz</Link>
        </Button>
      </div>
      <QuizList />
    </div>
  );
}
