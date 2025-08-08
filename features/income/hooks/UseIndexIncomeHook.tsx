"use client";

import axiosInstance from "@/lib/axios";
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

type ApiResponse<T> = { data: T };
type ErrorResponse = { message: string };

const fetcher = (url: string) =>
  axiosInstance
    .get<ApiResponse<Income[]>>(url, { withCredentials: true })
    .then((res) => res.data.data);

const useIndexIncome = () => {
  const { data, error, isLoading, mutate } = useSWR<Income[], ErrorResponse>(
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
