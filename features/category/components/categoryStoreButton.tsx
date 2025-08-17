"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import InputFormModal from "@/components/items/modal/inputModal";
import { Button } from "@/components/items/button/button";
import { CategoryForm } from "./categoryStoreForm";

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
      <div className="flex justify-end m-3">
        <Button type="button" color="amber" clickHandler={openModal}>
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
