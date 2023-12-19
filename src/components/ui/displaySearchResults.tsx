import { SearchResult } from "@/types";
import Link from "next/link";
import Image from "next/image";

type Props = {
  searchResults: SearchResult[];
};

export default function DisplaySearchResults({ searchResults }: Props) {
  if (searchResults.length === 0) return null;

  return (
    <div>
      {searchResults.map((result) => (
        <Link href={`/${result.id}`} key={result.id}>
          <div className="flex h-24 rounded-md gap-2 border-b border-dashed p-4 hover:bg-primary-foreground">
            <Image
              width={40}
              height={55}
              src={result.image}
              alt={result.title}
            />
            <div className="flex w-full flex-col justify-between text-left">
              <h3 className="text-base text-white">{result.title}</h3>
              <h3 className="text-sm text-white/70">{result.releaseDate}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
