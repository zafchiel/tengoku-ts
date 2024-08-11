"use client";

import { createContext, useState } from "react";

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
