import { fetchAnimeCharacters, fetchAnimeInfoFull } from "@/lib/utils";
import CharacterCard from "@/components/detailsPage/character-card";

type AllCharactersPageProps = {
    params: {
        animeId: string;
    }
}

export default async function AllCharactersPage({ params: { animeId } }: AllCharactersPageProps) {
    const promises = [
        fetchAnimeCharacters(animeId),
        fetchAnimeInfoFull(animeId)
    ] as const;

    const [characters, animeInfo] = await Promise.all(promises);
    return (
        <main className="container space-y-8 px-2 md:px-4 md:py-14 md:mt-10">
            <h2 className="text-5xl"><span className="text-muted-foreground">characters: </span>{animeInfo.title}</h2>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {characters.map((character) => (
                    <CharacterCard key={character.character.mal_id} character={character}/>
                ))}
            </section>
        </main>
    );
}