import * as Dialog from "@radix-ui/react-dialog";
import { useAtom } from "jotai";
import { currentCategoryAtom } from "~/stores/category";

import type { Category } from "@prisma/client";
import { Plus } from "iconoir-react";
import { useOptionalUser } from "~/utils";

type CategoryHeaderProps = {
  category: Category;
};
const CategoryHeader = ({ category }: CategoryHeaderProps) => {
  const user = useOptionalUser();
  const [, setCurrentCategory] = useAtom(currentCategoryAtom);

  return (
    <div className="flex w-full flex-row items-center justify-between border-b border-mint-6 bg-mint-2 p-2">
      <h2 className="text-2xl font-bold text-mint-12">{category.name}</h2>
      {user && (
        <Dialog.Trigger onClick={() => setCurrentCategory(category)}>
          <Plus
            width={24}
            height={24}
            className="cursor-pointer rounded bg-mint-2 text-mint-12 hover:bg-mint-4 active:bg-mint-5"
          />
        </Dialog.Trigger>
      )}
    </div>
  );
};

export default CategoryHeader;
