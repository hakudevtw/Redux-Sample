import { typedEntries } from "@/utils/array-methods";
import type { Post } from "../interfaces";
import { reactionEmoji } from "../constants";
import { useAddReactionMutation } from "@/features/api";

interface Props {
  post: Post;
}

const ReactionButtons: React.FC<Props> = ({ post }) => {
  const [addReaction] = useAddReactionMutation();

  const reactionButtons = typedEntries(reactionEmoji).map(([name, emoji]) => {
    const handleAddReaction = () => addReaction({ postId: post.id, reaction: name });

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
