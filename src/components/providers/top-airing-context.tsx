"use client";

import { createContext, useEffect, useState } from "react";
import { JIKAN_API_TOP_ANIME_URL } from "@/lib/constants";
import type { AnimeInfo } from "@/types";
import axios from "axios";

// import { setupCache } from "axios-cache-interceptor";

// const instance = Axios.create();
// const axios = setupCache(instance);

type TopAiringContext = {
	currentAnimeIndex: number;
	setCurrentAnimeIndex: (index: number) => void;
};

export const TopAiringContext = createContext<TopAiringContext>({
	currentAnimeIndex: 0,
	setCurrentAnimeIndex: () => {},
});

type TopAiringContextProviderProps = {
	children: React.ReactNode;
};

export function TopAiringContextProvider({
	children,
}: TopAiringContextProviderProps) {
	const [currentAnimeIndex, setCurrentAnimeIndex] = useState(0);

	// useEffect(() => {
	// 	const fetchTopAiring = async () => {
	// 		try {
	// 			const response = await axios.get(JIKAN_API_TOP_ANIME_URL, {
	// 				params: {
	// 					filter: "airing",
	// 					limit: "6",
	// 				},
	// 			});

	// 			setTopAiring(response.data.data);
	// 		} catch (error) {
	// 			console.log(error);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};

	// 	fetchTopAiring();
	// }, []);

	const value = {
		currentAnimeIndex,
		setCurrentAnimeIndex,
	};

	return (
		<TopAiringContext.Provider value={value}>
			{children}
		</TopAiringContext.Provider>
	);
}
