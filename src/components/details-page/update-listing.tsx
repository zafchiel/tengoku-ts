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
import { updateAnimeProgressEntry } from "@/lib/server/actions/progress-actions";
import { ProgressRecordType, WATCHING_STATUSES } from "@/lib/server/db/schema";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { useServerAction } from "zsa-react";

const SCORES = [
  [10, "Masterpiece"],
  [9, "Great"],
  [8, "Very Good"],
  [7, "Good"],
  [6, "Fine"],
  [5, "Average"],
  [4, "Bad"],
  [3, "Very Bad"],
  [2, "Horrible"],
  [1, "Appaling"],
  [0, "None"],
] as const;

type UpdateListingProps = {
  progressInfo: ProgressRecordType;
};

export default function UpdateListing({ progressInfo }: UpdateListingProps) {
  const { isPending, execute, isSuccess, data, isError, error } =
    useServerAction(updateAnimeProgressEntry);

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        const formData = new FormData(form);
        formData.append("animeId", progressInfo.animeId.toString());
        const [data, error] = await execute(formData);

        if (data === null) {
          toast.error("You must be authenticated");
          return;
        } else if (error) {
          toast.error("Something went wrong");
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
