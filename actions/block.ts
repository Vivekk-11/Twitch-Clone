"use server";

import { getSelf } from "@/lib/auth-service";
import { blockUser, unBlockUser } from "@/lib/block-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export const onBlock = async (id: string) => {
  const self = await getSelf();

  let blockedUser;
  try {
    blockedUser = await blockUser(id);
  } catch (error) {
    // This means that user is guest
  }

  try {
    await roomService.removeParticipant(self.id, id);
  } catch (error) {
    // This means user in the room
  }

  revalidatePath("/");
  revalidatePath(`/u/${self.username}/community`);

  if (blockedUser) {
    return blockedUser;
  }
};

export const onUnblock = async (id: string) => {
  const self = await getSelf();
  const unblockedUser = await unBlockUser(id);

  revalidatePath(`/u/${self.username}/community`);

  if (unblockedUser) {
    return unblockedUser;
  }
};
