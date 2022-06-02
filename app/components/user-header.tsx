import { Link } from "@remix-run/react";
import { Home } from "iconoir-react";

const UserHeader = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b border-mint-6 bg-mint-2 px-4">
      <div className="w-20">
        <Link to="/">
          <Home
            width={24}
            height={24}
            className="rounded bg-mint-2 text-mint-12 hover:bg-mint-4"
          />
        </Link>
      </div>
      <h1 className="text-3xl font-light text-mint-12">사용자 정보</h1>
      <div className="w-20" />
    </header>
  );
};

export default UserHeader;
