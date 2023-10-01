import { useAppSelector } from "@/store/hooks";
import type { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { selectPost } from "../postsSlice";

import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";
import PostAuthor from "./PostAuthor";

interface Props extends RouteComponentProps<{ postId: string }> {}

const SinglePostPage: React.FC<Props> = ({ match }) => {
  const { postId } = match.params;

  // 只要 『useSelector 所回傳的 value』 改變時 (new reference)，就會迫使 component 進行 rerender
  // 盡可能從 store 準確取得最小單位的資料，確保 component 只在特定資料改變時才 rerender
  const post = useAppSelector(selectPost(postId));

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
