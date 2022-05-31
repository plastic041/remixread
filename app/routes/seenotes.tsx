import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      {user ? (
        <Link
          to="/notes"
          className="flex items-center justify-center rounded-md bg-white px-4 py-3 text-yellow-700 shadow-sm hover:bg-yellow-50"
        >
          View Notes for {user.email}
        </Link>
      ) : (
        <div className="flex w-64 flex-col gap-4">
          <Link
            to="/join"
            className="flex items-center justify-center rounded-md bg-white px-4 py-3 text-yellow-700 shadow-sm hover:bg-yellow-50"
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className="flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
          >
            Log In
          </Link>
        </div>
      )}
    </main>
  );
}
