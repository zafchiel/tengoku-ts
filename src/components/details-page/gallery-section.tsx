"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { JIKAN_API_URL } from "@/lib/constants";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import axios from "axios";
import dynamic from "next/dynamic";

const GalleryCard = dynamic(() => import("./gallery-card"), {
	ssr: false,
});

type GallerySectionProps = {
	animeId: number;
};

type GalleryEntry = {
	jpg: {
		image_url: string;
		small_image_url: string;
		large_image_url: string;
	};
	webp: {
		image_url: string;
		small_image_url: string;
		large_image_url: string;
	};
};

export default function GallerySection({ animeId }: GallerySectionProps) {
	const [gallery, setGallery] = useState<GalleryEntry[] | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const sectionRef = useRef<HTMLElement>(null);

	const fetchGallery = useCallback(async (): Promise<void> => {
		try {
			const response = await axios.get(
				`${JIKAN_API_URL}/anime/${animeId}/pictures`,
			);
			setGallery(response.data.data);
		} catch (error) {
			console.error("Error fetching gallery:", error);
			setGallery(null);
		} finally {
			setIsLoading(false);
		}
	}, [animeId]);


	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !gallery && !isLoading) {
					setIsLoading(true);
					fetchGallery();
					observer.disconnect();
				}
			},
			{ threshold: 0, rootMargin: "0px 0px 200px 0px" },
		);

		const section = sectionRef.current;

		if (section) {
			observer.observe(section);
		}

		return () => {
			if (section) {
				observer.unobserve(section);
			}
		};
	}, [gallery, isLoading, fetchGallery]);


	return (
		<section id="gallery" className="scroll-mt-40" ref={sectionRef}>
			<h3 className="text-3xl font-semibold">Gallery</h3>
			<hr className="mb-2" />
			{isLoading ? (
				<Skeleton className="w-full h-96" />
			) : !gallery || gallery.length < 1 ? (
				<Alert variant="default" className="m-2">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>No pictures</AlertTitle>
					<AlertDescription>
						There are no pictures for this anime yet.
					</AlertDescription>
				</Alert>
			) : (
				<div className="m-2 flex flex-wrap gap-4">
					{gallery.map((image) => (
						<GalleryCard
							key={image.webp.image_url}
							src={image.webp.large_image_url}
							alt={image.webp.image_url}
						/>
					))}
				</div>
			)}
		</section>
	);
}
