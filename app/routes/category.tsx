import type { LoaderFunction } from "@remix-run/server-runtime";
import type { Category } from "@prisma/client";

import { json } from "@remix-run/node";

import { getCategories } from "~/models/category.server";
import { Link, useLoaderData } from "@remix-run/react";

type LoaderData = {
  categories: Category[];
};
export const loader: LoaderFunction = async () => {
  const categories = await getCategories();
  return json<LoaderData>({ categories });
};

const CategoryPage = () => {
  const { categories } = useLoaderData() as LoaderData;

  return (
    <main>
      category page
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/category/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default CategoryPage;
