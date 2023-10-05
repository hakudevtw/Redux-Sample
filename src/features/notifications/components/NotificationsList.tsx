import { useLayoutEffect } from "react";
import cx from "clsx";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { formatDistanceToNow, parseISO } from "date-fns";
import { selectAllUsers } from "@/features/users";
import {
  selectAllNotifications,
  allNotificationsRead,
} from "../notificationsSlice";

const NotificationsList = () => {
  const notifications = useAppSelector(selectAllNotifications);
  const users = useAppSelector(selectAllUsers);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(allNotificationsRead());
  });

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date);
    const timeAgo = formatDistanceToNow(date);
    const user = users.find((user) => user.id === notification.userId) ?? {
      name: "Unknown User",
    };

    return (
      <div
        key={notification.id}
        className={cx("notification", { new: notification.isNew })}
      >
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    );
  });

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  );
};

export default NotificationsList;
