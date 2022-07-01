import { atom } from "jotai";
import type { Category } from "@prisma/client";

export const currentCategoryAtom = atom<Category | null>(null);
