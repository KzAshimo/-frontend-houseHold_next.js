import axiosInstance from "@/lib/axios";
import handleApiError from "@/lib/handleApiError";
import { useRouter } from "next/navigation";
import { useState } from "react";

type UserPayload = {
  name: string;
  email: string;
  password: string;
  role: string;
};

const useStoreUserHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const storeUser = async (payload: UserPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      // CSRFトークン取得
      await axiosInstance.get("sanctum/csrf-cookie");

      await axiosInstance.post("/v1/user/store", payload);
      router.push("/login");
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    storeUser,
    isLoading,
    error,
  };
};
export default useStoreUserHook;
