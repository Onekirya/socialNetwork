import React from "react";
import {
  addPostAcrionCreator,
  updateNewPostTextActionCreator,
} from "../../../redux/store";
import Posts from "./Posts";

const PostsContainer = (props) => {
  let state = props.store.getState();

  let addPost = () => {
    props.store.dispatch(addPostAcrionCreator());
  };

  let onPostChange = (text) => {
    let action = updateNewPostTextActionCreator(text);
    props.store.dispatch(action);
  };

  return (
    <Posts
      updateNewPostText={onPostChange}
      addPost={addPost}
      postData={state.profilePage.postData}
      newPostText={state.profilePage.newPostText}
    />
  );
};

export default PostsContainer;
