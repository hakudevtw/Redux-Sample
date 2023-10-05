import { randomUUID } from "crypto";
import type { NewPost, Post } from "@/features/posts";

const posts = [
  {
    id: "1",
    title: "First Post!",
    content: "Hello!",
    userId: "0",
    date: new Date(1998, 9, 30).toISOString(),
    reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
  },
  {
    id: "2",
    title: "Second Post",
    content: "More text",
    userId: "1",
    date: new Date(1998, 9, 30).toISOString(),
    reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
  },
];

export const getAllPosts = () => posts;

export const addNewPost = (req: { body: NewPost }) => {
  const { body } = req;
  const newPost = {
    ...body,
    id: randomUUID(),
    date: new Date().toISOString(),
    reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
  };
  posts.push(newPost);
  return newPost as Post;
};
