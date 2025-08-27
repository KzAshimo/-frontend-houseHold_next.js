import fetcher from "@/lib/fetcher";
import useSWR from "swr";

type NotificationView = {
  id: number;
  user: string;
  notification: string;
  viewed_at: string;
  created_at: string;
  updated_at: string;
};

const useIndexNotificationView = () => {
    const {data, error, isLoading, mutate} = useSWR<NotificationView[]>(
        "/api/v1/notification_view/index",
        fetcher,
        {revalidateOnFocus: false}
    );

    return {
        notificationViews: data ?? [],
        isLoading,
        error: error ? error.message : null,
        refetch: mutate,
    };
};

export default useIndexNotificationView;