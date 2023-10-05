import type { Notification } from "@/features/notifications";

const notifications: Notification[] = [
  {
    id: "1",
    message: "Hello World",
    userId: "1",
    date: new Date(1998, 9, 30).toISOString(),
  },
  {
    id: "2",
    message: "Hey yo !",
    userId: "1",
    date: new Date(1998, 9, 30).toISOString(),
  },
  {
    id: "3",
    message: "Fake notifications ...",
    userId: "1",
    date: new Date(1998, 9, 30).toISOString(),
  },
];

export const getAllNotifications = (req: { query: { since: string } }) => {
  // since 為前端拿到最新通知的時間，根據其時間抓出前端還未拿到的通知

  // const { query } = req;
  // const { since } = query;
  // 先暫時回傳全部 XD
  return notifications;
};
