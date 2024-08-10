"use client";

import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import { deleteAnimeProgressEntry } from "@/lib/server/actions/progress-actions";
import { useServerAction } from "zsa-react";
import { toast } from "sonner";
import { useState } from "react";
import { mutate } from "swr";

type DeleteSeriesProgressEntryButtonProps = {
	progressId: number;
	animeTitle: string;
};

export default function DeleteSeriesProgressEntryButton({
	animeTitle,
	progressId,
}: DeleteSeriesProgressEntryButtonProps) {
	const { isPending, execute } = useServerAction(deleteAnimeProgressEntry);
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<Dialog open={modalOpen} onOpenChange={setModalOpen}>
			<DialogTrigger asChild>
				<Button variant="destructive" size="sm">
					Delete
					<Trash size={14} className="ml-2" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Are you sure?</DialogTitle>
					<DialogDescription>
						You will delete &nbsp;
						<span className="font-semibold text-teal-300">{animeTitle}</span>
						&nbsp; from your watchlist.
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<DialogClose asChild>
						<Button disabled={isPending}>Cancel</Button>
					</DialogClose>
					<Button
						variant="destructive"
						disabled={isPending}
						onClick={async () => {
							const [, error] = await execute(progressId);

							if (error) {
								toast.error(error.data);
								return;
							}

							toast.success("Progress entry deleted");
							setModalOpen(false);
							mutate("/api/user/progress");
						}}
					>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
