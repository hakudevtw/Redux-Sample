import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import axios from "axios";
import { delay } from "@/utils/tools";
import type { User } from "./interfaces";

const initialState: User[] = [];

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => {
    const res = await axios.get("/api/users");
    await delay(2000);
    return res.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // state.push(...,action.payload);
      return action.payload;
    });
  },
});

export const selectAllUsers = (state: RootState) => state.users;
export const selectUserById = (userId: User["id"]) => (state: RootState) =>
  state.users.find((user) => user.id === userId);

export default userSlice.reducer;
