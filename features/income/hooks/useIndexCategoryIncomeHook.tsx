"use client";

import fetcher from "@/lib/fetcher";
import useSWR from "swr";

type IncomeCategory = {
  id: number;
  name: string;
};

const useIndexCategoryIncome = () => {
  const { data, error, isLoading, mutate } = useSWR<IncomeCategory[]>(
    "/api/v1/income/index_category",
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

export default useIndexCategoryIncome;
