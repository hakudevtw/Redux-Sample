import { MockMethod } from "vite-plugin-mock";
import { getAllPosts, addNewPost } from "./posts";
import { getAllUsers } from "./users";
import { getLatestNotifications } from "./notifications";

export default [
  {
    url: "/api/posts",
    method: "get",
    response: getAllPosts,
  },
  {
    url: "/api/posts",
    method: "post",
    response: addNewPost,
  },
  {
    url: "/api/users",
    method: "get",
    response: getAllUsers,
  },
  {
    url: "/api/notifications",
    method: "get",
    response: getLatestNotifications,
  },
] as MockMethod[];
