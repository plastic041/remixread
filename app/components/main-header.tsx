import { Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";
import UserIcon from "./user-icon";

const MainHeader = () => {
  const user = useOptionalUser();

  return (
    <header>
      <div className="flex h-16 items-center justify-between border-b border-mint-6 bg-mint-2 px-4">
        <div className="w-20" />
        <p className="text-3xl font-light">리믹스레드</p>
        <div className="relative flex h-full w-20 items-center justify-end">
          {user ? (
            <UserIcon user={user} />
          ) : (
            <Link to="login" className="text-blue-600">
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
