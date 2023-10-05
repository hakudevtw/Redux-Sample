import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import axios from "axios";
import type { Notification } from "./interfaces";

const initialState: Notification[] = [];

export const fetchNotifications = createAsyncThunk<
  Notification[],
  void,
  { state: RootState }
>("notifications/fetchNotifications", async (_, { getState }) => {
  const allNotifications = selectAllNotifications(getState());
  const [latestNotification] = allNotifications;
  const latestTimestamp = latestNotification ? latestNotification.date : "";
  const res = await axios.get(`/api/notifications?since=${latestTimestamp}`);

  return res.data;
});

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    allNotificationsRead(state) {
      state.forEach((notification) => {
        notification.read = true;
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.push(...action.payload);
      state.forEach((notification) => {
        notification.isNew = !notification.read;
      });
      state.sort((a, b) => b.date.localeCompare(a.date));
    });
  },
});

export const { allNotificationsRead } = notificationsSlice.actions;
export const selectAllNotifications = (state: RootState) => state.notifications;
export default notificationsSlice.reducer;
