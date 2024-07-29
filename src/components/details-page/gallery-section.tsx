import { JIKAN_API_URL } from "@/lib/constants"
import axios from "axios"

type GallerySectionProps = {
  animeId: number
}

export default async function GallerySection({ animeId }: GallerySectionProps) {

  // const gallery = await axios.get(JIKAN_API_URL + `/anime/${animeId}/pictures`).then(res => res.data.data).catch(err => console.error(err));

  // if (!gallery) {
  //   return null;
  // }


  return (
    <section id="gallery" className="scroll-mt-40">
      <h3 className="text-3xl font-semibold">Gallery</h3>
      <hr className="mb-2" />
    </section>
  )
}