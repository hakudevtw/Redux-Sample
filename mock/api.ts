import { MockMethod } from "vite-plugin-mock";
import { getAllPosts, getAllUsers, addNewPost } from "./model";

export default [
  {
    url: "/api/posts",
    method: "get",
    response: getAllPosts,
  },
  {
    url: "/api/users",
    method: "get",
    response: getAllUsers,
  },
  {
    url: "/api/posts",
    method: "post",
    response: addNewPost,
  },
] as MockMethod[];
