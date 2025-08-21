"use client"

import { Button } from "@headlessui/react";
import { useState } from "react";
import { useSWRConfig } from "swr";
import Modal from "./notificationStoreModal";
import { NotificationForm } from "./notificationStoreForm";

const NotificationStoreButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {mutate} = useSWRConfig();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSuccess = () => {
        closeModal();
        mutate("api/v1/notification/index");
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
        <NotificationForm onSuccess={handleSuccess} />
      </Modal>
    </div>
  );
}

export default NotificationStoreButton;