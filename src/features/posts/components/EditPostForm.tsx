import { useState, type ChangeEvent } from "react";
import { useHistory, type RouteComponentProps } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectPost, updatePost } from "../postsSlice";

interface Props extends RouteComponentProps<{ postId: string }> {}

const EditPostForm: React.FC<Props> = ({ match }) => {
  const { postId } = match.params;
  const dispatch = useAppDispatch();
  const history = useHistory();
  const post = useAppSelector(selectPost(postId));

  const [title, setTitle] = useState(post!.title);
  const [content, setContent] = useState(post!.content);

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const onSavePostClicked = () => {
    if (!title || !content) return;
    dispatch(updatePost({ id: postId, title, content }));
    history.push(`/posts/${postId}`);
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  );
};

export default EditPostForm;
