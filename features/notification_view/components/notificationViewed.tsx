import { useEffect } from "react";
import useStoreNotificationView from "../hooks/useStoreNotificationViewHook";

type Props = {
  notificationId: number;
};

const NotificationViewed = ({ notificationId }: Props) => {
  const { storeNotificationView } = useStoreNotificationView();

  useEffect(() => {
    if (notificationId) {
      storeNotificationView({
        notificationId,
        viewed_at: new Date().toISOString(),
      });
    }
  }, [notificationId]);
  return null;
};
export default NotificationViewed;
