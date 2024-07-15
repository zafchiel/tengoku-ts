import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { AnimeCharacter, AnimeInfo } from "@/types";
import { JIKAN_API_URL } from "@/lib/constants";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export default function slugify(str: string) {
	let slug = str.trim().toLowerCase();

	const accents = "àáäâèéëêìíïîòóöôùúüûñç";
	const nonAccents = "aaaaeeeeiiiioooouuuunc";

	for (let i = 0; i < accents.length; i++) {
		slug = slug.replace(new RegExp(accents[i], "g"), nonAccents[i]);
	}

	slug = slug
		.replace(/[^a-z0-9 -]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");

	return slug;
}

export const debounce = (fn: Function, delay: number) => {
	let timerId: NodeJS.Timeout;
	return (...args: any[]) => {
		clearTimeout(timerId);
		timerId = setTimeout(() => fn(...args), delay);
	};
};

export async function fetchAnimeInfoFull(animeId: string | number) {
	try {
		const data = await axios
			.get<{ data: AnimeInfo }>(JIKAN_API_URL + `/anime/${animeId}/full`)
			.then((res) => res.data.data);

		return data;
	} catch (error) {
		return null;
	}
}

export async function fetchAnimeCharacters(animeId: string | number) {
	try {
		const characters = await axios
			.get<{
				data: AnimeCharacter[];
			}>(`${JIKAN_API_URL}/anime/${animeId}/characters`)
			.then((res) => res.data.data);

		const sortedCharacters = characters.sort((a, b) => {
			if (a.role === "Main" && b.role !== "Main") {
				return -1;
			} else if (b.role === "Main" && a.role !== "Main") {
				return 1;
			} else {
				return b.favorites - a.favorites;
			}
		});

		return sortedCharacters;
	} catch (error) {
		return null;
	}
}
