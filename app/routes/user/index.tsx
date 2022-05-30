import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import { getUserById } from "~/models/user.server";

type LoaderData = {
  email: string;
  createdAt: string;
};

// export const loader: LoaderFunction = async ({ request }) => {
//   const userId = await requireUserId(request);
//   const user = await getUserById(userId);
//   return json<LoaderData>({ user });
// };

const UserPage = () => {
  const user = useUser();

  return (
    <div>
      <dl>
        <dt>Email</dt>
        <dd>{user.email}</dd>
        <dt>Created at</dt>
        <dd>{user.createdAt}</dd>
      </dl>
    </div>
  );
};

export default UserPage;
