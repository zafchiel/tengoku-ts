import { redirect } from "next/navigation"
import Image from "next/image"
import Description from "@/components/detailsPage/Description"
import EpisodeList from "@/components/detailsPage/EpisodeLIst"
import { Button } from "@/components/ui/button"
import { fetchAnimeInfo, fetchSource } from "@/lib/utils"
import { getXataClient } from "@/xata/xata"
import getBase64 from "@/lib/getBase64Image"

type Props = {
  params: {
    id: string
  }
}

export default async function DetailsPage({ params }: Props) {
  const xata = getXataClient()

  const animeDB = await xata.db.animes.read(params.id)

  // Search anime by slug
  const anime = await fetchAnimeInfo(params.id)
  if (animeDB === null) {
    const { episodes, ...rest } = anime
    const eps = episodes.map((ep) => ({ anime_id: anime.id, ...ep }))
    await xata.db.animes.create({ ...rest })
    const epsArr = await xata.db.episodes.create([...eps])
    epsArr.map((ep) => {
      fetchSource(ep.id).then((res) => {
        res.map(
          async (srcObj) =>
            await xata.db.sources.create({ episode_id: ep.id, ...srcObj })
        )
      })
    })
  }

  const imgBase64 = await getBase64(anime.image)

  if (!anime) redirect("/")

  return (
    <div className="w-full flex flex-col items-center pt-14">
      <div className="fixed -z-10 bg-black/80 inset-0 w-full h-screen md:hidden"></div>
      <div className="md:flex h-full">
        <div className="w-full h-full">
          <Image
            src={anime.image}
            placeholder="blur"
            blurDataURL={imgBase64}
            width={400}
            height={500}
            alt={anime.title}
            className="md:static md:h-auto fixed inset-0 h-screen w-full -z-20 object-cover"
          />
        </div>
        <div className="flex flex-col justify-start p-4 md:max-w-md lg:max-w-xl">
          <div className="flex">
            <h1 className="text-4xl font-bold uppercase">{anime.title}</h1>
            <p className="ml-1">{anime.releaseDate}</p>
          </div>
          <p className="opacity-60 mb-2">{anime.otherName}</p>
          {anime.description && <Description paragraph={anime.description} />}

          <div className="grid grid-cols-4 md:flex flex-wrap items-center justify-center opacity-70 gap-3">
            {anime.genres.map((obj) => (
              <p key={obj}>{obj}</p>
            ))}
          </div>
        </div>
      </div>
      <EpisodeList episodeList={anime.episodes}>
        <Button className="md:w-3/4 m-4 w-full">Watch Now</Button>
      </EpisodeList>
    </div>
  )
}
