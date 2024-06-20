import { Button } from "@/components/ui/button";
import { addNewAnimeProgressEntry } from "@/lib/server/actions/progress-actions";
import { ProgressRecordType } from "@/lib/server/db/schema";
import { useState } from "react";
import { MessageSquarePlus } from "lucide-react";
import { toast } from "sonner";

type AddToListProps = {
  animeId: number;
  setProgressInfo: (data: ProgressRecordType) => void;
  maxEpisodes: number | null;
  animeTitle: string;
  animePoster: string | null;
};

export default function AddToList({
  animeId,
  setProgressInfo,
  maxEpisodes,
  animePoster,
  animeTitle,
}: AddToListProps) {
  const [loading, setLoading] = useState(false);

  const clickHandler = async () => {
    setLoading(true);
    const [data, error] = await addNewAnimeProgressEntry({
      animeId,
      animePoster,
      animeTitle,
      maxEpisodes,
    });
    if (error) {
      toast.error(error.data);
      return;
    }

    toast.success("Added to list");
    setProgressInfo(data);
    setLoading(false);
  };

  return (
    <Button
      onClick={clickHandler}
      loading={loading}
      disabled={loading}
      aria-disabled={loading}
      className="capitalize flex gap-2 items-center w-full"
    >
      <MessageSquarePlus />
      Add To List
    </Button>
  );
}
