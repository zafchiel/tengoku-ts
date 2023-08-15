"use client";

import { cn, extractEpisodeNumber } from "@/lib/utils";
import Link from "next/link";
import EpisodeList from "../detailsPage/EpisodeLIst";
import { StepBack, StepForward } from "lucide-react";
import { Button } from "../ui/button";
import { EpisodeListType, UserProgressData } from "@/types";
import { EpisodesRecord } from "@/xata/xata";
import MarkAsWatchedButton from "./markAsWatchedButton";

type Props = {
  episodeList: EpisodeListType | EpisodesRecord[];
  params: {
    id: string;
    episode_id: string;
  };
};

export default function NavBar({ episodeList, params }: Props) {
  const epNumber = extractEpisodeNumber(params.episode_id);

  const nextEp =
    params.episode_id.slice(0, -epNumber.toString().length) + (epNumber + 1);
  const prevEp =
    params.episode_id.slice(0, -epNumber.toString().length) + (epNumber - 1);

  return (
    <div className="flex fixed bottom-0 inset-x-0 md:static w-full h-20 justify-around items-center">
      <Link
        href={`/${params.id}/watch/${prevEp}`}
        className={cn(
          "cursor-pointer py-1 px-5 hover:bg-accent hover:text-accent-foreground rounded-md",
          {
            "text-muted pointer-events-none":
              -1 === episodeList.findIndex((element) => element.id === prevEp),
          }
        )}
      >
        <StepBack size={34} />
      </Link>

      <EpisodeList episodeList={episodeList}>
        <Button variant="ghost" className="text-xl font-semibold uppercase">
          Episodes
        </Button>
      </EpisodeList>
      <Link
        href={`/${params.id}/watch/${nextEp}`}
        className={cn(
          "cursor-pointer py-1 px-5 hover:bg-accent hover:text-accent-foreground rounded-md",
          {
            "text-muted pointer-events-none":
              -1 === episodeList.findIndex((element) => element.id === nextEp),
          }
        )}
      >
        <StepForward size={34} />
      </Link>
    </div>
  );
}
