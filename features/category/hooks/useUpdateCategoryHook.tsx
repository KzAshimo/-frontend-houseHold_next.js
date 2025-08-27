"use client";

import axiosInstance from "@/lib/axios";
import handleApiError from "@/lib/handleApiError";
import { useState } from "react";

export type UpdateCategoryPayload = {
  name: string;
  type: string;
};

const useUpdateCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateCategory = async (
    categoryId: number,
    payload: UpdateCategoryPayload
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await axiosInstance.put(`/api/v1/category/${categoryId}`, payload);
      return true;
    } catch (err) {
      setError(handleApiError(err));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateCategory,
    isLoading,
    error,
  };
};

export default useUpdateCategory;
