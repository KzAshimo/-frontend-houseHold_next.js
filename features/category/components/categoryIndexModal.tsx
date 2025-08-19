"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useIndexCategory from "../hooks/useIndexCategoryHook";
import StoreCategoryButton from "./categoryStoreButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function IndexCategoryModal({ isOpen, onClose }: Props) {
  const { categories, isLoading, error } = useIndexCategory();

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={onClose}
    >
      {/* 背景 */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-black/80 p-6 shadow-xl">
            <DialogTitle className="text-lg font-bold text-gray-800">
              カテゴリ一覧
            </DialogTitle>

            {/* コンテンツ */}
            <div className="mt-4">
              {isLoading && <p>読み込み中...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {!isLoading && !error && (
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      className="border-b border-gray-200 py-1"
                    >
                      {category.name} (
                      {category.type === "expense"
                        ? "支出"
                        : category.type === "income"
                        ? "収入"
                        : category.type}
                      )
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <StoreCategoryButton />

              <button
                className="rounded-md bg-gray-700 px-4 py-1 text-sm font-medium text-white hover:bg-gray-600"
                onClick={onClose}
              >
                閉じる
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
