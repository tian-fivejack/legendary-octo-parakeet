import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserQuizzes } from "@/components/quiz/user-quizzes";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function MyQuizzesPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: quizzes } = await supabase
    .from("quizzes")
    .select("*")
    .eq("created_by", session.user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My Quizzes</h1>
        <Button asChild>
          <Link href="/quiz/create">Create Quiz</Link>
        </Button>
      </div>
      <UserQuizzes quizzes={quizzes || []} />
    </div>
  );
}
