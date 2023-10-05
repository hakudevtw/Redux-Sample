import type { User } from "@/features/users";

export const users: User[] = [
  { id: "0", name: "風の谷のナウシカ" },
  { id: "1", name: "天空の城ラピュタ" },
  { id: "2", name: "龙猫" },
  { id: "3", name: "魔女の宅急便" },
];

export const getAllUsers = () => users;
