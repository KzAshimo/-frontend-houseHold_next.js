"use client";

import fetcher from "@/lib/fetcher";
import useSWR from "swr";

type Income = {
  id: number;
  user: string;
  category: string;
  content: string;
  amount: number;
  memo: string;
  created_at: string;
  updated_at: string;
};

const useIndexIncome = () => {
  const { data, error, isLoading, mutate } = useSWR<Income[]>(
    "/api/v1/income/index",
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    incomes: data ?? [],
    isLoading,
    error: error ? error.message : null,
    refetch: mutate,
  };
};

export default useIndexIncome;
