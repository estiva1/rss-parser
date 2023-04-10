import React, { useState } from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({ create }) => {
  const [post, setPost] = useState({ creator: "", title: "", link: "" });

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = { item: { ...post } };
    create(newPost);
    console.log(newPost);
    setPost({ creator: "", title: "", link: "" });
  };

  return (
    <form>
      <MyInput
        value={post.creator}
        onChange={(e) => setPost({ ...post, creator: e.target.value })}
        type="text"
        placeholder="Author of the Post"
      />
      <MyInput
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        type="text"
        placeholder="Title"
      />
      <MyInput
        value={post.link}
        onChange={(e) => setPost({ ...post, link: e.target.value })}
        type="text"
        placeholder="Link"
      />

      <MyButton onClick={addNewPost}>Create Post</MyButton>
    </form>
  );
};

export default PostForm;
