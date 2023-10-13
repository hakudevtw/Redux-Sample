import { useState, type ChangeEvent } from "react";
import { useHistory, type RouteComponentProps } from "react-router-dom";
import { useEditPostMutation, useGetPostQuery } from "@/features/api";

interface Props extends RouteComponentProps<{ postId: string }> {}

const EditPostForm: React.FC<Props> = ({ match }) => {
  const { postId } = match.params;
  const history = useHistory();
  // const dispatch = useAppDispatch();
  // const post = useAppSelector((state) => selectPostById(state, postId));

  const { data: post } = useGetPostQuery(postId);
  const [updatePost] = useEditPostMutation();

  const [title, setTitle] = useState(post!.title);
  const [content, setContent] = useState(post!.content);

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const onSavePostClicked = async () => {
    if (!title || !content) return;
    try {
      await updatePost({ id: postId, title, content });
      history.push(`/posts/${postId}`);
    } catch (error) {
      console.log(error);
    }
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
