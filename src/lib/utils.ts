import { AnimeInfo, SearchResult, SourceList } from "@/types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function slugify(str: string) {
  let slug = str.trim().toLowerCase()

  const accents = "àáäâèéëêìíïîòóöôùúüûñç"
  const nonAccents = "aaaaeeeeiiiioooouuuunc"

  for (let i = 0; i < accents.length; i++) {
    slug = slug.replace(new RegExp(accents[i], "g"), nonAccents[i])
  }

  slug = slug
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")

  return slug
}

export async function fetchAnimeInfo(anime_id: string, episode_id?: string) {
  // Search anime by slug
  const res = await fetch(
    `https://api.consumet.org/anime/gogoanime/${anime_id}`
  )
  const searchResults = await res.json()

  // Fetch detailed info of first record found
  const res2 = await fetch(
    `https://api.consumet.org/anime/gogoanime/info/${searchResults.results[0].id}`
  )
  const animeInfo: AnimeInfo = await res2.json()

  return animeInfo
}

export function extractEpisodeNumber(episode_id: string) {
  const segments = episode_id.trim().split("-")
  const lastSegment = segments[segments.length - 1]

  const epNumber = parseInt(lastSegment)

  return epNumber
}

export function extractNameAndEpisode(episode_id: string) {
  const segments = episode_id.trim().split("-")
  const episode = parseInt(segments[segments.length - 1])
  const name = segments.slice(0, -2).join(" ")

  return { name, episode }
}

export const debounce = (fn: Function, delay: number) => {
  let timerId: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timerId)
    timerId = setTimeout(() => fn(...args), delay)
  }
}
