import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Separator } from "../ui/separator";

type Props = {
  mal_id: number;
};

export default function AnimePosters({mal_id}: Props) {
  const [animePics, setAnimePics] = useState<any>([]);

    
    useEffect(() => {
        const fetchAnimePosters = async () => {
            try {
              // Fetch anime posters
              const {
                data: { data: animePicturesData },
              } = await axios.get(
                `https://api.jikan.moe/v4/anime/${mal_id}/pictures`
              );
              setAnimePics(animePicturesData);
            } catch (error) {
              console.log(error);
            }
          };

          fetchAnimePosters();
    })

    if(animePics.length < 1) return null;

    return (
        <>
              <div className="flex flex-col">
                <h2 className="text-3xl font-bold uppercase">Posters</h2>
                <div className="flex flex-col gap-2">
                  {animePics?.map((obj: any) => (
                    <Image
                      key={obj.webp.large_image_url}
                      src={obj.webp.large_image_url}
                      width={300}
                      height={500}
                      alt="image"
                    />
                  ))}
                </div>
              </div>
              <Separator orientation="vertical" className="mx-4" />
            </>
    )
}