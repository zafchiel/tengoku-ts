"use client";

import axios from "axios";
import {Skeleton} from "@/components/ui/skeleton";
import AddToList from "@/components/detailsPage/add-to-list";
import {ProgressRecordType} from "@/lib/server/db/schema";
import UpdateListing from "@/components/detailsPage/update-listing";
import useSWR from "swr";

const fetcher = (url: string) => axios.get<ProgressRecordType>(url).then(res => res.data)

type ListingButtonsProps = {
    animeId: number;
    maxEpisodes: number | null;
}

export default function ListingButtons({animeId, maxEpisodes}: ListingButtonsProps) {
    const {data, isLoading, mutate} = useSWR(`/api/anime?id=${animeId}`, fetcher)

    if (isLoading) {
        return <Skeleton className="w-[200px] h-14"/>
    }

    if (!data && !isLoading) {
        return (
            <AddToList
                animeId={animeId}
                setProgressInfo={mutate}
                maxEpisodes={maxEpisodes}
            />
        )
    }

    if (data) {
        return (
            <UpdateListing progressInfo={data}/>
        )
    }
}