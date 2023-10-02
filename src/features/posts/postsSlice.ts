// RTK 提供的一個隨機 id 產生器，可以取代其他 uuid 產生器
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import type { Post, NewPost, EditPost, Reaction } from "./interfaces";
import { posts } from "@/mock-data/posts";

const initialState: Post[] = posts;

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload);
      },
      prepare(postContent: NewPost) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
            ...postContent,
          },
        };
      },
    },

    updatePost(state, action: PayloadAction<EditPost>) {
      const { id, title, content } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },

    addReaction(
      state,
      action: PayloadAction<{ postId: string; reaction: Reaction }>
    ) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) existingPost.reactions[reaction]++;
    },
  },
});

export const selectPosts = (state: RootState) => state.posts;
export const selectPost = (postId: string) => (state: RootState) =>
  state.posts.find((post) => post.id === postId);
export const { addPost, updatePost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;
