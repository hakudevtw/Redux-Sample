import { randomUUID } from "crypto";
import type { NewPost, Post } from "@/features/posts";
import { generateRandomDate } from "@/utils/tools";

const posts = [
  {
    id: "1",
    title: "天空之城名言",
    content:
      "土に根を下ろし、風と共に生きよう。種と共に冬を越え、鳥と共に春を歌おう。",
    userId: "0",
    date: generateRandomDate(new Date(2023, 9, 5)).toISOString(),
    reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
  },
  {
    id: "2",
    title: "龍貓名言",
    content: "梦だけど、梦じゃなかった！",
    userId: "1",
    date: generateRandomDate(new Date(2023, 9, 5)).toISOString(),
    reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
  },
];

export const getAllPosts = () => posts;

export const getSinglePost = (req: { query: { postId: Post["id"] } }) => {
  const postId = req.query.postId;
  console.log(postId);
  return posts.find((post) => post.id === postId);
};

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
