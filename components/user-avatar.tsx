import { cva, type VariantProps } from "class-variance-authority";
import { AvatarFallback, AvatarImage, Avatar } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { LiveBadge } from "./live-badge";
import { Skeleton } from "./ui/skeleton";
import { useSidebar } from "@/store/use-sidebar";

const avatarSizes = cva("", {
  variants: {
    size: {
      default: "h-8 w-8",
      lg: "h-14 w-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface Props extends VariantProps<typeof avatarSizes> {
  username: string;
  imageUrl: string;
  isLive?: boolean;
  showBadge?: boolean;
}

export const UserAvatar = ({
  username,
  imageUrl,
  isLive,
  showBadge,
  size,
}: Props) => {
  const canShowBadge = isLive && showBadge;
  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive && "ring-2 ring-rose-500 border border-background",
          avatarSizes({ size })
        )}
      >
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

interface SkeletonProps extends VariantProps<typeof avatarSizes> {}

export const UserAvatarSkeleton = ({ size }: SkeletonProps) => {
  return <Skeleton className={cn("rounded-full", avatarSizes({ size }))} />;
};
