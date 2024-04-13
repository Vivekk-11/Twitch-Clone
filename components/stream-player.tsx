"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";

interface Props {
  user: User & { stream: Stream | null };
  stream: Stream;
  isFollowing: boolean;
}

export const StreamPlayer = ({ user, stream }: Props) => {
  const { token, name, identity } = useViewerToken(user.id);

  if (!token || !name || identity) {
    return <div>Cannot watch the stream!</div>;
  }

  return <div>Allowed to watch the stream!</div>;
};
