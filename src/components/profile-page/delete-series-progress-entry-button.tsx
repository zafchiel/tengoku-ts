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
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type DeleteSeriesProgressEntryButtonProps = {
  progressId: number;
  animeTitle: string;
};

export default function DeleteSeriesProgressEntryButton({
  animeTitle,
  progressId,
}: DeleteSeriesProgressEntryButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete
          <Trash className="w-4 h-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            You will delete{" "}
            <span className="font-semibold text-primary">{animeTitle}</span>{" "}
            from your watchlist.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button>Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
