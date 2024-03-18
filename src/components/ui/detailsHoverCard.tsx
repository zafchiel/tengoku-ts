"use client";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import Description from "../detailsPage/Description";
import { AnimeInfo } from "@/types";
import MutedText from "./mutedText";

type Props = {
  anime: AnimeInfo;
  children: React.ReactNode;
};

export default function DetailsHoverCard({ anime, children }: Props) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        {children}
      </HoverCardTrigger>
      <HoverCardContent>
            <div className="flex flex-col gap-2">
              <div>
                <p>
                  <MutedText>Score:&nbsp;</MutedText>
                  {anime.score}
                </p>
                <p>
                  <MutedText>Type:&nbsp;</MutedText>
                  {anime.type}
                </p>
                <p>
                  <MutedText>Episodes:&nbsp;</MutedText>
                  {anime.episodes}
                </p>
                <p>
                  <MutedText>Rating:&nbsp;</MutedText>
                  {anime.rating}
                </p>
              </div>
              <Description paragraph={anime.synopsis} />
            </div>
      </HoverCardContent>
    </HoverCard>
  );
}
