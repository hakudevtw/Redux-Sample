import { MockMethod } from "vite-plugin-mock";
import { getPosts } from "./model";

export default [
  {
    url: "/api/posts",
    method: "get",
    response: getPosts,
  },
] as MockMethod[];
