import React from "react";
import s from './Post.module.css';
const Post = (props) => {
  return (
    <div className={s.item}>
      
      <div><img src="https://pravodeneg.net/wp-content/uploads/2019/03/pepsi.png"/>{props.message}</div>
    </div>
  );
};

export default Post;