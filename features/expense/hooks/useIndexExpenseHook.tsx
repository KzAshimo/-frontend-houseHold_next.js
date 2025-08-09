"use client";

import fetcher from "@/lib/fetcher";
import useSWR from "swr";

type Expense = {
  id: number;
  user: string;
  category: string;
  content: string;
  amount: number;
  memo: string;
  created_at: string;
  updated_at: string;
};

const useExpenseIndex = () => {
  const { data, error, isLoading, mutate } = useSWR<Expense[]>(
    "/api/v1/expense/index",
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    expenses: data ?? [],
    isLoading,
    error: error ? error.message : null,
    refetch: mutate,
  };
};

export default useExpenseIndex;
