"use client";

import axiosInstance from "@/lib/axios";
import handleApiError from "@/lib/handleApiError";
import { useState } from "react";

const useExpenseDelete = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteExpense = async (expenseId: number) => {
    setIsLoading(true);
    setError(null);

    try {
      await axiosInstance.delete(`api/v1/expense/${expenseId}`);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteExpense,
    isLoading,
    error,
  };
};

export default useExpenseDelete;
