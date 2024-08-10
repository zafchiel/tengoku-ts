"use client";

import { CircleCheckBig } from "lucide-react";
import { Button } from "../ui/button";
import { useServerAction } from "zsa-react";
import { markSeriesAsCompleted } from "@/lib/server/actions/progress-actions";
import { toast } from "sonner";
import { mutate } from "swr";

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
			disabled={isPending || maxEpisodes === null}
			onClick={async () => {
				if (!maxEpisodes) return;

				const [, error] = await execute({ progressId, maxEpisodes });

				if (error) {
					toast.error(error.data);
					return;
				}

				toast.success("Series marked as completed.");
				mutate("/api/user/progress");
				return;
			}}
		>
			Complete
			<CircleCheckBig className="w-4 h-4 ml-2" />
		</Button>
	);
}
