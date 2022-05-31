import type { Post, Thread } from "@prisma/client";

import { prisma } from "~/db.server";

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
