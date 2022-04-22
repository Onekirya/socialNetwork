import React from "react";
import Post from "./Post/Post";
import s from './Posts.module.css';

const Posts = () => {
  return (
    <div className={s.posts}>
      <h3>My posts</h3>
      <div>
      <textarea></textarea>
      </div>
      <div>
      <button>Add post</button></div>
      <Post message='It is my post number 6'/>
      <Post message='It is my post number 5'/>
      <Post message='It is my post number 4'/>
      <Post message='It is my post number 3'/>
      <Post message='It is my post number 2'/>
      <Post message='It is my post number 1'/>
    </div>
  );
};

export default Posts;