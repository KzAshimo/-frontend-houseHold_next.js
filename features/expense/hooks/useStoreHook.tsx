"use client";

import axios, { AxiosError } from "axios";
import { useState } from "react";

type ExpensePayload = {
  userId: number;
  categoryId: number;
  amount: number;
  content: string;
  memo?: string;
};

type ErrorResponse = {
  message: string;
  errors?: { [key: string]: string[] };
};

const useExpenseStore = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const storeExpense = async (payload: ExpensePayload) => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.post("api/v1/expense/store", payload, {
        withCredentials: true,
      });
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        const responseData = err.response.data as ErrorResponse;
        setError(responseData.message || "登録を失敗しました。");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("不明なエラーが発生しました");
      }
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
