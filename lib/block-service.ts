import { getSelf } from "./auth-service";
import { db } from "./db";

export const isBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({ where: { id } });
    if (!otherUser) throw new Error("User not found!");

    if (otherUser.id === self.id) return false;

    const blockExists = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: otherUser.id,
          blockedId: self.id,
        },
      },
    });

    return !!blockExists;
  } catch (error) {
    return false;
  }
};

export const blockUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) throw new Error("Can't block yourself!");

  const otherUser = await db.user.findUnique({ where: { id } });

  if (!otherUser) throw new Error("User not found!");

  const blockExists = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: id,
      },
    },
  });

  if (blockExists) throw new Error("Already blocked!");

  const block = await db.block.create({
    data: {
      blockerId: self.id,
      blockedId: id,
    },
    include: {
      blocked: true,
    },
  });

  return block;
};

export const unBlockUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) throw new Error("Can't unblock yourself!");

  const otherUser = await db.user.findUnique({ where: { id } });

  if (!otherUser) throw new Error("User not found!");

  const blockExists = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: id,
      },
    },
  });

  if (!blockExists) throw new Error("Not blocked!");

  const unblock = await db.block.delete({
    where: {
      id: blockExists.id,
    },
    include: { blocked: true },
  });

  return unblock;
};

export const getBlockedUsers = async () => {
  const self = await getSelf();

  const blockedUsers = await db.block.findMany({
    where: {
      blockerId: self.id,
    },
    include: {
      blocked: true,
    },
  });

  return blockedUsers;
};
