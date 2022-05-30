import type { Category } from "@prisma/client";
import { prisma } from "~/db.server";

export const getCategories = (): Promise<Category[]> => {
  return prisma.category.findMany();
};
