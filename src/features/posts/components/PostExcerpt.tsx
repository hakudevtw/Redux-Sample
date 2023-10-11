import { memo } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { selectPostById } from "..";
import ReactionButtons from "./ReactionButtons";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import type { Post } from "../interfaces";
interface Props {
  postId: Post["id"];
}

const PostExcerpt: React.FC<Props> = ({ postId }) => {
  const post = useAppSelector((state) => selectPostById(state, postId))!;

  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  );
};

export default PostExcerpt;
