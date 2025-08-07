"use client";

import axios from "axios";
import useSWR from "swr";

type Category = {
  id: number;
  user: string;
  name: string;
  type: string;
  created_at: string;
  updated_at: string;
};

type ApiResponse<T> = { data: T };
type ErrorResponse = { message: string };

const fetcher = (url: string) =>
  axios
    .get<ApiResponse<Category[]>>(url, { withCredentials: true })
    .then((res) => res.data.data);

const useCategoryIndex = () => {
  const { data, error, isLoading, mutate } = useSWR<Category[], ErrorResponse>(
    "/api/v1/category/index",
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

export default useCategoryIndex;
