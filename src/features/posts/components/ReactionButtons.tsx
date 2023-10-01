import { useAppDispatch } from "@/store/hooks";
import { typedEntries } from "@/utils/array-methods";
import { addReaction } from "../postsSlice";
import type { Post } from "../interfaces";
import { reactionEmoji } from "../constants";

interface Props {
  post: Post;
}

const ReactionButtons: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();

  const reactionButtons = typedEntries(reactionEmoji).map(([name, emoji]) => {
    const handleAddReaction = () =>
      dispatch(addReaction({ postId: post.id, reaction: name }));

    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={handleAddReaction}
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
