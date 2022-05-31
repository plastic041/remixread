import type { Category } from "@prisma/client";

const CategoryHeader = ({ category }: { category: Category }) => {
  return (
    <div className="flex w-full flex-col items-start border-t border-b border-mint-6 bg-mint-2 p-2">
      <h2 className="text-2xl text-mint-12">{category.name}</h2>
    </div>
  );
};

export default CategoryHeader;
