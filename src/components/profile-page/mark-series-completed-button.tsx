"use client";

import { CircleCheckBig } from "lucide-react";
import { Button } from "../ui/button";
import { useServerAction } from "zsa-react";
import { markSeriesAsCompleted } from "@/lib/server/actions/progress-actions";
import { toast } from "sonner";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import type { ProgressRecordType } from "@/lib/server/db/schema";

type MarkSeriesCompletedButtonProps = {
  progressId: number;
  maxEpisodes: number | null;
};

export default function MarkSeriesCompletedButton({
  maxEpisodes,
  progressId,
}: MarkSeriesCompletedButtonProps) {
  async function markProgressEntryAsCompletedAction(
    url: string,
    { arg }: { arg: { progressId: number; maxEpisodes: number } }
  ) {
    const [data, error] = await markSeriesAsCompleted({
      progressId: arg.progressId,
      maxEpisodes: arg.maxEpisodes,
    });

    if (error) {
      throw new Error(error.data);
    }

    return data;
  }

  const { trigger, isMutating } = useSWRMutation(
    "/api/user/progress",
    markProgressEntryAsCompletedAction,
    {
      onError: () => {
        toast.error("An error occurred. Please try again.");
      },
      optimisticData: (data: ProgressRecordType[] | undefined) => {
        if (!data) return [];

        return data?.map((progress) => {
          if (progress.id === progressId) {
            return { ...progress, status: "Completed" as const };
          }
          return progress;
        });
      },
    }
  );

  return (
    <Button
      variant="outline"
      disabled={isMutating || maxEpisodes === null}
      onClick={async () => {
        if (!maxEpisodes) return;

        await trigger({ progressId, maxEpisodes });
      }}
    >
      Complete
      <CircleCheckBig className="w-4 h-4 ml-2" />
    </Button>
  );
}
