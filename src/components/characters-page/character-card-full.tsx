import { cn } from "@/lib/utils";
import { AnimeCharacter } from "@/types";
import { Star } from "lucide-react";
import Image from "next/image";

type CharacterCardFullProps = {
    character: AnimeCharacter;
}

export default function CharacterCardFull({ character }: CharacterCardFullProps) {

    const japaneseVoiceActor = character.voice_actors.find((actor) => actor.language === "Japanese");

    return (
        <div className={cn("flex flex-col sm:flex-row gap-2 justify-between rounded-sm p-2", {
            "bg-muted-foreground/10": character.role === "Main",
            "bg-accent/20": character.role === "Supporting"
        })}>
            <div className="flex gap-2 place-self-start">
                <Image
                    src={character.character.images.webp.image_url}
                    alt={`${character.character.name} thumbnail`}
                    width={100}
                    height={130}
                    className="rounded-sm"
                />
                <div>
                    <p className="font-semibold">{character.character.name}</p>
                    <p className="text-muted-foreground">{character.role}</p>
                    <p className="text-muted-foreground flex gap-1">
                        <Star size={19}/>
                        {character.favorites.toLocaleString()}
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                {character.voice_actors.map((actor) => (
                    <div key={actor.person.mal_id} className="flex place-self-end items-end gap-2">
                        <div className="text-right">
                            <p className="text-muted-foreground">{actor.language}</p>
                            <p className="font-semibold">{actor.person.name}</p>
                        </div>

                        <Image
                            src={actor.person.images.jpg.image_url}
                            alt={`${actor.person.name} thumbnail`}
                            width={100}
                            height={130}
                            className="rounded-sm"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}