import { useAppSelector } from "@/store/hooks";
import type { RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";
import { selectPostById } from "../postsSlice";

import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";
import PostAuthor from "./PostAuthor";

interface Props extends RouteComponentProps<{ postId: string }> {}

const SinglePostPage: React.FC<Props> = ({ match }) => {
  const { postId } = match.params;
  const post = useAppSelector((state) => selectPostById(state, postId));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  );
};

export default SinglePostPage;
