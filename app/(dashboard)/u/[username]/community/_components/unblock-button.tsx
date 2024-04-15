"use client";

import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  userId: string;
}

export const UnblockButton = ({ userId }: Props) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((data) =>
          toast.success(`User ${data.blocked.username} unblocked!`)
        )
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <Button
      onClick={onClick}
      disabled={isPending}
      className="text-blue-500 w-full"
      variant="link"
      size="sm"
    >
      Unblock
    </Button>
  );
};
