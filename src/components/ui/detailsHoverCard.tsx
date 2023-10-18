"use client";

import { ReactNode, useEffect } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import axios from "axios";

type Props = {
  anime_id: string;
  children: ReactNode;
};

export default function DetailsHoverCard({ anime_id, children }: Props) {
  const fetchDetails = async () => {
    console.log("Start fetching");
    try {
      const { data } = await axios.get("https://api.jikan.moe/v4/anime", {
        params: { q: anime_id, limit: "1" },
      });
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger onMouseEnter={fetchDetails}>
        {children}
      </HoverCardTrigger>
      <HoverCardContent>nigga cat</HoverCardContent>
    </HoverCard>
  );
}
