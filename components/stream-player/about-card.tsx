"use client";

import { VerifiedMark } from "../verified-mark";
import { BioModal } from "./bio-modal";

interface Props {
  hostIdentity: string;
  hostName: string;
  viewerIdentity: string;
  followedByCount: number;
  bio: string | null;
}

export const AboutCard = ({
  hostIdentity,
  hostName,
  viewerIdentity,
  followedByCount,
  bio,
}: Props) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  const followedByLabel = followedByCount === 1 ? "follower" : "followers";
  return (
    <div className="px-4">
      <div className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
            About {hostName}
            <VerifiedMark />
          </div>
          {isHost && <BioModal initialValue={bio} />}
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">{followedByCount}</span>{" "}
          {followedByLabel}
        </div>
        <p className="text-sm">
          {bio || "This user prefers to keep an air of mystery about them."}
        </p>
      </div>
    </div>
  );
};
