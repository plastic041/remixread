import { useOptionalUser } from "~/utils";

const UserPage = () => {
  const user = useOptionalUser();

  if (!user) {
    return <div>User not found</div>;
  }

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
