"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { updateAnimeProgressEntryByForm } from "@/lib/server/actions/progress-actions";
import { ProgressRecordType, WATCHING_STATUSES } from "@/lib/server/db/schema";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { useServerAction } from "zsa-react";
import { SCORES } from "@/lib/server/db/schema";

type UpdateListingProps = {
  progressInfo: ProgressRecordType;
  maxEpisodes: number | null;
};

export default function UpdateListing({
  progressInfo,
  maxEpisodes,
}: UpdateListingProps) {
  const { isPending, execute } = useServerAction(
    updateAnimeProgressEntryByForm
  );

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        const formData = new FormData(form);
        formData.append("animeId", progressInfo.animeId.toString());
        if (formData.get("status") === "Completed" && maxEpisodes !== null) {
          formData.set("episodesWatched", maxEpisodes.toString());
        }

        const [, error] = await execute(formData);

        if (error) {
          toast.error(error.data);
          return;
        }

        toast.success("Updated progress");
        return;
      }}
      className="flex gap-3 items-end flex-wrap md:flex-nowrap"
    >
      <div className="w-full">
        <Label htmlFor="status" className="text-muted-foreground">
          Watching status
        </Label>
        <Select name="status" defaultValue={progressInfo.status}>
          <SelectTrigger id="status">
            <SelectValue placeholder={progressInfo.status} />
          </SelectTrigger>
          <SelectContent>
            {WATCHING_STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full">
        <Label htmlFor="score" className="text-muted-foreground">
          Score
        </Label>
        <Select name="score" defaultValue={progressInfo.score.toString()}>
          <SelectTrigger id="score" className="relative" star={true}>
            <SelectValue
              defaultValue={progressInfo.score}
              placeholder={progressInfo.score}
            />
          </SelectTrigger>
          <SelectContent>
            {SCORES.map(([score, name]) => (
              <SelectItem
                key={name}
                value={score.toString()}
              >{`${score} - ${name}`}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="default"
              type="submit"
              disabled={isPending}
              className="w-full md:w-24"
            >
              {isPending ? <Loader2 className="animate-spin" /> : <Save />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Save</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  );
}
