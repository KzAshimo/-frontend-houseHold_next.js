"use client";

import axiosInstance from "@/lib/axios";
import handleApiError from "@/lib/handleApiError";
import { useState } from "react";

export type UpdateIncomePayload = {
  amount: number;
  content: string;
  memo?: string;
};

const useUpdateIncome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateIncome = async (
    incomeId: number,
    payload: UpdateIncomePayload
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await axiosInstance.put(`/api/v1/income/${incomeId}`, payload);
      return true;
    } catch (err) {
      setError(handleApiError(err));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateIncome,
    isLoading,
    error,
  };
};

export default useUpdateIncome;
