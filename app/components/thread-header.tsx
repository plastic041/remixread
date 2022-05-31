import type { Thread } from "@prisma/client";
import { Form, Link, useLocation } from "@remix-run/react";

import { NavArrowLeft } from "iconoir-react";
import { useState } from "react";
import { usePathnameSearchParams } from "~/hooks/use-pathname-search-params";
import { useOptionalUser } from "~/utils";

type ThreadHeaderProps = {
  thread: Thread;
};
const ThreadHeader = ({ thread }: ThreadHeaderProps) => {
  const user = useOptionalUser();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const pathnameSearchParams = usePathnameSearchParams();
  const redirectPathname = `/login?${pathnameSearchParams}`;

  const togglePopover = () => {
    setIsPopoverOpen((prev) => !prev);
  };

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
      <div className="relative flex flex-row items-center gap-2">
        {user ? (
          <>
            <button onClick={togglePopover}>
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-orange-200 to-blue-500" />
            </button>
            {isPopoverOpen && (
              <div className="absolute top-8 right-0 flex w-32 flex-col gap-2 rounded border border-mint-6 bg-mint-2 p-2 shadow">
                <span className="px-2">{user.email}</span>
                <Form action="/logout" method="post">
                  <button type="submit">
                    <span className="rounded-sm px-2 text-sm text-red-600 hover:bg-mint-3">
                      로그아웃
                    </span>
                  </button>
                </Form>
              </div>
            )}
          </>
        ) : (
          <Link to={redirectPathname}>
            <span className="text-blue-500 hover:text-blue-300">로그인</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ThreadHeader;
