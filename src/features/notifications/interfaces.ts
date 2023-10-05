import type { User } from "../users";

export interface Notification {
  id: string;
  date: string;
  message: string;
  userId: User["id"];
  read?: boolean;
  isNew?: boolean;
}
