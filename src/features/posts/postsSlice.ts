// RTK 提供的一個隨機 id 產生器，可以取代其他 uuid 產生器
import {
  createSlice,
  nanoid,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@/store";
import type { Post, NewPost, EditPost, Reaction } from "./interfaces";
import { posts } from "@/mock/posts";
import type { RequestState } from "@/store/interfaces";

const initialState: { posts: Post[] } & RequestState = {
  posts,
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  // Fetch Posts
  // Return Posts
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      // 將 prepare 產生的 payload 拿去更新
      reducer(state, action: PayloadAction<Post>) {
        state.posts.push(action.payload);
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
      const existingPost = state.posts.find((post) => post.id === id);
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
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) existingPost.reactions[reaction]++;
    },
  },
});

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const selectPostById = (postId: string) => (state: RootState) =>
  state.posts.posts.find((post) => post.id === postId);

// 另一種寫法
// export const selectPostById = (state, postId) => state.posts.find((post) => post.id === postId);
// 用法
// const post = useSelector(state => selectPostById(state, postId));

export const { addPost, updatePost, addReaction } = postsSlice.actions;
export default postsSlice.reducer;
