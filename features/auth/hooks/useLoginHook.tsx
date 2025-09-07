"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { AxiosError } from "axios";

type LoginInput = {
  email: string;
  password: string;
};

type ErrorResponse = {
  message: string;
  errors?: { [key: string]: string[] };
};

const useLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginInput) => {
    setIsLoading(true);
    setError(null);

    try {
      // 1.CSRF Cookie取得
      await axios.get(
        "https://backend-household-laravel-main-svt1o4.laravel.cloud/sanctum/csrf-cookie",
        { withCredentials: true }
      );

      // 2.ログイン post
      await axios.post(
        "https://backend-household-laravel-main-svt1o4.laravel.cloud/login",
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      // 成功時 リダイレクト
      router.push("/dashboard?fromLogin=1");
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        const responseData = err.response.data as ErrorResponse;
        setError(responseData.message || "ログインに失敗しました。");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("不明なエラーが発生しました");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

export default useLogin;
