import { Skeleton } from "@/components/ui/skeleton";
import DetailsHoverCard from "@/components/ui/details-hover-card";
import SearchResultCard from "@/components/search-results-page/search-result-card";
import type { SearchResult } from "@/types";

type SearchResultSectionProps = {
	data: SearchResult | undefined;
	isLoading: boolean;
};

export default function SearchResultSection({
	data,
	isLoading,
}: SearchResultSectionProps) {
	return (
		<section
			className="w-full grid pb-14 gap-3"
			style={{
				gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
			}}
		>
			{isLoading || !data
				? Array.from({ length: 20 }).map((_, index) => (
						<Skeleton key={index} className="h-full aspect-[4/5] w-400px" />
					))
				: data?.data.map((anime, index) => (
						<DetailsHoverCard key={index} anime={anime}>
							<SearchResultCard anime={anime} />
						</DetailsHoverCard>
					))}
		</section>
	);
}
