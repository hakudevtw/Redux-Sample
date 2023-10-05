import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "../features/posts";
import { usersReducer } from "../features/users";
import { notificationsReducer } from "@/features/notifications";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
