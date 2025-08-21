"use client";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useIndexNotification from "../hooks/useIndexNotificationHook";
import NotificationStoreButton from "./notificatonStoreButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const IndexNotificationModal = ({ isOpen, onClose }: Props) => {
  const { notifications, isLoading, error } = useIndexNotification();

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={onClose}
    >
      {/* 背景 */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-black/80 p-6 shadow-xl">
            <DialogTitle className="text-lg font-bold text-white">
              お知らせ一覧
            </DialogTitle>

            {/* コンテンツ */}
            <div className="mt-4">
              <table className="text-sm text-left border-collapse w-full">
                <thead className="bg-gray-500 border-b">
                  <tr>
                    <th className="px-2 py-2 w-1/4">入力者</th>
                    <th className="px-2 py-2 w-1/4">タイトル</th>
                    <th className="px-2 py-2 w-1/4">公開頻度</th>
                    <th className="px-2 py-2 w-1/4">編集</th>
                  </tr>
                </thead>

                <tbody>
                  {isLoading && (
                    <tr>
                      <td colSpan={2} className="px-2 py-2 text-center">
                        読み込み中...
                      </td>
                    </tr>
                  )}

                  {error && (
                    <tr>
                      <td
                        colSpan={2}
                        className="px-2 py-2 text-red-500 text-center"
                      >
                        {error}
                      </td>
                    </tr>
                  )}

                  {!isLoading &&
                    !error &&
                    notifications.map((notification) => (
                      <tr
                        key={notification.id}
                        className="border-b border-gray-600 text-white"
                      >
                        <td className="px-2 py-2">{notification.user}</td>
                        <td className="px-2 py-2">{notification.title}</td>
                        <td className="px-2 py-2">
                          {notification.type === "always"
                            ? "毎回"
                            : notification.type === "once"
                            ? "1度のみ"
                            : notification.type}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className=" mt-3 text-right flex justify-end">
              <NotificationStoreButton />

              <button
                className="rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600"
                onClick={onClose}
              >
                閉じる
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
export default IndexNotificationModal;
