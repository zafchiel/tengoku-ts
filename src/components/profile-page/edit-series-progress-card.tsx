import { ProgressRecordType } from "@/lib/server/db/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CircleCheckBig, PenIcon, Trash } from "lucide-react";
import Link from "next/link";

type EditSeriesProgressCardProps = {
  progressInfo: ProgressRecordType;
};

export default function EditSeriesProgressCard({
  progressInfo,
}: EditSeriesProgressCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardContent className="grid grid-cols-[100px_1fr] gap-4 p-4">
        {progressInfo.animePoster && (
          <Link href={`/anime/${progressInfo.animeId}`}>
            <Image
              src={progressInfo.animePoster}
              alt="Series Thumbnail"
              className="rounded-md"
              width={100}
              height={150}
            />
          </Link>
        )}
        <div className="space-y-3">
          <div>
            <Link href={`/anime/${progressInfo.animeId}`}>
              <h3 className="text-lg font-medium">{progressInfo.animeTitle}</h3>
            </Link>
            <p className="text-sm text-muted-foreground">
              {progressInfo.status}
              &nbsp;|&nbsp;
              {progressInfo.episodesWatched}/{progressInfo.maxEpisodes}
            </p>
          </div>
          {progressInfo.maxEpisodes && (
            <Progress
              value={
                (progressInfo.episodesWatched / progressInfo.maxEpisodes) * 100
              }
              className="w-full h-2"
            />
          )}
          <div className="flex items-center justify-between">
            <Button variant="destructive" size="sm">
              Delete
              <Trash className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={progressInfo.status === "Completed"}
            >
              Complete
              <CircleCheckBig className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="ghost" size="sm">
              Edit
              <PenIcon className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
