import axiosInstance from "@/lib/axios";
import handleApiError from "@/lib/handleApiError";
import { useState } from "react";

type NotificationViewPayload = {
  notificationId: number;
  viewed_at: string;
};

const useStoreNotificationView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const storeNotificationView = async (payLoad: NotificationViewPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      await axiosInstance.post(
        `/api/v1/notification_view/${payLoad.notificationId}`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return { storeNotificationView, isLoading, error };
};

export default useStoreNotificationView;
