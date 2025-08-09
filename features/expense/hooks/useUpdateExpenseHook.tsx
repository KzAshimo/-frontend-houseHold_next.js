"use client";

import axiosInstance from "@/lib/axios";
import handleApiError from "@/lib/handleApiError";
import { useState } from "react";

export type UpdateExpensePayload = {
  amount: number;
  content: string;
  memo?: string;
};

const useExpenseUpdate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateExpense = async (
    expenseId: number,
    payload: UpdateExpensePayload
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await axiosInstance.put(`/api/v1/expense/${expenseId}`, payload);
      return true;
    } catch (err) {
      setError(handleApiError(err));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateExpense,
    isLoading,
    error,
  };
};

export default useExpenseUpdate;
