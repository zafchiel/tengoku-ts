"use client";

import { Button } from "../ui/button";
import { Heart, Loader2 } from "lucide-react";
import { Session } from "next-auth";
import axios from "axios";
import { ButtonHTMLAttributes, useState } from "react";
import { useToast } from "../ui/use-toast";

type Props = {
  session: Session | null;
  animeId: string;
  isFollowed: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function FollowButton({
  session,
  animeId,
  isFollowed,
  ...rest
}: Props) {
  const [isFollowedState, setIsFollowedState] = useState(isFollowed);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const handleClick = async () => {
    if (!session) {
      toast({
        variant: "destructive",
        description: "You must be logged in to follow anime",
      });
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/anime/follow", {
        user: session.user?.id,
        anime: animeId,
      });

      toast({
        title: "Successfully followed anime",
        description: "check your progress on profile page",
      });
      setIsFollowedState(true);
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
      variant="secondary"
      onClick={handleClick}
      disabled={isFollowedState || isLoading}
      {...rest}
    >
      {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <Heart />}
    </Button>
  );
}
