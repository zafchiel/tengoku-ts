import { AnimeInfo, SourceList } from "@/types"
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

export async function FetchAnimeInfo(params: {
  id: string
  episode_id?: string
}) {
  // Search anime by slug
  const res = await fetch(
    `https://api.consumet.org/anime/gogoanime/${params.id}`
  )
  const searchResults = await res.json()

  // Fetch detailed info of first record found
  const res2 = await fetch(
    `https://api.consumet.org/anime/gogoanime/info/${searchResults.results[0].id}`
  )
  const animeInfo: AnimeInfo = await res2.json()

  if (params.episode_id) {
    // Fetch episode urls
    const res3 = await fetch(
      `https://api.consumet.org/anime/gogoanime/watch/${params.episode_id}`
    )
    const data = await res3.json()
    const episodeSources: SourceList[] = data.sources

    return {
      animeInfo,
      episodeSources,
    }
  }

  return animeInfo
}

export function extractEpisodeNumber(episode_id: string) {
  const segments = episode_id.trim().split("-")
  const lastSegment = segments[segments.length - 1]

  const epNumber = parseInt(lastSegment)

  return epNumber
}
