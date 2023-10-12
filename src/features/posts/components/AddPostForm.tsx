import { type ChangeEvent, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectAllUsers } from "@/features/users";
import type { NewPost } from "../interfaces";
import { formIsValid } from "@/utils/tools";
import { useAddNewPostMutation } from "@/features/api";

const AddPostForm = () => {
  const users = useAppSelector(selectAllUsers);
  // const dispatch = useAppDispatch();
  // const [requestStatus, setRequestStatus] = useState<RequestStatus>("idle");
  // const canSave = formIsValid(postData) && requestStatus === "idle";

  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  const [postData, setPostData] = useState<Readonly<NewPost>>({
    title: "",
    content: "",
    userId: "",
  });

  const canSave = formIsValid(postData) && !isLoading;

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setPostData((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  const onSavePostClicked = async () => {
    if (!canSave) return;

    try {
      await addNewPost(postData).unwrap();
      setPostData({ title: "", content: "", userId: "" });
    } catch (err) {
      console.error("Failed to save the post: ", err);
    }
    setPostData({ title: "", content: "", userId: "" });
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="title">Post Title:</label>
        <input type="text" id="title" name="title" value={postData.title} onChange={handleChange} />
        <label htmlFor="userId">Author:</label>
        <select id="userId" name="userId" value={postData.userId} onChange={handleChange}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="content">Content:</label>
        <textarea id="content" name="content" value={postData.content} onChange={handleChange} />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
