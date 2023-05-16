import React, { FC } from "react";
//@ts-ignore
import s from "./Post.module.css";

type PropsType = {
  message: string
  likesCount: number
}

const Post: FC<PropsType> = (props) => {
  return (
    <div className={s.item}>
      <img
        className={s.image}
        src="https://pravodeneg.net/wp-content/uploads/2019/03/pepsi.png"
      />
      {props.message}
      <div>like {props.likesCount}</div>
    </div>
  );
};

export default Post;
