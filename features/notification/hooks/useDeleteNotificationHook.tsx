"use client";

import axiosInstance from "@/lib/axios";
import handleApiError from "@/lib/handleApiError";
import { useState } from "react";

const useDeleteNotification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteNotification = async (notificationId: number) => {
    setIsLoading(true);
    setError(null);

    try {
      await axiosInstance.delete(`/api/v1/notification/${notificationId}`);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteNotification,
    isLoading,
    error,
  };
};

export default useDeleteNotification;
