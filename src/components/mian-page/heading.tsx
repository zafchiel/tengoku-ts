"use client";

import { use } from "react";
import { TopAiringContext } from "../providers/top-airing-context";
import type { AnimeInfoFiltered } from "@/types";

type MainHeadingProps = {
	topAiring: AnimeInfoFiltered[];
};

export default function MainHeading({ topAiring }: MainHeadingProps) {
	const { currentAnimeIndex } = use(TopAiringContext);

	if (topAiring.length < 1) return null;

	return (
		<section className="z-20 md:mt-20 flex h-3/5 w-full flex-col items-center justify-center p-5 lg:h-full lg:w-2/5">
			<h1 className="mb-3 text-4xl font-bold md:text-6xl">
				{topAiring[currentAnimeIndex]?.title}
			</h1>
			<p className="text-primary text-xl">
				{topAiring[currentAnimeIndex]?.title_english}
			</p>
		</section>
	);
}
