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

    await axios.get("/sanctum/csrf-cookie", { withCredentials: true });

    try {
      await axios.post("/login", data, { withCredentials: true });

      router.push("/dashboard");
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