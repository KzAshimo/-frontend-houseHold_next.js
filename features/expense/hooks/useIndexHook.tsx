"use client";

import axios from "@/lib/axios";
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

type ApiResponse<T> = { data: T };
type ErrorResponse = { message: string };

const fetcher = (url: string) =>
  axios
    .get<ApiResponse<Expense[]>>(url, { withCredentials: true })
    .then((res) => res.data.data);

const useExpenseIndex = () => {
  const { data, error, isLoading, mutate } = useSWR<Expense[], ErrorResponse>(
    "/api/v1/expense/index",
    fetcher,
    { revalidateOnFocus: false }
  );

  console.log(data);

  return {
    expenses: data ?? [],
    isLoading,
    error: error ? error.message : null,
    refetch: mutate,
  };
};

export default useExpenseIndex;
