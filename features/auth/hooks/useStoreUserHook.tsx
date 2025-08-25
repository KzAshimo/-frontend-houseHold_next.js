import axiosInstance from "@/lib/axios";
import handleApiError from "@/lib/handleApiError";
import { useState } from "react";

type UserPayload = {
    name: string;
    email: string;
    password: string;
    role: string;
}

const useStoreUserHook = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const storeUser = async (payload: UserPayload) => {
        setIsLoading(true);
        setError(null);
        try{
            await axiosInstance.post("/api/v1/user/store", payload);
        }catch(err){
            setError(handleApiError(err));
        }finally{
            setIsLoading(false);
        }
    };

    return {
        storeUser,
        isLoading,
        error,
    };

}
export default useStoreUserHook;