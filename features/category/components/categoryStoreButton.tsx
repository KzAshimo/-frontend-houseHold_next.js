"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import InputFormModal from "@/components/items/modal/inputModal";
import { CategoryForm } from "./categoryStoreForm";
import { Button } from "@headlessui/react";

const StoreCategoryButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate } = useSWRConfig();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSuccess = () => {
    closeModal();
    mutate("/api/v1/category/index");
  };

  return (
    <>
      <div className="m-3">
        <Button
          className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
          onClick={openModal}
        >
          カテゴリ登録
        </Button>

        <InputFormModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="カテゴリ登録"
        >
          <CategoryForm onSuccess={handleSuccess} />
        </InputFormModal>
      </div>
    </>
  );
};

export default StoreCategoryButton;
