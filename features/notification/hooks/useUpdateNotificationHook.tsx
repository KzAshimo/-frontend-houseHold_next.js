import axiosInstance from "@/lib/axios";
import handleApiError from "@/lib/handleApiError";
import { useState } from "react";

export type UpdateNotificationPayLoad = {
    title: string;
    content: string;
    type: string;
    start_date: string;
    end_date: string;
}

const useUpdateNotification = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateNotification = async (
        notificationId: number,
        payload: UpdateNotificationPayLoad
    ): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try{
            await axiosInstance.put(`api/v1/notification/${notificationId}`, payload);]
            return true;
        }catch (err){
            setError(handleApiError(err));
            return false;
        }finally{
            setIsLoading(false);
        }
    }

    return {
        updateNotification,
        isLoading,
        error,
    };
};

export default useUpdateNotification;