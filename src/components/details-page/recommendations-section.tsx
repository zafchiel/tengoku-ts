"use client";

import axios from "axios";
import type { Recommendation } from "@/types";
import { JIKAN_API_URL } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";

type RecommendationsSectionProps = {
	animeId: string | number;
};

export default function RecommendationsSection({
	animeId,
}: RecommendationsSectionProps) {
	const [recommendations, setRecommendations] = useState<
		Recommendation[] | null
	>(null);
	const [isLoading, setIsLoading] = useState(false);
	const sectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !recommendations && !isLoading) {
					setIsLoading(true);
					fetchRecommendations();
					observer.disconnect();
				}
			},
			{ threshold: 0, rootMargin: "0px 0px 200px 0px" },
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => {
			if (sectionRef.current) {
				observer.unobserve(sectionRef.current);
			}
		};
	}, [recommendations, isLoading]);

	const fetchRecommendations = async () => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 3000));
			const response = await axios.get<{ data: Recommendation[] }>(
				`${JIKAN_API_URL}/anime/${animeId}/recommendations`,
			);
			setRecommendations(response.data.data);
		} catch (error) {
			console.error(error);
			setRecommendations([]);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section id="recommendations" className="scroll-mt-40" ref={sectionRef}>
			<h3 className="text-3xl font-semibold">Recommendations</h3>
			<p className="text-muted-foreground">
				These anime were voted as simillar by community
			</p>
			<hr className="mb-2" />

			{isLoading ? (
				<Skeleton className="w-full h-96" />
			) : !recommendations ? (
				<Alert variant="default" className="m-2">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>No recommendations</AlertTitle>
					<AlertDescription>
						There are no recommendations for this anime yet.
					</AlertDescription>
				</Alert>
			) : (
				<div className="grid grid-cols-3 gap-4 px-2">
					{recommendations.map((recommendation) => (
						<Link
							key={recommendation.url}
							href={`/anime/${recommendation.entry.mal_id}`}
						>
							<div className="relative h-full aspect-[4/5] w-full overflow-hidden rounded-md shadow-md">
								<Image
									width={400}
									height={500}
									src={recommendation.entry.images.webp.large_image_url}
									alt={recommendation.entry.title}
									className="w-full h-full rounded-lg hover:scale-105 duration-200 ease-linear"
								/>
								<div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-background to-transparent px-2 pb-1 pt-10">
									<p className="font-semibold text-lg">
										{recommendation.entry.title}
									</p>
									<div className="flex flex-col text-gray-300">
										<p>
											Votes:&nbsp;
											<span className="font-semibold">
												{recommendation.votes}
											</span>
										</p>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			)}
		</section>
	);
}
