import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Post } from "../posts";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
    }),
    getPost: builder.query<Post, Post["id"]>({
      query: (postId) => `/posts/${postId}`,
    }),
  }),
});

export const { useGetPostsQuery, useGetPostQuery } = apiSlice;
