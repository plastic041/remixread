import type { LoaderFunction } from "@remix-run/server-runtime";
import type { Category, Thread } from "@prisma/client";

import { json } from "@remix-run/node";

import { getCategoriesWithThreads } from "~/models/category.server";
import { Link, useLoaderData } from "@remix-run/react";
import CategoryHeader from "~/components/category-header";

type CategoryWithThreads = Category & {
  thread: Thread[];
};

type LoaderData = {
  categoriesWithThreads: CategoryWithThreads[];
};
export const loader: LoaderFunction = async () => {
  const categoriesWithThreads: CategoryWithThreads[] =
    await getCategoriesWithThreads();

  return json<LoaderData>({ categoriesWithThreads });
};

const CategoryPage = () => {
  const { categoriesWithThreads } = useLoaderData() as LoaderData;

  return (
    <main>
      <ul className="flex w-full flex-col gap-4">
        {categoriesWithThreads.map((category) => (
          <li key={category.id} className="flex flex-col gap-2">
            <CategoryHeader category={category} />
            <ul className="flex flex-col gap-4 p-2">
              {category.thread.map((thread) => (
                <li key={thread.id}>
                  <Link
                    to={`/thread/${thread.id}`}
                    className="text-mint-12 hover:underline"
                  >
                    {thread.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default CategoryPage;
