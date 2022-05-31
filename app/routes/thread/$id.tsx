import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, Link, useLoaderData, useTransition } from "@remix-run/react";
import type { Post, Thread } from "@prisma/client";
import { useEffect, useRef } from "react";

import PostBubble from "~/components/post-bubble";
import Spinner from "~/components/spinner";
import ThreadHeader from "~/components/thread-header";
import { createPost } from "~/models/post.server";
import { getThread } from "~/models/thread.server";
import { json } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import { useOptionalUser } from "~/utils";
import { usePathnameSearchParams } from "~/hooks/use-pathname-search-params";

type LoaderData = Thread & {
  post: Post[];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const id = params.id;
  console.log(id);
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

  const isSubmitting = transition.state === "submitting";

  const pathnameSearchParams = usePathnameSearchParams();
  const redirectPathname = `/login?${pathnameSearchParams}`;

  useEffect(() => {
    if (firstRef.current) {
      firstRef.current = false;
      return;
    }
    if (!isSubmitting) {
      formRef.current?.reset();
      textareaRef.current?.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="bg-mint-1">
      <ThreadHeader thread={thread} />
      <main className="flex flex-col gap-2 p-4">
        <ol className="flex flex-col gap-2">
          {thread.post.map((post) => (
            <PostBubble key={post.id} post={post} />
          ))}
          {transition.state === "submitting" ||
            (transition.state === "loading" && (
              <div className="flex h-8 items-center justify-center">
                <Spinner />
              </div>
            ))}
        </ol>
        <div className="h-px border-t border-t-mint-6" />
        {user ? (
          <Form method="post" ref={formRef}>
            <fieldset
              className="flex flex-col gap-2"
              disabled={transition.state === "submitting"}
            >
              <label className="flex flex-col gap-2">
                <span className="text-mint-11">새 글 올리기</span>
                <textarea
                  ref={textareaRef}
                  className="min-h-[120px] resize-none border border-mint-6 bg-mint-1 p-2"
                  name="content"
                  maxLength={240}
                  required
                  disabled={transition.state === "submitting"}
                />
              </label>
              <div className="flex flex-col items-end">
                <button
                  type="submit"
                  className="flex h-[40px] w-[120px] items-center justify-center rounded-lg bg-mint-3 hover:bg-mint-5 active:bg-mint-6"
                  disabled={transition.state === "submitting"}
                >
                  <span className="text-mint-12">
                    {transition.state === "submitting" ? "작성 중..." : "작성"}
                  </span>
                </button>
              </div>
            </fieldset>
          </Form>
        ) : (
          <div>
            <div>로그인한 사용자만 글을 작성할 수 있어요.</div>
            <Link to={redirectPathname}>
              <span className="text-blue-500 hover:underline">
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
