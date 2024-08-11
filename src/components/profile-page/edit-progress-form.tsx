import {
	type ProgressRecordType,
	WATCHING_STATUSES,
	SCORES,
} from "@/lib/server/db/schema";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
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
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PenIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import { updateAnimeProgressEntry } from "@/lib/server/actions/progress-actions";
import { toast } from "sonner";
import { mutate } from "swr";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

type EditProgressFormProps = {
	progressInfo: ProgressRecordType;
};

export default function EditProgressForm({
	progressInfo,
}: EditProgressFormProps) {
	const [isMaxEpisodesTooltipOpen, setIsMaxEpisodesTooltipOpen] =
		useState(false);

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

	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const { execute, isPending } = useServerAction(updateAnimeProgressEntry);

	const onSubmit = async (values: z.infer<typeof EditProgressFormSchema>) => {
		if (!progressInfo.maxEpisodes && values.status === "Completed") {
			toast.error("Anime is still airing, please update the progress manually");
			return;
		}

		if (values.status === "Completed" && progressInfo.maxEpisodes !== null) {
			form.setValue("episodesWatched", progressInfo.maxEpisodes);
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
		mutate("/api/user/progress");
		setIsSheetOpen(false);
		return;
	};

	return (
		<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
			<SheetTrigger asChild>
				<Button variant="outline">
					Edit
					<PenIcon size={14} className="ml-2" />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Edit progress</SheetTitle>
					<SheetDescription>
						Make changes to your progress here.
					</SheetDescription>
				</SheetHeader>
				<Form {...form}>
					<form
						id="edit-progress-form"
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8 p-2"
					>
						<FormField
							control={form.control}
							name="episodesWatched"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										<span className="text-xs text-muted-foreground">
											Episodes Watched
										</span>
										<span
											title="Maximum episodes"
											aria-label="Maximum episodes"
										>
											{progressInfo.maxEpisodes &&
												` / ${progressInfo.maxEpisodes}`}
										</span>
									</FormLabel>
									<FormControl>
										<Tooltip
											defaultOpen={false}
											open={isMaxEpisodesTooltipOpen}
											onOpenChange={setIsMaxEpisodesTooltipOpen}
										>
											<TooltipTrigger asChild>
												<Input
													placeholder="Episodes watched"
													type="number"
													min={0}
													max={progressInfo.maxEpisodes ?? undefined}
													{...field}
												/>
											</TooltipTrigger>
											<TooltipContent>
												{field.value === progressInfo.maxEpisodes ? (
													<p>You watched all episodes</p>
												) : (
													<p>You watched {field.value} episodes</p>
												)}
											</TooltipContent>
										</Tooltip>
									</FormControl>
									<FormDescription className="grid grid-cols-2 gap-2">
										<Button
											type="button"
											variant="outline"
											aria-label="Remove one episode"
											title="Remove one episode"
											className="bg-destructive/10"
											autoFocus={true}
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
											<Minus />
										</Button>

										<Button
											type="button"
											variant="outline"
											aria-label="Add one episode"
											title="Add one episode"
											className="bg-success/10"
											onClick={() => {
												const currentEpisodesWatched =
													form.getValues("episodesWatched");

												if (
													Number(currentEpisodesWatched) ===
													progressInfo.maxEpisodes
												) {
													setIsMaxEpisodesTooltipOpen(true);
													setTimeout(() => {
														setIsMaxEpisodesTooltipOpen(false);
													}, 2000);
													return;
												}

												form.setValue(
													"episodesWatched",
													Number(currentEpisodesWatched) + 1,
												);
											}}
										>
											<Plus />
										</Button>
									</FormDescription>
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
												<SelectValue placeholder="Select a status" />
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

						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem className="space-y-3">
									<FormLabel>Status</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={(selectedStatus) => {
												if (
													selectedStatus === "Completed" &&
													progressInfo.maxEpisodes
												) {
													form.setValue(
														"episodesWatched",
														progressInfo.maxEpisodes,
													);
												}

												field.onChange(selectedStatus);
											}}
											defaultValue={field.value}
											className="flex flex-col space-y-2"
										>
											{WATCHING_STATUSES.map((status) => (
												<FormItem
													key={status}
													className="flex items-center space-y-0 border border-accent rounded-md hover:bg-accent/40 transition-colors duration-200 has-[:checked]:bg-primary/10"
												>
													<FormControl>
														<RadioGroupItem value={status} className="ml-2" />
													</FormControl>
													<FormLabel className="font-normal cursor-pointer w-full px-2 py-3">
														{status}
													</FormLabel>
												</FormItem>
											))}
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
				<SheetFooter className="grid grid-cols-2 gap-4 py-4">
					<SheetClose asChild>
						<Button type="button" variant="secondary">
							Close
						</Button>
					</SheetClose>

					<Button type="submit" form="edit-progress-form" disabled={isPending}>
						Save changes
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
