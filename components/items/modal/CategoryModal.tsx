"use client";

import ReactModal from "react-modal";
import { ReactNode } from "react";

if (typeof document !== "undefined") {
  ReactModal.setAppElement("#__next");
}

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-slate-500/50 rounded-lg shadow-lg max-w-5xl mx-auto my-10 p-4 outline-none"
      overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-start z-50"
    >
      {/* ヘッダー */}
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
      </div>

      {/* コンテンツ */}
      <div className="max-h-[60vh] overflow-y-auto">{children}</div>
    </ReactModal>
  );
};

export default Modal;
