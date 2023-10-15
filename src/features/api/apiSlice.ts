import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Post, NewPost, EditPost, Reaction } from "../posts";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "Post" as const, id })),
        { type: "Post", id: "LIST" },
      ],
    }),
    getPost: builder.query<Post, Post["id"]>({
      query: (postId) => `/posts/${postId}`,
      providesTags: (_0, _1, arg) => [{ type: "Post", id: arg }],
    }),
    addNewPost: builder.mutation<Post, NewPost>({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    editPost: builder.mutation<void, EditPost>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PATCH",
        body: post,
      }),
      invalidatesTags: (_0, _1, arg) => [{ type: "Post", id: arg.id }],
    }),
    addReaction: builder.mutation({
      query: ({ postId, reaction }) => ({
        url: `posts/${postId}/reactions`,
        method: "POST",
        body: { reaction },
      }),
      async onQueryStarted(
        { postId, reaction }: { postId: Post["id"]; reaction: Reaction },
        { dispatch, queryFulfilled }
      ) {
        // `updateQueryData` 需傳入 endpoint name 和 cache key,
        // 讓他知道哪一塊 cache state 需要被更新
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
            // `draft` 有被 Immer 包起來，可以直接 mutate
            const post = draft.find((post) => post.id === postId);
            if (post) post.reactions[reaction]++;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useEditPostMutation,
  useAddReactionMutation,
} = apiSlice;
