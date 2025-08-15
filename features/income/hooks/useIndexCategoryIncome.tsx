"use client";

import fetcher from "@/lib/fetcher";
import { use } from "react";
import useSWR from "swr";

type IncomeCategory = {
  category: string;
};

const useIndexIncome = () => {
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

export default useIndexIncome;
