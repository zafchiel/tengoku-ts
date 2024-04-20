import { JIKAN_API_URL } from "@/lib/constants";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { AnimeCharacter } from "@/types";
import CharacterCard from "./character-card";

type CharactersSectionProps = {
    animeId: number;
}

export default async function CharactersSection({ animeId }: CharactersSectionProps) {
    const characters = await axios.get<{data: AnimeCharacter[] }>(`${JIKAN_API_URL}/anime/${animeId}/characters`).then(res => res.data.data);

    const sortedCharacters = characters.sort((a, b) => {
        if (a.role === "Main" && b.role !== "Main") {
          return -1;
        } else if (b.role === "Main" && a.role !== "Main") {
          return 1;
        } else {
          return b.favorites - a.favorites;
        }
    });

    if(!characters) {
        return (
            <section>
                <Alert variant="destructive" className="max-w-xl">
                    <AlertCircle className="h-4 w-4"/>
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Anime not found. Please try searching again.
                    </AlertDescription>
                </Alert>
            </section>
        )
    }

    return (
        <section>
            <h3 className="text-3xl font-semibold">Characters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sortedCharacters.slice(0, 10).map((character) => (
                    <CharacterCard 
                        key={character.character.mal_id} 
                        character={character} 
                    />
                ))}
            </div>
        </section>
    )
}