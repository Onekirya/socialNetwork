import React, { FC } from "react"
import { Field, InjectedFormProps, reduxForm } from "redux-form"
import { required } from "../../../../utils/validators/validators";
import { GetStringCase, Input, Textarea, createField } from "../../../common/FormsControls/FormsControls";

type PropsType = {
  handleSubmit: ()=>void
}
export type AddPostFormValuesType = {
  newPostText: string
}

type AddPostFormValuesTypeKeys = GetStringCase<AddPostFormValuesType>


const AddNewPostForm: FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
      {createField<AddPostFormValuesTypeKeys>("Post message", "newPostText", [required], Input)}
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

export default reduxForm<AddPostFormValuesType, PropsType>({
  form: "ProfileAddNewPostForm",
})(AddNewPostForm);