import { createContext, useEffect, useState } from "react";
import { JIKAN_TOP_ANIME_URL } from "@/lib/constants";
import { AnimeInfo } from "@/types";
import axios from "axios";
// import { setupCache } from "axios-cache-interceptor";

// const instance = Axios.create();
// const axios = setupCache(instance);

type TopAiringContext = {
  topAiring: AnimeInfo[];
  currentAnimeIndex: number;
  setCurrentAnimeIndex: (index: number) => void;
  loading: boolean;
};

export const TopAiringContext = createContext<TopAiringContext>({
  topAiring: [],
  currentAnimeIndex: 0,
  setCurrentAnimeIndex: () => {},
  loading: true,
});

type TopAiringContextProviderProps = {
  children: React.ReactNode;
};

export function TopAiringContextProvider({
  children,
}: TopAiringContextProviderProps) {
  const [topAiring, setTopAiring] = useState<AnimeInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentAnimeIndex, setCurrentAnimeIndex] = useState(0);

  useEffect(() => {
    const fetchTopAiring = async () => {
      try {
        const response = await axios.get(JIKAN_TOP_ANIME_URL, {
          params: {
            filter: "airing",
            limit: "6",
          },
        });

        setTopAiring(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopAiring();
  }, []);

  const value = {
    topAiring,
    currentAnimeIndex,
    setCurrentAnimeIndex,
    loading,
  };

  return (
    <TopAiringContext.Provider value={value}>
      {children}
    </TopAiringContext.Provider>
  );
}
