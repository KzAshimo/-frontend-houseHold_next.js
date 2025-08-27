"use client";

import axiosInstance from "@/lib/axios";
import handleApiError from "@/lib/handleApiError";
import { useState } from "react";

const useDeleteCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteCategory = async (categoryId: number) => {
    setIsLoading(true);
    setError(null);

    try {
      await axiosInstance.delete(`/api/v1/category/${categoryId}`);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteCategory,
    isLoading,
    error,
  };
};

export default useDeleteCategory;
