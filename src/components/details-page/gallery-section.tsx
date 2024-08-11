import { JIKAN_API_URL } from "@/lib/constants";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import GalleryCard from "./gallery-card";

type GallerySectionProps = {
  animeId: number;
};

type GalleryEntry = {
  jpg: {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  };
  webp: {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  };
};

export default async function GallerySection({ animeId }: GallerySectionProps) {
  // Avoid getting rate limited
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const gallery = await axios
    .get<{ data: GalleryEntry[] }>(`${JIKAN_API_URL}/anime/${animeId}/pictures`)
    .then((res) => res.data.data)
    .catch(() => null);

  if (!gallery) {
    return (
      <section id="gallery" className="scroll-mt-40">
        <h3 className="text-3xl font-semibold">Gallery</h3>
        <hr className="mb-2" />
        <Alert variant="default" className="max-w-xl m-2">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No pictures</AlertTitle>
          <AlertDescription>
            There are no pictures for this anime yet.
          </AlertDescription>
        </Alert>
      </section>
    );
  }

  return (
    <section id="gallery" className="scroll-mt-40">
      <h3 className="text-3xl font-semibold">Gallery</h3>
      <hr className="mb-2" />
      <div className="m-2 flex flex-wrap gap-4">
        {gallery.map((image) => (
          <GalleryCard
            key={image.webp.image_url}
            src={image.webp.large_image_url}
            alt={image.webp.image_url}
          />
        ))}
      </div>
    </section>
  );
}
