"use client";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { ElementRef, useRef, useState, useTransition } from "react";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";

interface Props {
  initialValue: string | null;
}

export const BioModal = ({ initialValue }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState<string>(initialValue || "");
  const closeRef = useRef<ElementRef<"button">>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPending) return;
    startTransition(() => {
      updateUser({ bio: value })
        .then(() => {
          toast.success("User bio updated!");
          closeRef.current?.click();
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto" variant="link" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user bio</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="User bio"
            className="resize-none"
            disabled={isPending}
          />
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending} variant="primary">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
