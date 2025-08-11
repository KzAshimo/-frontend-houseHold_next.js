"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import InputFormModal from "@/components/items/modal/inputModal";
import { Button } from "@/components/items/button/button";
import { IncomeForm } from "./incomeStoreForm";

const StoreIncomeButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate } = useSWRConfig();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSuccess = () => {
    closeModal();
    mutate("/api/v1/income/index");
  };

  return (
    <>
      <div className="flex justify-end m-3">
        <Button type="button" color="lime" clickHandler={openModal}>
          収入登録
        </Button>

        <InputFormModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="収入登録"
        >
          <IncomeForm onSuccess={handleSuccess} />
        </InputFormModal>
      </div>
    </>
  );
};

export default StoreIncomeButton;
