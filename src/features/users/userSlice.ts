import { type EntityState, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { apiSlice } from "@/features/api";
import type { User } from ".";

const usersAdapter = createEntityAdapter<User>();
const initialState = usersAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<EntityState<User>, void>({
      query: () => "/users",
      transformResponse: (responseData: User[]) => usersAdapter.setAll(initialState, responseData),
    }),
  }),
});

export const { useGetUsersQuery } = extendedApiSlice;
export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector([selectUsersResult], (usersResult) => usersResult.data);

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors<RootState>((state) => selectUsersData(state) ?? initialState);
