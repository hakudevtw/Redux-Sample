import { useAppSelector } from "@/store/hooks";
import { Link, type RouteComponentProps } from "react-router-dom";

import { selectUserById } from "..";
import { selectAllPosts } from "@/features/posts";

interface Props extends RouteComponentProps<{ userId: string }> {}

const UserPage: React.FC<Props> = ({ match }) => {
  const { userId } = match.params;

  const user = useAppSelector((state) => selectUserById(state, userId));

  const postsForUser = useAppSelector(selectAllPosts).filter((post) => post.userId === userId);

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user?.name}</h2>

      <ul>{postTitles}</ul>
    </section>
  );
};

export default UserPage;
