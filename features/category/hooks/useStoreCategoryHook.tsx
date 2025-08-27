"use client";

import axiosInstance from "@/lib/axios";
import handleApiError from "@/lib/handleApiError";
import { useState } from "react";

type CategoryPayload = {
  userId: number;
  name: string;
  type: string;
};

const useStoreCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const storeCategory = async (payload: CategoryPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      await axiosInstance.post("/api/v1/category/store", payload);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return { storeCategory, isLoading, error };
};

export default useStoreCategory;
