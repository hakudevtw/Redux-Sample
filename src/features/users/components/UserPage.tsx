import { useMemo } from "react";
import { useAppSelector } from "@/store/hooks";
import { Link, type RouteComponentProps } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";

import { selectUserById } from "..";
import { useGetPostsQuery } from "@/features/api";
import type { Post } from "@/features/posts";

interface Props extends RouteComponentProps<{ userId: string }> {}

const UserPage: React.FC<Props> = ({ match }) => {
  const { userId } = match.params;

  const user = useAppSelector((state) => selectUserById(state, userId));

  // 建立一個被 memoized 的 selector，確保透過 input 篩選出的結果能正確被 memoized
  const selectPostsForUser = useMemo(() => {
    const emptyArray: Post[] = [];
    return createSelector(
      [(res) => res.data as Post[], (_, userId: Post["id"]) => userId],
      (data, userId) => data?.filter((post) => post.userId === userId) ?? emptyArray
    );
  }, []);

  // 使用相同的 posts query 資料，但只截取我們要的部分出來
  const { postsForUser } = useGetPostsQuery(undefined, {
    selectFromResult: (result) => ({
      // 我們可以決定是否要從 result 物件中取出其他 metadata 放進去
      ...result,
      // 將 `postsForUser` 加到 result 物件中，也就是被篩選後的結果
      postsForUser: selectPostsForUser(result, userId),
    }),
  });

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
