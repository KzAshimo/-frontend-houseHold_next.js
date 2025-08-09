"use client";

import axiosInstance from "@/lib/axios";
import handleApiError from "@/lib/handleApiError";
import { useState } from "react";

const useDeleteIncome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteIncome = async (incomeId: number) => {
    setIsLoading(true);
    setError(null);

    try {
      await axiosInstance.delete(`/api/v1/income/${incomeId}`);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteIncome,
    isLoading,
    error,
  };
};

export default useDeleteIncome;
