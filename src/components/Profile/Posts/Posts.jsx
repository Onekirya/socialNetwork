import React from "react";
import Post from "./Post/Post";

const Posts = () => {
  return (
    <div>
      my posts
      <div>new post</div>
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