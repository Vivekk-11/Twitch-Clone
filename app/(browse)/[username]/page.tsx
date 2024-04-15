import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import React from "react";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";

interface Props {
  params: {
    username: string;
  };
}

const UsernamePage = async ({ params }: Props) => {
  const user = await getUserByUsername(params.username);

  if (!user || !user.stream) notFound();

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) notFound();

  return (
    <StreamPlayer isFollowing={isFollowing} user={user} stream={user.stream} />
  );
};

export default UsernamePage;
