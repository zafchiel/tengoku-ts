import { ProgressRecordType } from "@/lib/server/db/schema";
import EditSeriesProgressCard from "./edit-series-progress-card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";

type ProgressCategorySectionProps = {
	category: string;
	progressEntries: ProgressRecordType[];
};

export default function ProgressCategorySection({
	category,
	progressEntries,
}: ProgressCategorySectionProps) {
	const entriesSortedByScore = progressEntries.sort(
		(a, b) => b.score - a.score,
	);

	return (
		<section id={category} className="scroll-mt-40">
			<h3 className="text-muted-foreground font-bold text-3xl">{category}</h3>
			<div className="flex gap-4 flex-wrap p-2">
				{entriesSortedByScore.length === 0 ? (
					<Alert className="max-w-xl">
						<AlertCircle className="h-4 w-4" />
						<AlertTitle>No {category}</AlertTitle>
						<AlertDescription>
							You don&apos;t have any progress entries yet. Start adding some to
							see them here.
						</AlertDescription>
					</Alert>
				) : (
					entriesSortedByScore.map((progressInfo) => (
						<EditSeriesProgressCard
							key={progressInfo.id}
							progressInfo={progressInfo}
						/>
					))
				)}
			</div>
		</section>
	);
}
