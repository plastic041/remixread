import Avatar from "boring-avatars";
import Popover from "./popover";
import type { User } from "@prisma/client";
import { useState } from "react";

type UserIconProps = {
  user: User;
};
const UserIcon = ({ user }: UserIconProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const togglePopover = () => {
    setIsPopoverOpen((prev) => !prev);
  };

  return (
    <>
      <button onClick={togglePopover}>
        <Avatar size={32} name={user.id} variant="beam" />
      </button>
      <Popover user={user} opened={isPopoverOpen} />
    </>
  );
};

export default UserIcon;
