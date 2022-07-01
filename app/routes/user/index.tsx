import type { Post } from "@prisma/client";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import dayjs from "dayjs";
import UserHeader from "~/components/user-header";
import { getUserPosts } from "~/models/post.server";
import { getUserId } from "~/session.server";
import { useOptionalUser } from "~/utils";
import { truncate } from "~/utils/truncate";

export const meta: MetaFunction = () => {
  return {
    title: "사용자 정보",
  };
};

type LoaderData = {
  userPosts?: Post[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) return json<LoaderData>({ userPosts: [] });

  const userPosts = await getUserPosts({ userId });
  return json({ userPosts });
};

const UserPage = () => {
  const user = useOptionalUser();
  const { userPosts } = useLoaderData() as LoaderData;

  if (!user) {
    return <div>User not found</div>;
  }

  const createdAt = dayjs(user.createdAt).format("YYYY년 M월 D일");

  return (
    <>
      <UserHeader />
      <main className="container mx-auto flex flex-col p-4 lg:px-40 xl:px-60 2xl:px-80">
        <div>
          <dl className="flex flex-col gap-4">
            <div className="flex flex-row justify-between">
              <dt className="text-mint-11">이메일</dt>
              <dd className="text-mint-12">{user.email}</dd>
            </div>
            <div className="flex flex-row justify-between">
              <dt className="text-mint-11">가입일</dt>
              <dd className="text-mint-12">{createdAt}</dd>
            </div>
            <div className="flex flex-col items-start gap-2">
              <dt className="text-mint-11">작성글</dt>
              <dd className="flex flex-col items-start">
                {userPosts?.map((post) => (
                  <Link
                    to={`/thread/${post.threadId}#${post.order}`}
                    key={post.id}
                    className="text-blue-600 hover:underline"
                  >
                    <span key={post.id}>
                      {truncate(post.content, { length: 36 })}
                    </span>
                  </Link>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </main>
    </>
  );
};

export default UserPage;
