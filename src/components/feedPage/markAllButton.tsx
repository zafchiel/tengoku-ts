"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type Props = {
  progress_id: string;
  user_id: string;
  totalEpisodes: number;
  anime_status: string;
};

export default function MarkAllButton({
  progress_id,
  user_id,
  totalEpisodes,
  anime_status,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const handleMarkEpisodeAsWatched = async () => {
    try {
      setIsLoading(true);
      await axios.patch("/api/user/markAsWatched", {
        user_id,
        progress_id,
        progress: totalEpisodes,
        status: anime_status === "Ongoing" ? "Watching" : "Completed",
      });
      toast({
        description: "Successfully marked episodes as watched",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong, try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      disabled={isLoading}
      onClick={handleMarkEpisodeAsWatched}
      className="w-full mt-2"
    >
      <Loader2
        className={cn("mr-2 h-4 w-4 animate-spin", {
          hidden: !isLoading,
        })}
      />
      Mark all as watched
    </Button>
  );
}
