import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import axios from "axios";
import type { User } from "../users";

export interface Notification {
  id: string;
  date: string;
  message: string;
  userId: User["id"];
}

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
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.push(...action.payload);
      state.sort((a, b) => b.date.localeCompare(a.date));
    });
  },
});

export const selectAllNotifications = (state: RootState) => state.notifications;
export default notificationsSlice.reducer;
