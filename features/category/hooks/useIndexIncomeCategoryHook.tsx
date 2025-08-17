"use client";

import fetcher from "@/lib/fetcher";
import useSWR from "swr";

type IncomeCategory = {
  id: number;
  name: string;
};

const useIndexIncomeCategory = () => {
  const { data, error, isLoading, mutate } = useSWR<IncomeCategory>(
    "/api/v1/category/index_income",
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    incomeCategories: data ?? [],
    isLoading,
    error: error ? error.message : null,
    refetch: mutate,
  };
};

export default useIndexIncomeCategory;
