import React from "react";
import Post from "./Post/Post";
import s from "./Posts.module.css";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";

const Posts = React.memo(props => {
  let postElements = props.postData.map((p) => (
    <Post message={p.message} likesCount={p.likesCount} key={p.id} />
  ));

  let onAddPost = (values) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className={s.posts}>
      <h3>My posts</h3>
      <AddNewPostFormRedux onSubmit={onAddPost}/>
      <div>{postElements}</div>
    </div>
  );
});

const maxLenght10 = maxLengthCreator(10)

const addNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name="newPostText" component={Textarea} validate={[required, maxLenght10]} placeholder='Post message'/>
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const AddNewPostFormRedux = reduxForm({
  form: "ProfileAddNewPostForm",
})(addNewPostForm);

export default Posts;
