import { cn } from "@/lib/utils";
import type { AnimeCharacter } from "@/types";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type CharacterCardProps = {
  character: AnimeCharacter;
};

export default function CharacterCard({ character }: CharacterCardProps) {
  const japaneseVoiceActor = character.voice_actors.find(
    (actor) => actor.language === "Japanese"
  );

  return (
    <Link
      target="_blank"
      href={`https://myanimelist.net/character/${character.character.mal_id}`}
      className={cn(
        "grid min-w-0 grid-cols-1 grid-rows-5 rounded-sm p-2 hover:bg-primary/40 hover:scale-[1.02] transition-transform duration-200",
        {
          "bg-muted-foreground/30": character.role === "Main",
          "bg-accent/20": character.role === "Supporting",
        }
      )}
    >
      <div className="flex min-w-0 gap-2 col-start-1 col-end-2 row-start-1 row-end-4">
        <Image
          src={character.character.images.webp.image_url}
          alt={`${character.character.name} thumbnail`}
          width={100}
          height={150}
          className="rounded-sm aspect-[2/3]"
        />
        <div>
          <p className="font-semibold">{character.character.name}</p>
          <p className="text-muted-foreground">{character.role}</p>
          <p className="text-muted-foreground flex gap-1">
            <Star size={19} />
            {character.favorites.toLocaleString()}
          </p>
        </div>
      </div>

      {!!japaneseVoiceActor && (
        <div className="flex min-w-0 place-self-end items-end gap-2 col-start-1 col-end-2 row-start-3 row-end-6">
          <div className="text-right">
            <p className="text-muted-foreground">
              {japaneseVoiceActor.language}
            </p>
            <p className="font-semibold">{japaneseVoiceActor.person.name}</p>
          </div>

          <Image
            src={japaneseVoiceActor.person.images.jpg.image_url}
            alt={`${japaneseVoiceActor.person.name} thumbnail`}
            width={100}
            height={150}
            className="rounded-sm aspect-[2/3]"
          />
        </div>
      )}
    </Link>
  );
}
