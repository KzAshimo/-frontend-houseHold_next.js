"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import { ExpenseForm } from "../components/ExpenseForm";
import InputFormModal from "@/components/items/modal/InputModal";
import { Button } from "@/components/items/button/Button";

const StoreExpenseButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate } = useSWRConfig();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSuccess = () => {
    closeModal();
    mutate("/api/v1/expense/index");
  };

  return (
    <>
      <div className="flex justify-end m-3">
        <Button type="button" color="lime" clickHandler={openModal}>
          支出登録
        </Button>
      </div>

      <InputFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="支出登録"
      >
        <ExpenseForm onSuccess={handleSuccess} />
      </InputFormModal>
    </>
  );
};

export default StoreExpenseButton;
