"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type GalleryCardProps = {
  thumbnail: string;
  large: string;
  alt: string;
};

export default function GalleryCard(props: GalleryCardProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Image
          src={props.thumbnail}
          width={400}
          height={500}
          className="rounded-md max-w-full h-full object-cover hover:scale-105 transition-all duration-300"
          alt={props.alt}
        />
      </DialogTrigger>
      <DialogContent className="pt-10">
        <DialogTitle className="sr-only">Large image</DialogTitle>
        <Image
          src={props.large}
          width={600}
          height={900}
          className="rounded-md"
          alt={props.alt}
        />
      </DialogContent>
    </Dialog>
  );
}
