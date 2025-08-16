"use client";

import fetcher from "@/lib/fetcher";
import useSWR from "swr";

type Category = {
  id: number;
  user: string;
  name: string;
  type: string;
  created_at: string;
  updated_at: string;
};

const useIndexCategory = () => {
  const { data, error, isLoading, mutate } = useSWR<Category[]>(
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

export default useIndexCategory;
