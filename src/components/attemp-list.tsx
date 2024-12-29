"use client";

import { useInitData } from "@/hooks/use-init-data";
import { QuizAttempt } from "@/lib/supabase/types";

export function AttemptComponent({ quiz_id }: { quiz_id: string }) {
  const { data: attempts } = useInitData<QuizAttempt[]>(
    `/api/quiz/${quiz_id}/attempt`
  );

  return (
    <>
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
    </>
  );
}
