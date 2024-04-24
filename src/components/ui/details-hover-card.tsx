"use client";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import Description from "../details-page/description";
import { AnimeInfo } from "@/types";
import Link from "next/link";

type DetailsHoverCardProps = {
    anime: AnimeInfo;
    children: React.ReactNode;
};

export default function DetailsHoverCard({ anime, children }: DetailsHoverCardProps) {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Link href={`/anime/${anime.mal_id}`}>
                    {children}
                </Link>
            </HoverCardTrigger>
            <HoverCardContent>
                <div className="flex flex-col gap-2">
                    <div>
                        <p>
                            <span className="text-muted-foreground">Score:&nbsp;</span>
                            {anime.score}
                        </p>
                        <p>
                            <span className="text-muted-foreground">Type:&nbsp;</span>
                            {anime.type}
                        </p>
                        <p>
                            <span className="text-muted-foreground">Episodes:&nbsp;</span>
                            {anime.episodes}
                        </p>
                        <p>
                            <span className="text-muted-foreground">Rating:&nbsp;</span>
                            {anime.rating}
                        </p>
                    </div>
                    {anime.synopsis && <Description paragraph={anime.synopsis}/>}
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
