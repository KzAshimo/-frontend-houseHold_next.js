"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Dialog } from "@headlessui/react";
import useForLoginNotificationHook from "../hooks/useForLoginNotificationHook";
import NotificationViewed from "@/features/notification_view/components/notificationViewed";

const LoginNotificationModal = () => {
  const [showModal, setShowModal] = useState(false);
  const searchParams = useSearchParams();

  const { currentNotification, nextNotification, notifications } =
    useForLoginNotificationHook();

  // ログインページから遷移した場合のみモーダル表示
  useEffect(() => {
    const fromLogin = searchParams?.get("fromLogin");
    if (fromLogin && notifications.length > 0) {
      setShowModal(true);
    }
  }, [searchParams, notifications.length]);

  // currentNotification が null の場合モーダルを閉じる
  useEffect(() => {
    if (currentNotification === null) {
      setShowModal(false);
    }
  }, [currentNotification]);

  const handleNext = () => {
    if (!nextNotification()) {
      setShowModal(false);
    }
  };

  return (
    <Dialog
      open={showModal}
      onClose={() => setShowModal(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <Dialog.Panel className="bg-black/70 rounded-lg p-6 w-full max-w-md">
        {currentNotification && (
          <>
            {/* 既読登録 */}
            <NotificationViewed notificationId={currentNotification.id} />

            <Dialog.Title className="text-lg font-bold mb-2">
              {currentNotification.title}
            </Dialog.Title>
            <Dialog.Description className="mb-4">
              {currentNotification.content}
            </Dialog.Description>
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                閉じる
              </button>
              <button
                onClick={handleNext}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                次へ
              </button>
            </div>
          </>
        )}
      </Dialog.Panel>
    </Dialog>
  );
};

export default LoginNotificationModal;
