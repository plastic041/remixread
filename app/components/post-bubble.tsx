import type { Post } from "@prisma/client";
import dayjs from "dayjs";

type PostBubbleProps = {
  post: Post;
};
const PostBubble = ({ post }: PostBubbleProps) => {
  const createdAt = dayjs(post.createdAt).format("YY-MM-DD HH:mm");

  return (
    <article className="flex flex-col gap-2 rounded-lg bg-mint-3 p-2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <a
            href={`#${post.order}`}
            className="font-mono text-mint-11 hover:underline"
          >
            &gt;&gt;{post.order}
          </a>
          <span className="font-mono text-mint-12">{post.username}</span>
          <span className="font-mono text-mint-12">{createdAt}</span>
        </div>
        <span className="text-sm tabular-nums text-mint-11">#{post.id}</span>
      </div>
      <p className="text-mint-12">{post.content}</p>
    </article>
  );
};

export default PostBubble;
