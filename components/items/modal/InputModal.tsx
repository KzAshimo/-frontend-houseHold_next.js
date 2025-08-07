"use client";

import { Dialog } from "@headlessui/react";
import { ReactNode, Fragment } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export const InputFormModal = ({ isOpen, onClose, title, children }: Props) => {
  return (
    <Dialog as="div" open={isOpen} onClose={onClose} className="relative z-50">
      {/* 1. 背景のオーバーレイ */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* 2. モーダル本体のコンテナ */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* 3. モーダルのパネル */}
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-bold text-gray-900">
            {title}
          </Dialog.Title>

          {/* childrenをここで表示することで、様々なフォームを使い回せる */}
          <div className="mt-4">{children}</div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
