import type { Category, Thread } from "@prisma/client";
import { prisma } from "~/db.server";

export const getCategories = (): Promise<Category[]> => {
  return prisma.category.findMany();
};

export const getCategoriesWithThreads = () => {
  return prisma.category.findMany({
    include: {
      thread: true,
    },
  });
};

export const getThreadsByCategoryId = (
  categoryId: string
): Promise<Thread[]> => {
  return prisma.thread.findMany({
    where: { categoryId },
  });
};
