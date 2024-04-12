"use server";

import { blockUser, unBlockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
  // TODO: Adapt to disconnect from livestream
  // TODO: Allow the ability to kick the guest

  try {
    const blockedUser = await blockUser(id);

    revalidatePath("/");

    if (blockedUser) {
      revalidatePath(`/${blockedUser.blocked.username}`);
    }

    return blockedUser;
  } catch (error) {
    throw new Error("Something went wrong!");
  }
};

export const onUnblock = async (id: string) => {
  // TODO: Adapt to disconnect from livestream
  // TODO: Allow the ability to kick the guest

  try {
    const unblockedUser = await unBlockUser(id);

    revalidatePath("/");

    if (unblockedUser) {
      revalidatePath(`/${unblockedUser.blocked.username}`);
    }

    return unblockedUser;
  } catch (error) {
    throw new Error("Something went wrong!");
  }
};
