import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import React from "react";
import { Actions } from "./_components/actions";

interface Props {
  params: {
    username: string;
  };
}

const UsernamePage = async ({ params }: Props) => {
  const user = await getUserByUsername(params.username);

  if (!user) notFound();

  const isFollowing = await isFollowingUser(user.id);

  return (
    <div className="flex flex-col gap-y-4">
      User: {user.username}
      isFollowing: {`${isFollowing}`}
      <Actions userId={user.id} isFollowing={isFollowing} />
    </div>
  );
};

export default UsernamePage;
