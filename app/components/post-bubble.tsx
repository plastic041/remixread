import type { Post } from "@prisma/client";
import dayjs from "dayjs";
import { motion } from "framer-motion";

type PostBubbleProps = {
  post: Post;
};
const PostBubble = ({ post }: PostBubbleProps) => {
  const createdAt = dayjs(post.createdAt).format("YY-MM-DD HH:mm");

  return (
    <motion.article
      className="flex flex-col gap-2 rounded-lg bg-mint-3 p-2"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <a
            href={`#${post.order}`}
            className="font-mono text-mint-11 hover:underline"
            aria-label={`${post.order}번째 글로 이동`}
          >
            &gt;&gt;{post.order}
          </a>
          <span className="font-mono text-mint-12">{post.username}</span>
          <time
            className="font-mono text-mint-12"
            dateTime={post.createdAt as unknown as string}
          >
            {createdAt}
          </time>
        </div>
        <span
          className="text-sm tabular-nums text-mint-11"
          aria-label={`글 id: ${post.id}`}
        >
          #{post.id}
        </span>
      </div>
      <p className="text-mint-12">{post.content}</p>
    </motion.article>
  );
};

export default PostBubble;
