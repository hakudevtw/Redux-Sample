import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectAllPosts, fetchPosts } from "../postsSlice";
import { Spinner } from "@/components/Spinner";
import PostExcerpt from "./PostExcerpt";

const PostsList = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const postStatus = useAppSelector((state) => state.posts.status);
  const error = useAppSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === "idle") dispatch(fetchPosts());
  }, [postStatus, dispatch]);

  let content;

  if (postStatus === "loading") content = <Spinner text="Loading..." />;

  if (postStatus === "failed") content = <div>{error}</div>;

  if (postStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ));
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
