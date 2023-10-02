import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { users } from "@/mock-data/users";

interface User {
  id: string;
  name: string;
}

const initialState: User[] = users;

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectUsers = (state: RootState) => state.users;
export const selectUser = (userId: string) => (state: RootState) =>
  state.users.find((user) => user.id === userId);

export default userSlice.reducer;
