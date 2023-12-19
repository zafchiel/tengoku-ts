"use client";

import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

export default function SearchDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Search />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Anime Search</DialogTitle>
          <DialogDescription>Search for a series or a movie</DialogDescription>
        </DialogHeader>

        {/* Search Results */}
        <div>
          <p>Seach results</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
