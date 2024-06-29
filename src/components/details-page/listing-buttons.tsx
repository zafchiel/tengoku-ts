"use client";

import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import AddToList from "@/components/details-page/add-to-list";
import { ProgressRecordType } from "@/lib/server/db/schema";
import UpdateListing from "@/components/details-page/update-listing";
import useSWR from "swr";
import { AnimeInfo } from "@/types";

const fetcher = (url: string) =>
  axios.get<ProgressRecordType>(url).then((res) => res.data);

type ListingButtonsProps = {
  animeInfo: AnimeInfo;
};

export default function ListingButtons({ animeInfo }: ListingButtonsProps) {
  // Check if progress record exists
  const { data, isLoading, mutate } = useSWR(
    `/api/anime?id=${animeInfo.mal_id}`,
    fetcher
  );

  if (isLoading) {
    return <Skeleton className="w-full h-10" />;
  }

  if (!data && !isLoading) {
    return (
      <AddToList
        animeId={animeInfo.mal_id}
        animePoster={animeInfo.images.webp.large_image_url}
        animeTitle={animeInfo.title}
        setProgressInfo={mutate}
        maxEpisodes={animeInfo.episodes}
      />
    );
  }

  if (data) {
    return <UpdateListing progressInfo={data} />;
  }
}
