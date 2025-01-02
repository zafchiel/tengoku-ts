"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type GalleryCardProps = {
  src: string;
  alt: string;
};

export default function GalleryCard(props: GalleryCardProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Image
          {...props}
          width={200}
          height={300}
          className="rounded-md aspect-[2/3] max-w-full h-full object-cover hover:scale-105 transition-all duration-300"
          alt={props.alt}
        />
      </DialogTrigger>
      <DialogContent className="pt-10">
        <DialogTitle className="sr-only">Large image</DialogTitle>
        <Image
          {...props}
          width={600}
          height={900}
          className="rounded-md"
          alt={props.alt}
        />
      </DialogContent>
    </Dialog>
  );
}
