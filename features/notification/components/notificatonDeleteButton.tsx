"use client";

import { Button } from "@headlessui/react";
import { KeyedMutator } from "swr";
import useDeleteNotification from "../hooks/useDeleteNotificationHook";

type Notification = {
  id: number;
  user: string;
  title: string;
  content: string;
  type: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
};

type Props = {
  notificationId: number;
  onDeleted?: KeyedMutator<Notification[]>;
};

const NotificationDeleteButton = ({ notificationId, onDeleted }: Props) => {
  const { deleteNotification, isLoading, error } = useDeleteNotification();

  const handleClick = async () => {
    if (!confirm("本当に削除しますか?")) return;

    try {
      await deleteNotification(notificationId);
      if (onDeleted) {
        await onDeleted();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button
        className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? "削除中..." : "削除"}
      </Button>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </>
  );
};

export default NotificationDeleteButton;
