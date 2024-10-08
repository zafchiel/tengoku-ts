import type { ProgressRecordType } from "@/lib/server/db/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CircleCheckBig, Star } from "lucide-react";
import Link from "next/link";
import DeleteSeriesProgressEntryButton from "./delete-series-progress-entry-button";
import MarkSeriesCompletedButton from "./mark-series-completed-button";
import EditProgressForm from "./edit-progress-form";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import IncrementEpisodesButton from "./increment-episodes-button";
import { cn } from "@/lib/utils";
import useProgressRecords from "@/hooks/use-progress-records";

type EditSeriesProgressCardProps = {
  progressInfo: ProgressRecordType;
};

export default function EditSeriesProgressCard({
  progressInfo,
}: EditSeriesProgressCardProps) {
  const { deleteProgressEntry, isMutating } = useProgressRecords();

  return (
    <Card
      className={cn(
        "max-w-md w-full",
        isMutating && "animate-pending-pulse pointer-events-none"
      )}
      aria-disabled={isMutating}
    >
      <CardContent className="grid grid-cols-[100px_1fr] gap-4 p-4 h-full relative overflow-hidden">
        {progressInfo.animePoster && (
          <Link href={`/anime/${progressInfo.animeId}`}>
            <Image
              src={progressInfo.animePoster}
              alt="Series Thumbnail"
              className="rounded-sm"
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
              <p className="text-sm">
                {progressInfo.episodesWatched}
                {progressInfo.maxEpisodes && (
                  <span>/{progressInfo.maxEpisodes}</span>
                )}
              </p>
            </div>
          ) : (
            <div>
              <p>
                <span className="font-semibold text-xl">
                  {progressInfo.episodesWatched}
                </span>
                &nbsp;
                <span className="text-sm text-muted-foreground">
                  {" "}
                  Episodes watched
                </span>
              </p>
              <p className="text-sm">Currently Airing</p>

              {/* Visual indicator that anime is still ongoin */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="absolute -top-2 right-0 w-2 h-8 bg-primary -rotate-45"
                    aria-label="Anime is currently airing"
                  ></div>
                </TooltipTrigger>

                <TooltipContent>
                  <p className="text-xs">Anime is Currently Airing</p>
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>

        <DeleteSeriesProgressEntryButton
          animeTitle={progressInfo.animeTitle}
          deleteProgressEntry={() =>
            deleteProgressEntry({ progressId: progressInfo.id })
          }
        />
        <div className="flex gap-2 flex-wrap">
          {progressInfo.status !== "Completed" ? (
            <MarkSeriesCompletedButton
              maxEpisodes={progressInfo.maxEpisodes}
              progressId={progressInfo.id}
            />
          ) : (
            <Button variant="outline" disabled={true}>
              Completed
              <CircleCheckBig size={14} className="ml-2" />
            </Button>
          )}
          <EditProgressForm progressInfo={progressInfo} />

          <IncrementEpisodesButton progressInfo={progressInfo} />
        </div>
      </CardContent>
    </Card>
  );
}
