"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { useSWRConfig } from "swr";

type ErrorResponse = {
  message: string;
};

const useLogout = () => {
  const router = useRouter();
  const {mutate} = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await axios.post("/logout");

      await mutate("/v1/user", null, false);

      router.push("/login");
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        const responseData = err.response.data as ErrorResponse;
        setError(responseData.message || "ログアウトに失敗しました。");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("不明なエラーが発生しました");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading, error };
};

export default useLogout;