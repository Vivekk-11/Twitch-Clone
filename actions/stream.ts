"use server";

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const self = await getSelf();
    const selfStream = await db.stream.findUnique({
      where: {
        userId: self.id,
      },
    });

    if (!selfStream) throw new Error("Stream not found!");

    const { isChatEnabled, isChatDelayed, isChatFollowersOnly, name, thumbnailUrl } = values;

    const validData = {
      thumbnailUrl,
      name,
      isChatEnabled,
      isChatDelayed,
      isChatFollowersOnly,
    };

    const stream = await db.stream.update({
      where: {
        id: selfStream.id,
      },
      data: {
        ...validData,
      },
    });

    revalidatePath("/");
    revalidatePath(`/${self.username}`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/u/${self.username}/chat`);
    return stream;
  } catch (error) {
    throw new Error("Something went wrong, please try again!");
  }
};
