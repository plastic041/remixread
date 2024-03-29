import { AnimatePresence, motion } from "framer-motion";

import { Form, Link } from "@remix-run/react";
import type { User } from "@prisma/client";

type PopoverProps = {
  opened: boolean;
  user: User;
};
const Popover = ({ opened, user }: PopoverProps) => {
  return (
    <AnimatePresence>
      {opened && (
        <motion.div
          className="absolute top-14 right-0 flex flex-col gap-2 rounded border border-mint-6 bg-mint-2 p-2 shadow"
          key="popover"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <Link to="/user">
            <span className="px-2 text-blue-600 hover:underline">
              {user.email}
            </span>
          </Link>
          <Form action="/logout" method="post">
            <button type="submit">
              <span className="rounded-sm px-2 text-sm text-red-600 hover:bg-mint-3">
                로그아웃
              </span>
            </button>
          </Form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popover;
