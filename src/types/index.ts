export type TopAiring = {
  mal_id: number
  url: string
  images: {
    jpg: {
      image_url: string
      small_image_url: string
      large_image_url: string
    }
    webp: {
      image_url: string
      small_image_url: string
      large_image_url: string
    }
  }
  trailer: {
    youtube_id: string
    url: string
    embed_url: string
  }
  approved: boolean
  titles: [
    {
      type: string
      title: string
    }
  ]
  title: string
  title_english: string
  title_japanese: string
  title_synonyms: string[]
  type: string
  source: string
  episodes: number
  status: string
  airing: boolean
  aired: {
    from: string
    to: string
    prop: {
      from: {
        day: number
        month: number
        year: number
      }
      to: {
        day: number
        month: number
        year: number
      }
      string: string
    }
  }
  duration: string
  rating: string
  score: number
  scored_by: number
  rank: number
  popularity: number
  members: number
  favorites: number
  synopsis: string
  background: string
  season: string
  year: number
  broadcast: {
    day: string
    time: string
    timezone: string
    string: string
  }
  producers: [
    {
      mal_id: number
      type: string
      name: string
      url: string
    }
  ]
  licensors: [
    {
      mal_id: number
      type: string
      name: string
      url: string
    }
  ]
  studios: [
    {
      mal_id: number
      type: string
      name: string
      url: string
    }
  ]
  genres: [
    {
      mal_id: number
      type: string
      name: string
      url: string
    }
  ]
  explicit_genres: [
    {
      mal_id: number
      type: string
      name: string
      url: string
    }
  ]
  themes: [
    {
      mal_id: number
      type: string
      name: string
      url: string
    }
  ]
  demographics: [
    {
      mal_id: number
      type: string
      name: string
      url: string
    }
  ]
}

export type SearchResult = {
  id: string
  title: string
  image: string
  releaseDate: string | null
  subOrDub: "sub" | "dub"
}

export type AnimeInfo = {
  id: string
  title: string
  url: string
  image: string
  releaseDate: string | null
  description: string | null
  genres: string[]
  subOrDub: string
  type: string | null
  status: string
  otherName: string | null
  totalEpisodes: number
  episodes: [
    {
      id: string
      number: number
      url: string
    }
  ]
}

export type EpisodeList = {
  id: string
  number: number
  url: string
}[]

export type SourceList = {
    url: string
    isM3U8: boolean
    quality: string
}