import React from "react";
import Post from "./Post/Post";
import s from "./Posts.module.css";

const Posts = (props) => {
  let postElements = props.postData.map((p) => <Post message={p.message} likesCount={p.likesCount}/>);

  let newPostElement = React.createRef();

  let addPost = () => {
    let text = newPostElement.current.value;
    props.addPost(text);
  };
  console.log(newPostElement);

  return (
    <div className={s.posts}>
      <h3>My posts</h3>
      <div>
        <textarea ref={newPostElement}></textarea>
      </div>
      <div>
        <button onClick={addPost}>Add post</button>
      </div>
      {postElements}
    </div>
  );
};

export default Posts;
