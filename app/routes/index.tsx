import * as Dialog from "@radix-ui/react-dialog";

import type { Category, Post, Thread } from "@prisma/client";
import { Link, useLoaderData } from "@remix-run/react";

import CategoryHeader from "~/components/category-header";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import MainHeader from "~/components/main-header";
import NewThread, { Overlay } from "~/components/new-thread";
import { getCategoriesWithThreads } from "~/models/category.server";
import { json } from "@remix-run/node";
import { createThreadWithFirstPost } from "~/models/thread.server";
import { requireUserId } from "~/session.server";

type CategoryWithThreads = Category & {
  thread: (Thread & {
    post: Post[];
  })[];
};

type LoaderData = {
  categoriesWithThreads: CategoryWithThreads[];
};
export const loader: LoaderFunction = async () => {
  const categoriesWithThreads: CategoryWithThreads[] =
    await getCategoriesWithThreads();
  console.log(categoriesWithThreads[0].thread[0]);

  return json<LoaderData>({ categoriesWithThreads });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const threadName = formData.get("thread-name") as string;
  const categoryId = formData.get("category-id") as string;
  const content = formData.get("post-content") as string;
  const userId = await requireUserId(request);

  if (!threadName || !categoryId || !content || !userId) {
    return json<{ errors: { [key: string]: string } }>({
      errors: {
        threadName: "Thread name is required",
        categoryId: "Category is required",
        content: "Content is required",
        userId: "User is required",
      },
    });
  }

  const firstPost = await createThreadWithFirstPost({
    thread: {
      name: threadName,
      categoryId,
    },
    post: {
      content,
      userId,
    },
  });

  if (!firstPost) {
    return json<{ errors: { [key: string]: string } }>({
      errors: {
        thread: "Thread could not be created",
      },
    });
  }

  return redirect(`/thread/${firstPost.threadId}`);
};

const CategoryPage = () => {
  const { categoriesWithThreads } = useLoaderData() as LoaderData;

  return (
    <Dialog.Root>
      <Dialog.Portal>
        <Overlay />
        <NewThread />
      </Dialog.Portal>

      <MainHeader />
      <main className="container mx-auto lg:px-40 xl:px-60 2xl:px-80">
        <ul className="flex w-full flex-col gap-4">
          {categoriesWithThreads.map((category) => (
            <li
              key={category.id}
              className="flex flex-col gap-2 border-t border-mint-6 first:border-t-0"
            >
              <CategoryHeader category={category} />
              <ul className="flex flex-col gap-4 p-2">
                {category.thread.map((thread) => (
                  <li key={thread.id}>
                    <Link
                      to={`/thread/${thread.id}`}
                      className="flex flex-row gap-1 hover:underline"
                    >
                      <span className="text-mint-12">{thread.name}</span>
                      <span className="text-mint-11">
                        ({thread.post.length})
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </main>
    </Dialog.Root>
  );
};

export default CategoryPage;
