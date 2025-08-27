"use client";

import axiosInstance from "@/lib/axios";
import handleApiError from "@/lib/handleApiError";
import { useState } from "react";

type IncomePayload = {
  userId: number;
  category_id: number;
  amount: number;
  content: string;
  memo?: string;
};

const useStoreIncome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const storeIncome = async (payload: IncomePayload) => {
    setIsLoading(true);
    setError(null);
    try {
      await axiosInstance.post("/api/v1/income/store", payload);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return { storeIncome, isLoading, error };
};

export default useStoreIncome;
