import React, { FC } from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { Textarea, createField } from "../common/FormsControls/FormsControls";
import { NewMassageFormValuesType } from "./Dialogs";

let maxlength100 = maxLengthCreator(100);

type NewMassageFormValuesKeysType = Extract <keyof NewMassageFormValuesType, string>
type PropsType ={}
const AddMessageForm: FC<InjectedFormProps<NewMassageFormValuesType, PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField <
          NewMassageFormValuesKeysType >
          ("Enter your message",
          "newMessageBody",
          [required, maxlength100],
          Textarea)}
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  );
}; 

export default reduxForm<NewMassageFormValuesType>({
  form: "dialogAddMessageForm",
})(AddMessageForm);;
