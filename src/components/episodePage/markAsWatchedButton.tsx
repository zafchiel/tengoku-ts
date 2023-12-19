"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

type Props = {
  animeStatus: string;
  anime_id: string;
  epNumber: number;
  animeLength: number;
};
export default function MarkAsWatchedButton({
  animeStatus,
  anime_id,
  epNumber,
  animeLength,
}: Props) {
  const [markedAsWatched, setMarkedAsWatched] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [userProgress, setUserProgess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const { data: session } = useSession();

  const handleButtonClick = async () => {
    if (!session?.user?.id) {
      toast({
        description: "You need to be logged in to mark episodes as watched",
      });
      return;
    }

    // Check status of anime
    let watchingStatus = "Watching";
    if (animeStatus === "Completed") {
      if (epNumber === animeLength) watchingStatus = "Completed";
    }

    // API call to fetch progress and update it
    setIsLoading(true);
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
          status: watchingStatus,
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
          status: watchingStatus,
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkIfAnimeIsFollowed = async () => {
      if (!session?.user?.id) {
        return;
      }
      setIsLoading(true);
      try {
        const { data } = await axios.get("/api/user/getProgress", {
          params: {
            anime_id,
            user_id: session.user.id,
          },
        });
        if (data) {
          setUserProgess(data);
          setIsFollowed(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    checkIfAnimeIsFollowed();
  }, [anime_id, session?.user, markedAsWatched]);

  const handleFollow = async () => {
    if (isFollowed) return;
    if (!session?.user?.id) {
      toast({
        description: "You need to be logged in to mark episodes as watched",
      });
      return;
    }
    if (userProgress) return;

    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/anime/follow", {
        anime: anime_id,
        user: session.user.id,
      });
      setIsFollowed(true);
      setUserProgess(data);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex">
      <Button
        variant="secondary"
        disabled={markedAsWatched || isLoading}
        onClick={handleButtonClick}
        className={cn("w-full p-4 uppercase font-semibold rounded-r-none")}
      >
        <Loader2
          className={cn("mr-2 h-4 w-4 animate-spin", {
            hidden: !isLoading,
          })}
        />
        {markedAsWatched ? "Marked" : "Mark"} as watched to this point
      </Button>
      <Button
        disabled={isFollowed || isLoading}
        onClick={handleFollow}
        className="rounded-l-none"
      >
        {isFollowed ? "Followed" : "Follow"}
      </Button>
    </div>
  );
}
