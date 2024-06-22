import { ProgressRecordType } from "@/lib/server/db/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CircleCheckBig, PenIcon, Star } from "lucide-react";
import Link from "next/link";
import DeleteSeriesProgressEntryButton from "./delete-series-progress-entry-button";
import MarkSeriesCompletedButton from "./mark-series-completed-button";
import EditProgressForm from "./edit-progress-form";

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
        <div className="grid gap-3">
          <div>
            <Link href={`/anime/${progressInfo.animeId}`}>
              <h3 className="text-lg font-medium">{progressInfo.animeTitle}</h3>
            </Link>
            <p className="text-muted-foreground flex gap-1 items-center">
              <Star size={16} />
              {progressInfo.score}
            </p>
            <p className="text-sm text-muted-foreground">
              {progressInfo.status}
            </p>
          </div>
          {progressInfo.maxEpisodes ? (
            <div className="flex items-center gap-2">
              <Progress
                value={
                  (progressInfo.episodesWatched / progressInfo.maxEpisodes) *
                  100
                }
                className="h-2"
              />
              <p className="text-sm text-muted-foreground">
                {progressInfo.episodesWatched}
                {progressInfo.maxEpisodes && (
                  <span>/{progressInfo.maxEpisodes}</span>
                )}
              </p>
            </div>
          ) : (
            <p>Currently Airing</p>
          )}
          <div className="flex items-center justify-between">
            <DeleteSeriesProgressEntryButton
              animeTitle={progressInfo.animeTitle}
              progressId={progressInfo.id}
            />
            {progressInfo.status !== "Completed" ? (
              <MarkSeriesCompletedButton
                maxEpisodes={progressInfo.maxEpisodes}
                progressId={progressInfo.id}
              />
            ) : (
              <Button variant="outline" size="sm" disabled={true}>
                Completed
                <CircleCheckBig className="w-4 h-4 ml-2" />
              </Button>
            )}
            <EditProgressForm progressInfo={progressInfo} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
