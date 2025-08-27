"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import Modal from "@/components/items/modal";
import IncomeFormFields from "./incomeStoreForm";
import { Button } from "@headlessui/react";
import { FormProvider, useForm } from "react-hook-form";
import { IncomeFormData } from "./incomeStoreForm";

const StoreIncomeButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate } = useSWRConfig();
  const methods = useForm<IncomeFormData>();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSuccess = () => {
    closeModal();
    mutate("/api/v1/income/index");
  };

  return (
    <div className="flex justify-end m-3">
      <Button type="button" color="lime" onClick={openModal}>
        収入登録
      </Button>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="収入登録">
        <FormProvider {...methods}>
          <IncomeFormFields onSuccess={handleSuccess} />
        </FormProvider>
      </Modal>
    </div>
  );
};

export default StoreIncomeButton;
