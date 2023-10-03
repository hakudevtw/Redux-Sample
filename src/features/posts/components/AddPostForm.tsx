import { type ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addNewPost } from "../postsSlice";
import { selectUsers } from "@/features/users";
import type { NewPost } from "../interfaces";
import { formIsValid } from "@/utils/tools";
import type { RequestStatus } from "@/store/interfaces";

const AddPostForm = () => {
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  const [requestStatus, setRequestStatus] = useState<RequestStatus>("idle");
  const [postData, setPostData] = useState<Readonly<NewPost>>({
    title: "",
    content: "",
    userId: "",
  });
  const canSave = formIsValid(postData) && requestStatus === "idle";

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setPostData((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  const onSavePostClicked = async () => {
    if (!canSave) return;

    try {
      setRequestStatus("loading");
      const data = await dispatch(addNewPost(postData)).unwrap();
      // payload from fulfilled action
      console.log(data);
      setPostData({ title: "", content: "", userId: "" });
    } catch (error) {
      // error from rejected action
      console.log("Failed Adding New Post...", error);
    } finally {
      setRequestStatus("idle");
    }
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
        <input
          type="text"
          id="title"
          name="title"
          value={postData.title}
          onChange={handleChange}
        />
        <label htmlFor="userId">Author:</label>
        <select
          id="userId"
          name="userId"
          value={postData.userId}
          onChange={handleChange}
        >
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={postData.content}
          onChange={handleChange}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
