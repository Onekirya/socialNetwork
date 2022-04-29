import React from "react";
import { addPostAcrionCreator, updateNewPostTextActionCreator } from "../../../redux/state";
import Post from "./Post/Post";
import s from "./Posts.module.css";



const Posts = (props) => {
  let postElements = props.postData.map((p) => <Post message={p.message} likesCount={p.likesCount}/>);

  let newPostElement = React.createRef();

  let addPost = () => {
    props.dispatch(addPostAcrionCreator());
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.dispatch(updateNewPostTextActionCreator(text));
  }

  return (
    <div className={s.posts}>
      <h3>My posts</h3>
      <div>
        <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
      </div>
      <div>
        <button onClick={addPost}>Add post</button>
      </div>
      {postElements}
    </div>
  );
};

export default Posts;
