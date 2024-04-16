import {Skeleton} from "@/components/ui/skeleton";
import DetailsHoverCard from "@/components/ui/details-hover-card";
import SearchResultCard from "@/components/searchResultsPage/search-result-card";
import {AnimeInfo, SearchResult} from "@/types";

type SearchResultSectionProps = {
    data: SearchResult | undefined;
    isLoading: Boolean;
}

export default function SearchResultSection({data, isLoading}: SearchResultSectionProps) {
    return (
        <section
            className="w-full pb-14 md:pb-5 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
            {isLoading || !data
                ? Array.from({length: 20}).map((_, index) => (
                    <Skeleton key={index} className="h-full aspect-[4/5] w-400px"/>
                ))
                : data?.data.map((anime, index) => (
                    <DetailsHoverCard key={index} anime={anime}>
                        <SearchResultCard anime={anime}/>
                    </DetailsHoverCard>
                ))}
        </section>
    )
}