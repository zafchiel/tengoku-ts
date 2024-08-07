"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { updateAnimeProgressEntry } from "@/lib/server/actions/progress-actions";
import {
	type ProgressRecordType,
	WATCHING_STATUSES,
} from "@/lib/server/db/schema";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import { SCORES } from "@/lib/server/db/schema";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";

type UpdateListingProps = {
	progressInfo: ProgressRecordType;
};

export default function UpdateListing({ progressInfo }: UpdateListingProps) {
	const EditProgressFormSchema = z.object({
		episodesWatched: z.coerce
			.number()
			.nonnegative()
			.max(progressInfo.maxEpisodes ?? 9999),
		score: z.coerce.number().nonnegative().max(10),
		status: z.enum(WATCHING_STATUSES),
	});

	const form = useForm<z.infer<typeof EditProgressFormSchema>>({
		resolver: zodResolver(EditProgressFormSchema),
		defaultValues: progressInfo,
	});

	const { execute, isPending } = useServerAction(updateAnimeProgressEntry);

	const onSubmit = async (values: z.infer<typeof EditProgressFormSchema>) => {
		if (!progressInfo.maxEpisodes && values.status === "Completed") {
			toast.error("Anime is still airing, please update the progress manually");
			return;
		}

		if (values.status === "Completed" && progressInfo.maxEpisodes !== null) {
			values.episodesWatched = progressInfo.maxEpisodes;
		}

		const [, error] = await execute({
			animeId: progressInfo.animeId,
			...values,
		});

		if (error) {
			toast.error(error.message);
			return;
		}

		toast.success("Updated progress");
		return;
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<div className="grid grid-cols-2 gap-2">
					<FormField
						control={form.control}
						name="status"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Status</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value?.toString()}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a status" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{WATCHING_STATUSES.map((status) => (
											<SelectItem key={status} value={status}>
												{status}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="score"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Score</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value?.toString()}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{SCORES.map(([score, name]) => (
											<SelectItem
												key={name}
												value={score.toString()}
											>{`${score} - ${name}`}</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="episodesWatched"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Episodes Watched</FormLabel>
							<FormControl>
								<Input
									placeholder="Episodes watched"
									type="number"
									min={0}
									max={progressInfo.maxEpisodes ?? undefined}
									{...field}
								/>
							</FormControl>
							<FormDescription className="grid grid-cols-2 gap-2">
								<Button
									type="button"
									variant="outline"
									onClick={() => {
										const currentEpisodesWatched =
											form.getValues("episodesWatched");

										if (Number(currentEpisodesWatched) === 0) return;

										form.setValue(
											"episodesWatched",
											Number(currentEpisodesWatched) - 1,
										);
									}}
								>
									Remove one
								</Button>

								<Button
									type="button"
									variant="outline"
									onClick={() => {
										const currentEpisodesWatched =
											form.getValues("episodesWatched");

										if (
											Number(currentEpisodesWatched) ===
											progressInfo.maxEpisodes
										)
											return;

										form.setValue(
											"episodesWatched",
											Number(currentEpisodesWatched) + 1,
										);
									}}
								>
									Add one
								</Button>
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								size="icon"
								variant="default"
								type="submit"
								disabled={isPending}
								className="w-full"
							>
								{isPending ? <Loader2 className="animate-spin" /> : <Save />}
							</Button>
						</TooltipTrigger>
						<TooltipContent>Save</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</form>
		</Form>
	);
}
