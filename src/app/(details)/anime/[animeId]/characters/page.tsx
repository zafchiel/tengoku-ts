import { fetchAnimeCharacters, fetchAnimeInfoFull } from "@/lib/utils";
import CharacterCardFull from "@/components/characters-page/character-card-full";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type AllCharactersPageProps = {
  params: Promise<{
    animeId: string;
  }>;
};

export default async function AllCharactersPage(props: AllCharactersPageProps) {
  const params = await props.params;

  const {
    animeId
  } = params;

  const promises = [
    fetchAnimeCharacters(animeId),
    fetchAnimeInfoFull(animeId),
  ] as const;

  const [characters, animeInfo] = await Promise.all(promises);

  if (!characters || characters.length < 1 || !animeInfo) {
    return (
      <section>
        <Alert variant="destructive">
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
    <main className="container space-y-8 px-2 md:px-4 md:py-14 md:mt-10">
      <h2 className="text-3xl md:text-5xl">
        <span className="text-muted-foreground">characters: </span>
        <a href={`/anime/${animeId}`}>{animeInfo.title}</a>
      </h2>
      <a
        href={`/anime/${animeId}`}
        className="underline underline-offset-2 text-sm"
      >
        go back to anime details
      </a>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm md:text-base">
        {characters.map((character) => (
          <CharacterCardFull
            key={character.character.mal_id}
            character={character}
          />
        ))}
      </section>
    </main>
  );
}
