import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, Link, useLoaderData, useTransition } from "@remix-run/react";
import type { Post, Thread } from "@prisma/client";
import { useEffect, useRef } from "react";

import PostBubble from "~/components/post-bubble";
import { AnimatePresence } from "framer-motion";
import ThreadHeader from "~/components/thread-header";
import { createPost } from "~/models/post.server";
import { getThread } from "~/models/thread.server";
import { json } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import { useOptionalUser } from "~/utils";
import { usePathnameSearchParams as useSearchParamsAsRedirectTo } from "~/hooks/use-pathname-search-params";

type LoaderData = Thread & {
  post: Post[];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  console.log(process.env.NODE_ENV === "production");
  const id = params.id;
  if (!id) {
    throw new Response("Not Found", { status: 404 });
  }
  const thread = await getThread(id);
  if (!thread) {
    throw new Response("Not Found", { status: 404 });
  }

  return json<LoaderData>(thread);
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const content = formData.get("content");
  if (!content) {
    return json<{ errors: { content: string } }>({
      errors: { content: "Content is required" },
    });
  }
  const userId = await requireUserId(request);

  const threadId = params.id;
  if (!threadId) {
    throw new Response("Not Found", { status: 404 });
  }

  const newPost = await createPost(threadId, userId, content.toString());

  return json<{ post: Post }>({ post: newPost });
};

const ThreadPage = () => {
  const thread = useLoaderData() as LoaderData;
  const user = useOptionalUser();

  const firstRef = useRef<boolean>(true);
  const formRef = useRef<HTMLFormElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const transition = useTransition();

  const isAdding = !!transition.submission;

  const searchParamsAsRedirectTo = useSearchParamsAsRedirectTo();
  const redirectPathname = `/login?${searchParamsAsRedirectTo}`;

  useEffect(() => {
    if (firstRef.current) {
      firstRef.current = false;
      return;
    }
    if (!isAdding) {
      formRef.current?.reset();
      textareaRef.current?.focus();
    }
  }, [isAdding]);

  return (
    <div className="bg-mint-1">
      <ThreadHeader thread={thread} />
      <main className="flex flex-col gap-2 p-4">
        <AnimatePresence initial={false}>
          <ol className="flex flex-col gap-2">
            {thread.post.map((post) => (
              <PostBubble key={post.id} post={post} loading={false} />
            ))}
            {isAdding && (
              <div className="animate-pulse">
                <PostBubble
                  post={{
                    id: 0,
                    content:
                      transition.submission.formData
                        .get("content")
                        ?.toString() || "",
                    createdAt: new Date(),
                    order: thread.post.length + 1,
                    username: "00000000",
                    threadId: thread.id,
                    userId: "0",
                  }}
                  loading
                />
              </div>
            )}
          </ol>
        </AnimatePresence>
        <div className="h-px border-t border-t-mint-6" />
        {user ? (
          <Form method="post" ref={formRef}>
            <fieldset className="flex flex-col gap-2" disabled={isAdding}>
              <label className="flex flex-col gap-2">
                <span className="text-mint-11">새 글 올리기</span>
                <textarea
                  ref={textareaRef}
                  className={`new-post
                    ${isAdding ? "bg-mint-3" : "bg-mint-1"}
                  `}
                  name="content"
                  maxLength={240}
                  required
                  disabled={isAdding}
                />
              </label>
              <div className="flex flex-col items-end">
                <button className="btn-post" type="submit" disabled={isAdding}>
                  <span className="text-mint-12">
                    {isAdding ? "작성 중..." : "작성"}
                  </span>
                </button>
              </div>
            </fieldset>
          </Form>
        ) : (
          <div>
            <div>로그인한 사용자만 글을 작성할 수 있어요.</div>
            <Link to={redirectPathname}>
              <span className="text-blue-600 hover:underline">
                로그인 페이지로 이동
              </span>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default ThreadPage;
