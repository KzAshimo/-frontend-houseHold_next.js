"use client";

import axios from "@/lib/axios";
import useSWR from "swr";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
};

type NextApiResponse<T> = {
  data: T;
};

type ErrorResponse = {
  message: string;
};

const fetcher = (url: string) =>
  axios.get<NextApiResponse<User>>(url, { withCredentials: true }).then((res) => res.data.data);

const useUser = () => {
  const { data, error, isLoading, mutate } = useSWR<User, ErrorResponse>(
    "api/v1/user/show",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  return {
    user: data ?? null,
    isLoading,
    error: error ? error.message : null,
    refetch: mutate,
  };
};

export default useUser;
