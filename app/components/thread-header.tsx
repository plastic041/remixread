import { Link } from "@remix-run/react";
import { Home } from "iconoir-react";
import type { Thread } from "@prisma/client";
import UserIcon from "./user-icon";
import { useOptionalUser } from "~/utils";
import { usePathnameSearchParams } from "~/hooks/use-pathname-search-params";

type ThreadHeaderProps = {
  thread: Thread;
};
const ThreadHeader = ({ thread }: ThreadHeaderProps) => {
  const user = useOptionalUser();

  const pathnameSearchParams = usePathnameSearchParams();
  const redirectPathname = `/login?${pathnameSearchParams}`;

  return (
    <div className="flex h-16 flex-row justify-between border-b border-b-mint-6 bg-mint-2 px-4">
      <div className="flex flex-row items-center gap-2">
        <Link to="/">
          <Home
            width={24}
            height={24}
            className="rounded bg-mint-2 text-mint-12 hover:bg-mint-4"
            aria-label="뒤로 가기"
          />
        </Link>
        <h1 className="text-2xl font-bold text-mint-12">{thread.name}</h1>
      </div>
      <div className="relative flex flex-row items-center gap-2">
        {user ? (
          <UserIcon user={user} />
        ) : (
          <Link to={redirectPathname}>
            <span className="text-blue-600 hover:text-blue-300">로그인</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ThreadHeader;
