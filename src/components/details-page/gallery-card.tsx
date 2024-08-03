"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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
					className="rounded-md"
					alt={props.alt}
				/>
			</DialogTrigger>
			<DialogContent className="pt-10">
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
