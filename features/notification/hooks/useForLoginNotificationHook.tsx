"use client";

import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import { useState, useMemo, useCallback } from "react";

export type Notification = {
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

const useForLoginNotificationHook = () => {
  const { data, error, isLoading, mutate } = useSWR<Notification[]>(
    "/api/v1/notification/for_login",
    fetcher,
    { revalidateOnFocus: false }
  );

  const notifications = data ?? [];

  // null = モーダル非表示、数値 = 現在の通知インデックス
  const [index, setIndex] = useState<number | null>(0);

  const currentNotification = useMemo(() => {
    if (index === null) return null;
    return notifications[index] ?? null;
  }, [notifications, index]);

  const nextNotification = useCallback((): boolean => {
    if (index === null) return false;

    const nextIndex = index + 1;
    if (nextIndex < notifications.length) {
      setIndex(nextIndex);
      return true; // 次がある
    }

    setIndex(null); // もう次がない → モーダル非表示
    return false;
  }, [index, notifications.length]);

  return {
    notifications,
    currentNotification,
    nextNotification,
    isLoading,
    error: error?.message ?? null,
    refetch: mutate,
  };
};

export default useForLoginNotificationHook;
