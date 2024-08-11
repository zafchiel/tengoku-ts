"use client";

import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

type DeleteSeriesProgressEntryButtonProps = {
  progressId: number;
  animeTitle: string;
  deleteProgressEntry: () => void;
};

export default function DeleteSeriesProgressEntryButton({
  animeTitle,
  progressId,
  deleteProgressEntry,
}: DeleteSeriesProgressEntryButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          Delete
          <Trash size={14} className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            You will delete &nbsp;
            <span className="font-semibold text-teal-300">{animeTitle}</span>
            &nbsp; from your watchlist.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={deleteProgressEntry}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
