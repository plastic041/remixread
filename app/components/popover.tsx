import { AnimatePresence, motion } from "framer-motion";

import { Form } from "@remix-run/react";
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
          className="absolute top-10 right-0 flex w-32 flex-col gap-2 rounded border border-mint-6 bg-mint-2 p-2 shadow"
          key="popover"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <span className="px-2">{user.email}</span>
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
