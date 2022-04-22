import React from "react";
import s from "./Post.module.css";


const Post = (props) => {
  return (
    <div className={s.item}>
      <img
        className={s.image}
        src="https://pravodeneg.net/wp-content/uploads/2019/03/pepsi.png"
      />
      {props.message}
    </div>
  );
};

export default Post;
