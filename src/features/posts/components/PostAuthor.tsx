import { useAppSelector } from "@/store/hooks";
import { selectUserById } from "@/features/users/userSlice";

interface Props {
  userId: string;
}

const PostAuthor: React.FC<Props> = ({ userId }) => {
  const author = useAppSelector((state) => selectUserById(state, userId));

  return <span>by {author ? author.name : "Unknown author"}</span>;
};

export default PostAuthor;
