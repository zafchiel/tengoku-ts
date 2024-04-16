"use client";

import axios from "axios";
import {useSearchParams} from "next/navigation";
import {SearchResult} from "@/types";
import {JIKAN_API_URL} from "@/lib/constants";
import {PaginationComponent} from "@/components/searchResultsPage/pagination-component";
import {Skeleton} from "@/components/ui/skeleton";
import useSWR from "swr";
import SearchResultSection from "@/components/searchResultsPage/search-result-sections";
import {AlertCircle} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

const fetcher = (url: string) => axios.get<SearchResult>(url).then(res => res.data);
const LIMIT = 20;

export default function SearchResultsPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") ?? "";
    const currentPage = searchParams.get("page") ?? 1;

    const {
        data,
        isLoading,
        error
    } = useSWR(`${JIKAN_API_URL}/anime?q=${query}&limit=${LIMIT}&page=${currentPage}&sfw=true`, fetcher)

    return (
        <main className="md:pt-14 p-5">
            <h3 className="text-lg text-muted-foreground p-2">
                search results:
                <span className="text-3xl text-foreground font-light pl-2">
          {query}
        </span>
            </h3>
            <div className="p-3 grid place-items-center">
                {isLoading || !data ? (
                    <Skeleton className="w-32 h-10"/>
                ) : (
                    <PaginationComponent
                        query={query}
                        activePage={Number(currentPage)}
                        paginationInfo={data.pagination}
                    />
                )}
            </div>

            {error ? (
                <Alert variant="destructive" className="max-w-xl">
                    <AlertCircle className="h-4 w-4"/>
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Anime not found. Please try searching again.
                    </AlertDescription>
                </Alert>
            ) : (
                <SearchResultSection data={data} isLoading={isLoading}/>
            )}


            <div className="p-3 grid place-items-center">
                {data && (
                    <PaginationComponent
                        query={query}
                        activePage={Number(currentPage)}
                        paginationInfo={data.pagination}
                    />
                )}
            </div>
        </main>
    );
}
