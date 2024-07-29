import { JIKAN_API_URL } from "@/lib/constants";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { AnimeCharacter } from "@/types";
import CharacterCard from "./character-card";
import Link from "next/link";
import { fetchAnimeCharacters } from "@/lib/utils";

type CharactersSectionProps = {
	animeId: number;
};

export default async function CharactersSection({
	animeId,
}: CharactersSectionProps) {
	const characters = await fetchAnimeCharacters(animeId);

	if (!characters) {
		return (
			<section id="characters" className="scroll-mt-40 px-1 py-2">
				<h3 className="text-3xl font-semibold">Characters</h3>
				<hr className="mb-2" />
				<Alert variant="destructive" className="max-w-xl">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						Anime characters not found. Please try searching again.
					</AlertDescription>
				</Alert>
			</section>
		);
	}

	return (
		<section id="characters" className="scroll-mt-40 px-1 py-2">
			<div className="flex justify-between items-end">
				<h3 className="text-3xl font-semibold">Characters</h3>
				<Link href={`/anime/${animeId}/characters`} className="underline">
					Show all characters
				</Link>
			</div>
			<hr className="mb-2" />
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
				{characters.slice(0, 10).map((character) => (
					<CharacterCard
						key={character.character.mal_id}
						character={character}
					/>
				))}
			</div>
			<div className="text-center my-2">
				<Link href={`/anime/${animeId}/characters`} className="underline">
					Show all characters
				</Link>
			</div>
		</section>
	);
}
