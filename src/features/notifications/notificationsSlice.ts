import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import axios from "axios";
import type { Notification } from "./interfaces";

const notificationsAdapter = createEntityAdapter<Notification>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});
const initialState = notificationsAdapter.getInitialState();

export const fetchNotifications = createAsyncThunk<Notification[], void, { state: RootState }>(
  "notifications/fetchNotifications",
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState());
    const [latestNotification] = allNotifications;
    const latestTimestamp = latestNotification ? latestNotification.date : "";
    const res = await axios.get(`/api/notifications?since=${latestTimestamp}`);

    return res.data;
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    allNotificationsRead(state) {
      Object.values(state.entities).forEach((notification) => {
        notification!.read = true;
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      notificationsAdapter.upsertMany(state, action.payload);
      Object.values(state.entities).forEach((notification) => {
        notification!.isNew = !notification!.read;
      });
    });
  },
});

export const { allNotificationsRead } = notificationsSlice.actions;
export const { selectAll: selectAllNotifications } = notificationsAdapter.getSelectors<RootState>(
  (state) => state.notifications
);
export default notificationsSlice.reducer;
