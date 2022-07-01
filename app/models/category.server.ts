import { prisma } from "~/db.server";

export const getCategoriesWithThreads = () => {
  return prisma.category.findMany({
    include: {
      thread: true,
    },
  });
};
