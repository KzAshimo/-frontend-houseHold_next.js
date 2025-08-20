import fetcher from "@/lib/fetcher";
import useSWR from "swr";

type Notification = {
  id: number;
  user: string;
  title: string;
  content: string;
  type: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
};

const useIndexNotification = () => {
    const {data, error, isLoading, mutate} = useSWR<Notification[]>(
        "/api/v1/notification/index",
        fetcher,
        {revalidateOnFocus: false}
    );

    return {
        notifications: data ?? [],
        isLoading,
        error: error ? error.message : null,
        refetch: mutate,
    };
};

export default useIndexNotification;