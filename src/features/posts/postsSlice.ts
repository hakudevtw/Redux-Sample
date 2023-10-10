import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/store";
import type { Post, NewPost, EditPost, Reaction } from "./interfaces";
import type { RequestState } from "@/store/interfaces";
import { delay } from "@/utils/tools";

const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState<RequestState>({
  status: "idle",
  error: null,
});

export const fetchPosts = createAsyncThunk<Post[]>("posts/fetchPosts", async () => {
  const res = await axios.get("/api/posts");
  await delay(2000);
  return res.data;
});

export const addNewPost = createAsyncThunk<Post, NewPost>(
  "posts/addNewPost",
  async (initialPost) => {
    const res = await axios.post("/api/posts", initialPost);
    await delay(2000);
    return res.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updatePost(state, action: PayloadAction<EditPost>) {
      const { id, title, content } = action.payload;
      const existingPost = state.entities[id];
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },

    addReaction(state, action: PayloadAction<{ postId: Post["id"]; reaction: Reaction }>) {
      const { postId, reaction } = action.payload;
      const existingPost = state.entities[postId];
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
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message!;
      })
      .addCase(addNewPost.fulfilled, postsAdapter.addOne);
  },
});

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors<RootState>((state) => state.posts);

export const { updatePost, addReaction } = postsSlice.actions;
export default postsSlice.reducer;
