import React from "react";
import Post from "./Post/Post";
import s from "./Posts.module.css";

const Posts = (props) => {
  let postElements = props.postData.map((p) => (
    <Post message={p.message} likesCount={p.likesCount} key={p.id}/>
  ));

  let newPostElement = React.createRef();

  let onAddPost = () => {
    props.addPost();
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text);
  };

  return (
    <div className={s.posts}>
      <h3>My posts</h3>
      <div>
        <textarea
          onChange={onPostChange}
          ref={newPostElement}
          value={props.newPostText}
        />
      </div>
      <div>
        <button onClick={onAddPost}>Add post</button>
      </div>
      {postElements}
    </div>
  );
};

export default Posts;
