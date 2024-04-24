"use client";

import axios from "axios";
import {Skeleton} from "@/components/ui/skeleton";
import AddToList from "@/components/details-page/add-to-list";
import {ProgressRecordType} from "@/lib/server/db/schema";
import UpdateListing from "@/components/details-page/update-listing";
import useSWR from "swr";

const fetcher = (url: string) => axios.get<ProgressRecordType>(url).then(res => res.data)

type ListingButtonsProps = {
    animeId: number;
    maxEpisodes: number | null;
}

export default function ListingButtons({animeId, maxEpisodes}: ListingButtonsProps) {
    // Check if progress record exists
    const {data, isLoading, mutate} = useSWR(`/api/anime?id=${animeId}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    if (isLoading) {
        return <Skeleton className="w-full h-10"/>
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