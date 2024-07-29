"use client";

import Image from "next/image";

type GalleryCardProps = {
	src: string;
	alt: string;
};

export default function GalleryCard(props: GalleryCardProps) {
	return <Image {...props} width={200} height={300} className="rounded-md" />;
}
