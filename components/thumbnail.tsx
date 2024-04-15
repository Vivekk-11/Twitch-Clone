import Image from "next/image";
import { UserAvatar } from "./user-avatar";
import { Skeleton } from "./ui/skeleton";

interface Props {
  isLive: boolean;
  src: string | null;
  fallback: string;
  username: string;
}

export const Thumbnail = ({ isLive, src, fallback, username }: Props) => {
  let content;

  if (!src) {
    content = (
      <div className="flex flex-col items-center justify-center bg-background gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:translate-y-1 rounded-md">
        <UserAvatar
          size="lg"
          imageUrl={fallback}
          isLive={isLive}
          username={username}
          showBadge
        />
      </div>
    );
  } else {
    content = (
      <Image
        src={src}
        alt="Thumbnail"
        className="object-cover transition-transform group-hover:translate-x-2 group-hover:translate-y-2 rounded-md"
        fill
      />
    );
  }

  return (
    <div className="group aspect-video relative rounded-md cursor-pointer">
      <div className="rounded-md absolute inset-0 bg-blue-600 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center" />
      {content}
    </div>
  );
};

export const ThumbnailSkeleton = () => {
  return (
    <div className="group aspect-video relative rounded-xl cursor-pointer">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
