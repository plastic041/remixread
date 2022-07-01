import * as Dialog from "@radix-ui/react-dialog";
import { useAtom } from "jotai";

import { Form } from "@remix-run/react";
import { currentCategoryAtom } from "~/stores/category";

export const Overlay = () => {
  return <Dialog.Overlay className="fixed inset-0 bg-gray-900 opacity-75" />;
};

const NewThread = () => {
  const [currentCategory] = useAtom(currentCategoryAtom);

  return (
    <Dialog.Content className="sm-w-full fixed top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 p-4 sm:max-w-lg sm:p-0">
      <div className="flex w-full flex-col gap-4 rounded bg-mint-2 p-8 shadow-lg focus:outline-none">
        <h2 className="text-lg text-mint-12">
          <span className="font-bold">{currentCategory?.name}</span>
          <span> 카테고리에 새 스레를 세웁니다.</span>
        </h2>
        <Form className="flex flex-col gap-2" action="/?index" method="post">
          <label className="flex flex-col gap-1">
            <span className="text-mint-11">스레 이름</span>
            <input
              className="rounded-sm border border-mint-6 bg-mint-1 px-2 py-1 outline-none hover:border-mint-7 focus:border-mint-8"
              name="thread-name"
              type="text"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-mint-11">첫 번째 글</span>
            <textarea
              className="h-32 resize-none rounded-sm border border-mint-6 bg-mint-1 px-2 py-1 outline-none hover:border-mint-7 focus:border-mint-8"
              name="post-content"
            />
          </label>
          <input type="hidden" name="category-id" value={currentCategory?.id} />
          <div className="flex flex-row justify-end gap-2">
            <Dialog.Close className="btn-post" type="button">
              <span className="text-mint-11">취소</span>
            </Dialog.Close>
            <button className="btn-post">
              <span className="text-mint-12">등록</span>
            </button>
          </div>
        </Form>
      </div>
    </Dialog.Content>
  );
};

export default NewThread;
