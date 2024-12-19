import type { AnimeInfo } from "@/types";
import Link from "next/link";
import { Separator } from "../ui/separator";

type ExternalLinksSectionProps = {
  malID: AnimeInfo["mal_id"];
  externalLinks: AnimeInfo["external"];
  streamingLinks: AnimeInfo["streaming"];
};

export default function ExternalLinksSection({
  malID,
  externalLinks,
  streamingLinks,
}: ExternalLinksSectionProps) {
  return (
    <section id="external" className="scroll-mt-40">
      <h3 className="text-3xl font-semibold">External</h3>

      <Link
        href={`https://myanimelist.net/anime/${malID}`}
        className="flex gap-2 items-center text-sm underline-offset-1 underline"
      >
        Go to MyAnimeList Page
      </Link>
      <hr className="mb-2" />

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_10px_1fr] gap-4 px-2">
        <div className="p-1">
          <h5 className="font-semibold text-xl text-muted-foreground">
            External Media Links
          </h5>
          <div className="flex gap-4 flex-col items-start p-2">
            {externalLinks.length > 0 ? (
              externalLinks.map((link) => (
                <Link
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  className="underline hover:text-slate-400"
                >
                  {link.name}
                </Link>
              ))
            ) : (
              <p className="py-2">No external links available</p>
            )}
          </div>
        </div>

        <Separator orientation="vertical" className="hidden sm:block h-32" />

        <div className="p-1">
          <h5 className="font-semibold text-xl text-muted-foreground">
            Streaming Links
          </h5>
          <div className="flex gap-4 flex-col items-start p-2">
            {streamingLinks.length > 0 ? (
              streamingLinks.map((link) => (
                <Link
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  className="underline hover:text-slate-400"
                >
                  {link.name}
                </Link>
              ))
            ) : (
              <p className="py-2">No streaming links available</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
