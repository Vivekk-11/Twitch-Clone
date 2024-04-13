import { getUserByUsername } from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs";
import React from "react";
import { StreamPlayer } from "@/components/stream-player";

interface Props {
  params: {
    username: string;
  };
}

const CreatorPage = async ({ params }: Props) => {
  const externalUser = await currentUser();
  const user = await getUserByUsername(params.username);

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error("Unauthorized!");
  }

  return (
    <div className="h-full">
      <StreamPlayer isFollowing user={user} stream={user?.stream} />
    </div>
  );
};

export default CreatorPage;
