import React from "react";
import MyButton from "./UI/button/MyButton";

const PostItem = (props) => {
  return (
    <div className="post">
      <div className="post__content">
        <strong>{props.post.item.creator}</strong> -{" "}
        <span>{props.post.item.title}</span>
        <div>
          <a href={`${props.post.item.link}`}>Link</a>
        </div>
      </div>

      <div className="post__btns">
        <MyButton onClick={() => props.remove(props.post)}>Delete</MyButton>
      </div>
    </div>
  );
};

export default PostItem;
