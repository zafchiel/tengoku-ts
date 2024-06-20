"use client";

import { CircleCheckBig } from "lucide-react";
import { Button } from "../ui/button";
import { useServerAction } from "zsa-react";
import { markSeriesAsCompleted } from "@/lib/server/actions/progress-actions";
import { toast } from "sonner";

type MarkSeriesCompletedButtonProps = {
  progressId: number;
  maxEpisodes: number | null;
};

export default function MarkSeriesCompletedButton({
  maxEpisodes,
  progressId,
}: MarkSeriesCompletedButtonProps) {
  const { isPending, execute } = useServerAction(markSeriesAsCompleted);
  return (
    <Button
      variant="outline"
      size="sm"
      disabled={isPending || maxEpisodes === null}
      onClick={async () => {
        if (!maxEpisodes) return;

        const [data, error] = await execute({ progressId, maxEpisodes });

        if (data === null) {
          toast.error("You must be logged in to complete a series.");
          return;
        }

        if (error) {
          toast.error("An error occurred. Please try again.");
          return;
        }

        toast.success("Series marked as completed.");
      }}
    >
      Complete
      <CircleCheckBig className="w-4 h-4 ml-2" />
    </Button>
  );
}
