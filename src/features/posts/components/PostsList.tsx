import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectPostIds, fetchPosts } from "../postsSlice";
import { Spinner } from "@/components/Spinner";
import PostExcerpt from "./PostExcerpt";
import type { Post } from "../interfaces";

const PostsList = () => {
  const dispatch = useAppDispatch();
  const orderedPostIds = useAppSelector(selectPostIds) as Post["id"][]; // Overwrite type EntityId[]
  const postStatus = useAppSelector((state) => state.posts.status);
  const error = useAppSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === "idle") dispatch(fetchPosts());
  }, [postStatus, dispatch]);

  let content;

  if (postStatus === "loading") content = <Spinner text="Loading..." />;

  if (postStatus === "failed") content = <div>{error}</div>;

  if (postStatus === "succeeded") {
    content = orderedPostIds.map((postId) => <PostExcerpt key={postId} postId={postId} />);
  }

  if (postStatus === "loading") return <Spinner text="Loading..." />;

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
