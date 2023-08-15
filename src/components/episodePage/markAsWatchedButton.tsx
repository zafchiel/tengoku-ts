"use client";

import { useEffect, useState } from "react";
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
  const [isFollowed, setIsFollowed] = useState(false);
  const [userProgress, setUserProgess] = useState(null);

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

  useEffect(() => {
    const checkIfAnimeIsFollowed = async () => {
      if (!session?.user?.id) {
        return;
      }
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
    }
  };

  return (
    <div className="flex">
      <Button
        variant="secondary"
        disabled={markedAsWatched}
        onClick={handleButtonClick}
        className={cn("w-full p-4 uppercase font-semibold rounded-r-none")}
      >
        Mark as watched to this point
      </Button>
      <Button
        disabled={isFollowed}
        onClick={handleFollow}
        className="rounded-l-none"
      >
        {isFollowed ? "Followed" : "Follow"}
      </Button>
    </div>
  );
}
