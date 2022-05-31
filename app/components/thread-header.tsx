import type { Thread } from "@prisma/client";
import { Form, Link } from "@remix-run/react";

import { NavArrowLeft } from "iconoir-react";
import { useOptionalUser } from "~/utils";

type ThreadHeaderProps = {
  thread: Thread;
};
const ThreadHeader = ({ thread }: ThreadHeaderProps) => {
  const user = useOptionalUser();

  return (
    <div className="flex flex-row justify-between border-b border-b-mint-6 bg-mint-2 p-4">
      <div className="flex flex-row items-center gap-2">
        <Link to="/">
          <NavArrowLeft
            width={24}
            height={24}
            className="rounded bg-mint-2 text-mint-12 hover:bg-mint-3"
          />
        </Link>
        <h1 className="text-2xl font-bold text-mint-12">{thread.name}</h1>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Form action="/logout" method="post">
          <button type="submit">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-orange-200 to-blue-500" />
            <span>{user ? "회원" : "비회원"}</span>
          </button>
        </Form>
      </div>
    </div>
  );
};

export default ThreadHeader;
