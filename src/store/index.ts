import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "../features/posts";
import { usersReducer } from "../features/users";
import { notificationsReducer } from "@/features/notifications";
import { apiSlice } from "@/features/api";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    apiSlice.middleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
