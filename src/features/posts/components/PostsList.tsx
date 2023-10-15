import { Spinner } from "@/components/Spinner";
import PostExcerpt from "./PostExcerpt";
import { useGetPostsQuery } from "@/features/api";
import { useMemo } from "react";
import cx from "clsx";

const PostsList = () => {
  // const dispatch = useAppDispatch();
  // const orderedPostIds = useAppSelector(selectPostIds) as Post["id"][];
  // const postStatus = useAppSelector((state) => state.posts.status);
  // const error = useAppSelector((state) => state.posts.error);
  // useEffect(() => {
  //   if (postStatus === "idle") dispatch(fetchPosts());
  // }, [postStatus, dispatch]);

  const { data: posts = [], isLoading, isSuccess, isError, error, isFetching } = useGetPostsQuery();

  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice();
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date));
    return sortedPosts;
  }, [posts]);

  let content: React.ReactNode;

  if (isLoading) content = <Spinner text="Loading..." />;

  if (isError) content = <div>{error.toString()}</div>;

  if (isSuccess) {
    const renderedPosts = sortedPosts.map((post) => <PostExcerpt key={post.id} post={post} />);

    const containerClassName = cx("posts-container", { disabled: isFetching });

    content = <div className={containerClassName}>{renderedPosts}</div>;
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
