"use client";

import fetcher from "@/lib/fetcher";
import useSWR from "swr";

type ExpenseCategory = {
  id: number;
  name: string;
};

const useIndexCategoryExpense = () => {
  const { data, error, isLoading, mutate } = useSWR<ExpenseCategory[]>(
    "/api/v1/expense/index_category",
    fetcher,
    { revalidateOnFocus: false }
  );
  console.log(data);

  return {
    categories: data ?? [],
    isLoading,
    error: error ? error.message : null,
    refetch: mutate,
  };
};

export default useIndexCategoryExpense;
