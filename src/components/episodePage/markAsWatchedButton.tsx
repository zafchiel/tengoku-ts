"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { useSession } from "next-auth/react";

type Props = {
  anime_id: string;
  epNumber: number;
  animeLength: number;
};
export default function MarkAsWatchedButton({
  anime_id,
  epNumber,
  animeLength,
}: Props) {
  const [markedAsWatched, setMarkedAsWatched] = useState(false);
  const { toast } = useToast();
  const { data: session } = useSession();

  const handleButtonClick = async () => {
    if (!session?.user?.id) {
      toast({
        description: "You need to be logged in to mark episodes as watched",
      });
      return;
    }
    // API call to fetch progress and update it
    try {
      const { data } = await axios.get("/api/user/getProgress", {
        params: {
          anime_id,
          user_id: session.user.id,
        },
      });
      // If progress record doesn't exist - create new one
      if (!data) {
        await axios.patch(`/api/user/markAsWatched`, {
          user_id: session.user.id,
          anime_id,
          progress: epNumber,
          status: epNumber === animeLength ? "Completed" : "Watching",
        });
        setMarkedAsWatched(true);
        toast({
          description: "Episode marked as watched",
        });
      }

      // Porgress record exist - update
      if (data) {
        await axios.patch(`/api/user/markAsWatched`, {
          user_id: session.user.id,
          anime_id,
          progress_id: data.id,
          progress: epNumber,
          status: epNumber === animeLength ? "Completed" : "Watching",
        });
        setMarkedAsWatched(true);
        toast({
          description: "Episode marked as watched",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    }
  };
  return (
    <Button
      variant="outline"
      disabled={markedAsWatched}
      onClick={handleButtonClick}
      className={cn("w-full p-4 uppercase font-semibold", {
        "bg-muted-foreground": markedAsWatched,
      })}
    >
      Mark as watched to this point
    </Button>
  );
}
