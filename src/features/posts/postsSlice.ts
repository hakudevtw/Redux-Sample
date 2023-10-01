// RTK 提供的一個隨機 id 產生器，可以取代其他 uuid 產生器
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import type { Post, NewPost, EditPost, Reaction } from "./interfaces";
import { posts } from "@/mock/posts";

const initialState: Post[] = posts;

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // 在這裏需要在建立時為其生成一個 id，雖然可以在 component 中生成組好後再新增，
    // 但這樣做可能造成需要在多處做重複的動作，而在邏輯更為複雜時影響會更明顯
    // addPost(state, action: PayloadAction<Post>) {
    //   state.push(action.payload);
    // },

    // 客製化 action creator
    // 用 : PayloadAction 來定義 payload type
    addPost: {
      // 將 prepare 產生的 payload 拿去更新
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload);
      },
      // 產生 action payload (實際用於 action creator)
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
