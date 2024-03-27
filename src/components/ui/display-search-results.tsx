import { AnimeInfo, SearchResult } from "@/types";
import Link from "next/link";
import Image from "next/image";

type Props = {
  searchResults: AnimeInfo[];
};

export default function DisplaySearchResults({ searchResults }: Props) {
  if (searchResults.length === 0) return null;

  return (
    <div className="divide-y">
      {searchResults.map((result) => (
        <Link href={`/${result.mal_id}`} key={result.mal_id}>
          <div className="flex rounded-sm gap-1 p-2 hover:bg-primary-foreground">
            <Image
              width={80}
              height={100}
              src={result.images.webp.small_image_url}
              alt={result.title}
              className="rounded-sm w-20"
            />
            <div className="flex w-full flex-col justify-between text-left">
              <h3 className="text-lg font-semibold">{result.title}</h3>
              <p className="text-muted-foreground">{result.type === "Movie" || result.type === "Music" ? result.type : `${result.type} - ${result.episodes} ep`}</p>
              <p className="uppercase text-muted-foreground">{result.year ? `${result.season} - ${result.year}` : new Date(result.aired.from).getFullYear().toString()}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
