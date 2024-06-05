import type { AnimeInfo } from "@/types";
import Link from "next/link";

type ExternalLinksSectionProps = {
  externalLinks: AnimeInfo['external'];
};

export default function ExternalLinksSection({ externalLinks }: ExternalLinksSectionProps) {
  return (
    <section id="external" className="scroll-mt-40">
      <h3 className="text-3xl font-semibold">External</h3>
      <hr className="mb-2" />
      <div className="flex gap-4 flex-wrap">
        {externalLinks.map((link) => (
          <Link
            key={link.url}
            href={link.url}
            target="_blank"
            className="underline hover:text-slate-400"
          >
            <span>{link.name}</span>
            {/* <ExternalLinkIcon className="h-5 w-5" /> */}
          </Link>
        
        ))}
      </div>
    </section>
  );
}
