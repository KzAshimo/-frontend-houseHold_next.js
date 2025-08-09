"use client";

import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";
import { useState } from "react";

type ErrorResponse = {
  message: string;
  errors?: { [key: string]: string[] };
};

export type UpdateIncomePayload = {
  amount: number;
  content: string;
  memo?: string;
};

const useUpdateIncome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateIncome = async (
    expenseId: number,
    payload: UpdateIncomePayload
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await axiosInstance.put(`/api/v1/income/${expenseId}`, payload, {
        withCredentials: true,
      });
      return true;
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        const responseData = err.response.data as ErrorResponse;
        setError(responseData.message || "更新を失敗しました。");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("不明なエラーが発生しました。");
      }
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
