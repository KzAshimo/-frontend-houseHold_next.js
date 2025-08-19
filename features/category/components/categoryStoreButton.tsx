"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import { Button } from "@headlessui/react";
import Modal from "./categoryStoreModal";
import { CategoryForm } from "./categoryStoreForm";

export default function StoreCategoryButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate } = useSWRConfig();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSuccess = () => {
    closeModal();
    mutate("/api/v1/category/index");
  };

  return (
    <div className="m-3">
      <Button
        className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-3 text-white hover:bg-gray-600"
        onClick={openModal}
      >
        カテゴリ登録
      </Button>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="カテゴリ登録">
        <CategoryForm onSuccess={handleSuccess} />
      </Modal>
    </div>
  );
}
