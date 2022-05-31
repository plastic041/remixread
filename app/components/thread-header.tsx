import Avatar from "boring-avatars";
import { Link } from "@remix-run/react";
import { NavArrowLeft } from "iconoir-react";
import Popover from "./popover";
import type { Thread } from "@prisma/client";
import { useOptionalUser } from "~/utils";
import { usePathnameSearchParams } from "~/hooks/use-pathname-search-params";
import { useState } from "react";

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
              <Avatar size={32} name={user.id} variant="beam" />
            </button>
            <Popover user={user} opened={isPopoverOpen} />
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
