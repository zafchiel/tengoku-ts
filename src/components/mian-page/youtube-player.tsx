import type { AnimeInfoFiltered } from "@/types";
import { useContext } from "react";
import YouTube from "react-youtube";
import { TopAiringContext } from "../providers/top-airing-context";

const randomVideoStartSecond = Math.floor(Math.random() * 40);

type Props = {
	topAiring: AnimeInfoFiltered[];
};

export default function YouTubePlayer({ topAiring }: Props) {
	const { currentAnimeIndex } = useContext(TopAiringContext);

	return (
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
	);
}
