"use client";

import { onFollow, onUnFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  userId: string;
  isFollowing: boolean;
}

export const Actions = ({ userId, isFollowing }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You're not following ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  const handleUnFollow = () => {
    startTransition(() => {
      onUnFollow(userId)
        .then((data) =>
          toast.success(`You un-followed ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <Button
      variant="primary"
      disabled={isPending}
      onClick={isFollowing ? handleUnFollow : handleFollow}
    >
      {isFollowing ? "Un-Follow" : "Follow"}
    </Button>
  );
};
