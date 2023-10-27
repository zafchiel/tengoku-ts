"use client";

import { ReactNode, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Description from "../detailsPage/Description";
import { TopAiring } from "@/types";
import MutedText from "./mutedText";

type Props = {
  anime_id: string;
  children: ReactNode;
};

export default function DetailsHoverCard({ anime_id, children }: Props) {
  const [details, setDetails] = useState<TopAiring>();
  const [isLoading, setIsLoading] = useState(false);
  const fetchDetails = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("https://api.jikan.moe/v4/anime", {
        params: { q: anime_id, limit: "1" },
      });
      setDetails(data.data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger onMouseEnter={fetchDetails}>
        {children}
      </HoverCardTrigger>
      <HoverCardContent>
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          details && (
            <div className="flex flex-col gap-2">
              <div>
                <p>
                  <MutedText>Score:&nbsp;</MutedText>
                  {details.score}
                </p>
                <p>
                  <MutedText>Type:&nbsp;</MutedText>
                  {details.type}
                </p>
                <p>
                  <MutedText>Episodes:&nbsp;</MutedText>
                  {details.episodes}
                </p>
                <p>
                  <MutedText>Rating:&nbsp;</MutedText>
                  {details.rating}
                </p>
              </div>
              <Description paragraph={details.synopsis} />
            </div>
          )
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
