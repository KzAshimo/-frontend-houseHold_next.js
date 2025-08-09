"use client";

import axiosInstance from "@/lib/axios";
import handleApiError from "@/lib/handleApiError";
import { useState } from "react";

type ExpensePayload = {
  userId: number;
  category_id: number;
  amount: number;
  content: string;
  memo?: string;
};

const useExpenseStore = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const storeExpense = async (payload: ExpensePayload) => {
    setIsLoading(true);
    setError(null);
    try {
      await axiosInstance.post("api/v1/expense/store", payload);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  };
  return {
    storeExpense,
    isLoading,
    error,
  };
};

export default useExpenseStore;
