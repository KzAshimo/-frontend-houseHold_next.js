"use client";

import fetcher from "@/lib/fetcher";
import useSWR from "swr";

export type ExpenseCategory = {
  id: number;
  name: string;
};

const useIndexExpenseCategory = () => {
  const { data, error, isLoading, mutate } = useSWR<ExpenseCategory[]>(
    "/api/v1/category/index_expense",
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    categories: data ?? [],
    isLoading,
    error: error ? error.message : null,
    refetch: mutate,
  };
};

export default useIndexExpenseCategory;
