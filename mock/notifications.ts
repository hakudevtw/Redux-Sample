import type { Notification } from "@/features/notifications";
import { randomUUID } from "crypto";
import { getRandomIntInclusive, generateRandomDate } from "@/utils/tools";

type NotificationContent = Omit<Notification, "id" | "date">;
const notifications: NotificationContent[] = [
  {
    userId: "0",
    message: "たとえどんなきっかけで生まれようと生命は同じです。",
  },
  {
    userId: "0",
    message: "火は一日で森を灰にするが 水と風は１００年かけて森を育てる。",
  },
  {
    userId: "1",
    message:
      "土に根を下ろし、風と共に生きよう。種と共に冬を越え、鳥と共に春を歌おう。",
  },
  {
    userId: "2",
    message: "梦だけど、梦じゃなかった！",
  },
  {
    userId: "2",
    message: "みんな、笑ってみな、おっかないが 逃げちゃうから。",
  },
  {
    userId: "3",
    message:
      "いつの間にこんなに大きくなって…うまく行かなかったら帰って来てもいいんだよ。",
  },
  {
    userId: "3",
    message: "黒は女を美しく見せるのよ。",
  },
  {
    userId: "3",
    message: "そんなに形に拘らないの、大切なのは心よ。",
  },
  {
    userId: "3",
    message: "おちこんだりもしたけれど、私はげんきです。",
  },
];

// req: { query: { since: string } }
export const getLatestNotifications = () => {
  // since 為前端拿到最新通知的時間，根據其時間抓出前端還未拿到的通知
  // const { query } = req;
  // const { since } = query;
  // const sinceDate = new Date(since);
  const randomNotifications = getRandomNotifications(3);
  return randomNotifications;
};

function getRandomNotifications(count: number) {
  const randomContents: NotificationContent[] = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = getRandomIntInclusive(0, notifications.length - 1);
    randomContents.push(notifications[randomIndex]);
  }

  const randomNotifications = randomContents.map((content) => ({
    ...content,
    id: randomUUID(),
    date: generateRandomDate(new Date(2023, 9, 5)).toISOString(),
  }));

  return randomNotifications;
}
