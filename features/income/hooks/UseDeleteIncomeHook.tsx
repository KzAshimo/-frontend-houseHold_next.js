"use client";

import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";
import { useState } from "react";

type ErrorResponse = {
  message: string;
  errors?: { [key: string]: string[] };
};

const useDeleteIncome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteIncome = async (expenseId: number) => {
    setIsLoading(true);
    setError(null);

    try {
      await axiosInstance.delete(`api/v1/income/${expenseId}`, {
        withCredentials: true,
      });
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        const responseData = err.response.data as ErrorResponse;
        setError(responseData.message || "削除を失敗しました。");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("不明なエラーが発生しました。");
      }
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
