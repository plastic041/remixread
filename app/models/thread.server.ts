import type { Post, Thread } from "@prisma/client";

import { prisma } from "~/db.server";
import { hash8 } from "~/utils/hash";

export const getThread = (
  id: string
): Promise<(Thread & { post: Post[] }) | null> => {
  return prisma.thread.findUnique({
    where: { id },
    include: {
      post: true,
    },
  });
};

type CreateThreadWithFirstPostProps = {
  thread: Pick<Thread, "name" | "categoryId">;
  post: Pick<Post, "content" | "userId">;
};
export const createThreadWithFirstPost = async ({
  thread,
  post,
}: CreateThreadWithFirstPostProps) => {
  const threadCreated = await prisma.thread.create({
    data: {
      name: thread.name,
      categoryId: thread.categoryId,
    },
  });

  const order = 1;
  const username = hash8(`${threadCreated.id}${post.userId}`);

  return prisma.post.create({
    data: {
      username,
      order,
      thread: {
        connect: {
          id: threadCreated.id,
        },
      },
      user: {
        connect: {
          id: post.userId,
        },
      },
      content: post.content,
    },
  });
};
