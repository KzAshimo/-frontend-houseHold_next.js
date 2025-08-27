"use client";

import { useState } from "react";
import NotificationUpdateModal from "./notificationUpdateModal";

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
  notification: Notification;
};

const NotificationUpdateButton = ({ notification }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm font-semibold text-white"
        onClick={() => setIsOpen(true)}
      >
        編集
      </button>

      <NotificationUpdateModal
        notification={notification}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default NotificationUpdateButton;
