"use client";

import { use } from "react";
import Image from "next/image";
import { TopAiringContext } from "../providers/top-airing-context";
import type { AnimeInfoFiltered } from "@/types";
import YouTube from "react-youtube";

const randomVideoStartSecond = Math.floor(Math.random() * 40);

type Props = {
	topAiring: AnimeInfoFiltered[];
};

export default function TrailerPlayer({ topAiring }: Props) {
	const { currentAnimeIndex } = use(TopAiringContext);

	if (topAiring.length < 1 || !topAiring[currentAnimeIndex]) return null;

	return (
		<div className="absolute min-h-screen w-full pointer-events-none">
			<div className="fixed left-0 top-0 -z-10 h-full w-full overflow-hidden bg-black/40"></div>

			<YouTube
				videoId={topAiring[currentAnimeIndex].trailer?.youtube_id ?? ""}
				iframeClassName="absolute w-full h-screen -z-20"
				opts={{
					playerVars: {
						autoplay: 1,
						controls: 0,
						mute: 1,
						disablekb: 1,
						iv_load_policy: 3,
						modestbranding: 1,
						showinfo: 0,
						start: randomVideoStartSecond,
					},
				}}
			/>

			<Image
				src={`https://img.youtube.com/vi/${topAiring[currentAnimeIndex].trailer?.youtube_id ?? ""}/maxresdefault.jpg`}
				fill
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				alt="image"
				className="-z-30 absolute h-full w-full object-cover"
			/>
		</div>
	);
}
