import React, { FC } from "react";
import Post from "./Post/Post";
//@ts-ignore
import s from "./Posts.module.css";
import AddNewPostFormRedux, {
  AddPostFormValuesType,
} from "./AddPostForm/AddPostForm";
import { PostType } from "../../../types/types";

export type MapPropsType = {
  postData: Array<PostType>;
};

export type DispatchPropsType = {
  postData: Array<PostType>;
  addPost: (newPostText: string) => void;
};

const Posts: FC<MapPropsType & DispatchPropsType> = (props) => {
  let postElements = props.postData.map((p) => (
    <Post message={p.message} likesCount={p.likesCount} key={p.id} />
  ));

  let onAddPost = (values: AddPostFormValuesType) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className={s.posts}>
      <h3>My posts</h3>
      <AddNewPostFormRedux onSubmit={onAddPost} />
      <div>{postElements}</div>
    </div>
  );
};

const PostsMemo = React.memo(Posts);

export default PostsMemo;
