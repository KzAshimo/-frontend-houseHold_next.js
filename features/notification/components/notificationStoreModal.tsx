"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, title, children }: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-slate-950/90 p-6 shadow-xl">
          <DialogTitle className="text-lg font-bold text-gray-800">{title}</DialogTitle>
          <div className="mt-4">{children}</div>
          <div className="mt-4 text-right">
            <button
              className="rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
              onClick={onClose}
            >
              閉じる
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
