import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ResultsPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { score: string; total: string };
}) {
  const supabase = createServerComponentClient({ cookies });

  const { data: attempts } = await supabase
    .from("quiz_attempts")
    .select("*")
    .eq("quiz_id", params.id)
    .order("score", { ascending: false })
    .limit(10);

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">
                Your Score: {searchParams.score}/{searchParams.total}
              </h2>
              <p className="text-muted-foreground">
                {Math.round(
                  (parseInt(searchParams.score) /
                    parseInt(searchParams.total)) *
                    100
                )}
                %
              </p>
            </div>

            {attempts && attempts.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Top Scores</h3>
                <div className="space-y-2">
                  {attempts.map((attempt, index) => (
                    <div
                      key={attempt.id}
                      className="flex justify-between items-center p-2 bg-muted rounded"
                    >
                      <span>#{index + 1}</span>
                      <span>{attempt.score} points</span>
                      <span>
                        {Math.floor(attempt.time_taken / 60)}:
                        {(attempt.time_taken % 60).toString().padStart(2, "0")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link href="/">Back to Home</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={`/quiz/${params.id}`}>Try Again</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
