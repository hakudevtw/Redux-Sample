import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Post, NewPost } from "../posts";

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
    addNewPost: builder.mutation<Post, NewPost>({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        // Include the entire post object as the body of the request
        body: initialPost,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useGetPostQuery, useAddNewPostMutation } = apiSlice;
