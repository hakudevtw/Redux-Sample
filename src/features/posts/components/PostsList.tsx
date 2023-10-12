import { Spinner } from "@/components/Spinner";
import PostExcerpt from "./PostExcerpt";
import { useGetPostsQuery } from "@/features/api";
import { useMemo } from "react";

const PostsList = () => {
  // const dispatch = useAppDispatch();
  // const orderedPostIds = useAppSelector(selectPostIds) as Post["id"][];
  // const postStatus = useAppSelector((state) => state.posts.status);
  // const error = useAppSelector((state) => state.posts.error);
  // useEffect(() => {
  //   if (postStatus === "idle") dispatch(fetchPosts());
  // }, [postStatus, dispatch]);

  const {
    data: posts = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery();

  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice();
    // Sort posts in descending chronological order
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date));
    return sortedPosts;
  }, [posts]);

  let content: React.ReactNode;

  if (isLoading) content = <Spinner text="Loading..." />;

  if (isError) content = <div>{error.toString()}</div>;

  if (isSuccess) {
    content = sortedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ));
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
