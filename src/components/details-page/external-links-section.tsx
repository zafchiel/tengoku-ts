import type { AnimeInfo } from "@/types";
import Link from "next/link";

type ExternalLinksSectionProps = {
  externalLinks: AnimeInfo['external'];
  streamingLinks: AnimeInfo['streaming'];
};

export default function ExternalLinksSection({ externalLinks, streamingLinks }: ExternalLinksSectionProps) {
  return (
    <section id="external" className="scroll-mt-40">
      <h3 className="text-3xl font-semibold">External</h3>
      <hr className="mb-2" />

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-1">
          <h5 className="font-semibold text-xl text-muted-foreground">
            External Media Links
          </h5>
          <div className="flex gap-4 flex-col items-start p-2">
            {externalLinks.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                target="_blank"
                className="underline hover:text-slate-400"
              >
                {link.name}
              </Link>
            
            ))}
          </div>
        </div>

        <div className="p-1">
          <h5 className="font-semibold text-xl text-muted-foreground">
            Streaming Links
          </h5>
          <div className="flex gap-4 flex-col items-start p-2">
            {streamingLinks.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                target="_blank"
                className="underline hover:text-slate-400"
              >
                {link.name}
              </Link>
            
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
