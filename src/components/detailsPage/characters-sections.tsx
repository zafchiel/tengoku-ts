import { JIKAN_API_URL } from "@/lib/constants";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { AnimeCharacters } from "@/types";

type CharactersSectionProps = {
    animeId: number;
}

export default async function CharactersSection({ animeId }: CharactersSectionProps) {
    await new Promise<void>((resolve, reject) => {
        setTimeout(() => {resolve()}, 3000)
    })
    const characters = await axios.get<{data: AnimeCharacters }>(`${JIKAN_API_URL}/anime/${animeId}/characters`).then(res => res.data.data);

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
            <h3 className="text-3xl">Characters</h3>
            <div>
                {characters.map((character) => (
                    <p key={character.character.mal_id}>{character.role} - {character.character.name}</p>
                ))}
            </div>
        </section>
    )
}