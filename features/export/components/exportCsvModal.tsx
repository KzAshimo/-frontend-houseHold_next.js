// ExportCsvModal.tsx
"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import ExportCsvForm from "./exportCsvForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ExportCsvModal = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null; // 非表示時はレンダリングしない

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-10 flex items-center justify-center">
      {/* 背景オーバーレイ */}
      <div className="fixed inset-0 bg-black/50" />

      {/* モーダル本体 */}
      <DialogPanel className="bg-black p-6 rounded shadow-lg z-20 w-full max-w-lg">
        <DialogTitle className="text-lg font-bold mb-4">
          CSV エクスポート
        </DialogTitle>

        <ExportCsvForm />

        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            閉じる
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default ExportCsvModal;
