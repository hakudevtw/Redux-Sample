import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/store";
import type { Post, NewPost, EditPost, Reaction } from "./interfaces";
import type { RequestState } from "@/store/interfaces";
import { delay } from "@/utils/tools";

const initialState: { posts: Post[] } & RequestState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await axios.get("/api/posts");
  await delay(2000);
  return res.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost: NewPost) => {
    const res = await axios.post("/api/posts", initialPost);
    await delay(2000);
    return res.data as Post;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
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
      action: PayloadAction<{ postId: Post["id"]; reaction: Reaction }>
    ) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) existingPost.reactions[reaction]++;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message!;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      });
  },
});

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const selectPostById = (postId: Post["id"]) => (state: RootState) =>
  state.posts.posts.find((post) => post.id === postId);

// 另一種寫法
// export const selectPostById = (state, postId) => state.posts.find((post) => post.id === postId);
// 用法
// const post = useSelector(state => selectPostById(state, postId));

export const { updatePost, addReaction } = postsSlice.actions;
export default postsSlice.reducer;
