import type { Post } from "@prisma/client";

import { prisma } from "~/db.server";
import { hash8 } from "~/utils/hash";

export const createPost = async (
  threadId: string,
  userId: string,
  content: string
): Promise<Post> => {
  const thread = await prisma.thread.findUnique({
    where: { id: threadId },
    include: {
      post: true,
    },
  });

  if (!thread) {
    throw new Error("Thread not found");
  }

  const threadLength = thread.post.length;
  const username = hash8(`${threadId}${userId}`);

  return prisma.post.create({
    data: {
      username,
      order: threadLength + 1,
      thread: {
        connect: {
          id: threadId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
      content,
    },
  });
};
