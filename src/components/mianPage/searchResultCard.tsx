import { SearchResult } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

type Props = {
  ep: SearchResult;
};

export default function SearchResultCard({ ep }: Props) {
  const [imgSrc, setImgSrc] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const { data } = await axios.get("api/getImage", {
          params: {
            img: ep.image,
          },
        });
        setImgSrc(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsMounted(true);
      }
    };

    fetchImage();
  }, [ep.image]);

  if (!isMounted) return <Skeleton className="w-full aspect-[4/5]" />;

  return (
    <div className="relative h-full aspect-[4/5] w-full overflow-hidden rounded-md shadow-md">
      <Link href={`/${ep.id}`}>
        <Image
          width={400}
          height={500}
          src={ep.image}
          placeholder="blur"
          blurDataURL={imgSrc}
          alt={ep.title}
          className="w-full h-full rounded-lg hover:scale-125 duration-200 ease-linear"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-background to-transparent px-2 pb-1 pt-10">
          <p className="font-semibold">{ep.title}</p>
          <div className="flex flex-col text-gray-300">
            <p>
              Type:&nbsp;<span className="font-semibold">{ep.subOrDub}</span>
            </p>
            <p>{ep.releaseDate}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
