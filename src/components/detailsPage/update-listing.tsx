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
import { updateAnimeProgress } from "@/lib/server/actions/progress-actions";
import { ProgressRecordType, WATCHING_STATUSES } from "@/lib/server/db/schema";
import { useState } from "react";
import { toast } from "sonner";

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
  const [loading, setLoading] = useState(false);

  const submitAction = async (formData: FormData) => {
    setLoading(true);
    formData.append("animeId", progressInfo.animeId.toString());

    const res = await updateAnimeProgress(formData);

    if (res.error === null && res.data) {
      toast.success("List entry saved");
    } else if (res.error) {
      toast.error(res.error);
    }

    setLoading(false);
  };

  return (
    <form action={submitAction} className="flex gap-3 flex-wrap md:flex-nowrap">
      <Select name="status" defaultValue={progressInfo.status}>
        <SelectTrigger className="">
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

      <Select name="score" defaultValue={progressInfo.score.toString()}>
        <SelectTrigger className="">
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

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="default"
              type="submit"
              disabled={loading}
              className="w-full md:w-24"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Save />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Save</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  );
}
