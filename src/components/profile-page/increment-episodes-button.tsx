import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
	Tooltip,
	TooltipProvider,
	TooltipContent,
	TooltipTrigger,
} from "../ui/tooltip";
import { useServerAction } from "zsa-react";
import { updateAnimeProgressEntry } from "@/lib/server/actions/progress-actions";
import type { ProgressRecordType } from "@/lib/server/db/schema";
import { mutate } from "swr";
import { toast } from "sonner";

type IncrementEpisodesButtonProps = {
	progressInfo: ProgressRecordType;
};

export default function IncrementEpisodesButton({
	progressInfo,
}: IncrementEpisodesButtonProps) {
	const { isPending, execute } = useServerAction(updateAnimeProgressEntry);

	const increment = async () => {
		const newStatus =
			progressInfo.episodesWatched + 1 === progressInfo.maxEpisodes
				? "Completed"
				: progressInfo.status;

		const [, error] = await execute({
			animeId: progressInfo.animeId,
			status: newStatus,
			episodesWatched: progressInfo.episodesWatched + 1,
			score: progressInfo.score,
		});

		if (error) {
			toast.error(error.data);
			return;
		}

		mutate("/api/user/progress");
	};

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						disabled={progressInfo.status === "Completed" || isPending}
						loading={isPending}
						size="icon"
						className="grow"
						onClick={increment}
					>
						{!isPending && <Plus size={18} />}
					</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom">
					{progressInfo.status === "Completed"
						? "You've completed this series"
						: "Increment episode count"}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
