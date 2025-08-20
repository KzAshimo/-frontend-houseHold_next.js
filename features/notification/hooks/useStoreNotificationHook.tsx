import axiosInstance from "@/lib/axios";
import handleApiError from "@/lib/handleApiError";
import { useState } from "react";

type NotificationPayload = {
    userId: number;
    title: string;
    content: string;
    type: string;
    start_date: string;
    end_date: string;
}

const useStoreNotification = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const storeNotification = async (payLoad: NotificationPayload) => {
        setIsLoading(true);
        setError(null);
        try{
            await axiosInstance.post("/api/v1/notification/store", payLoad);
        }catch(err){
            setError(handleApiError(err));
        }finally{
            setIsLoading(false);
        }
    };

    return {storeNotification, isLoading, error};
};

export default useStoreNotification;