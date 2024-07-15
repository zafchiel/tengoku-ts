import { Badge } from "../ui/badge";
import { Star } from "lucide-react";

type Props = {
	score: number;
};

export default function ScoreBadge({ score }: Props) {
	return (
		<Badge
			variant="secondary"
			className="!border-none flex justify-center items-center gap-2 text-md px-2 py-1 !rounded-full"
		>
			<Star size={18} />
			<span>{score}</span>
		</Badge>
	);
}
