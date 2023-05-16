import React, { FC } from "react";
import { GetStringCase, Input, Textarea, createField } from "../common/FormsControls/FormsControls";
import { InjectedFormProps, reduxForm } from "redux-form";
//@ts-ignore
import s from "./../common/FormsControls/FormsControls.module.css"
import { ProfileType } from "../../types/types";

type PropsType = {
  profile: ProfileType
}
type PropsTypeKeys = GetStringCase<PropsType>

const ProfileDataForm: FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ profile, handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button>save</button>
      </div>
      {error && <div className={s.formSumaryError}>{error}</div>}
      <div>
        <b>Full name</b> : {createField<PropsTypeKeys>("Full name", "fullName", [], Input)}
      </div>
      <div>
        <b>looking for a jod</b> :
        {createField<PropsTypeKeys>("", "lookingForAJob", [], Input, { type: "checkbox" })}
      </div>
      <div>
        <b>My skills</b> : {createField<PropsTypeKeys>("My skills", "lookingForAJobDescription", [], Textarea)}
      </div>
      <div>
        <b>About me </b> :{createField<PropsTypeKeys>("About me", "aboutMe", [], Textarea)}
      </div>
      <div>
    <b>Contacts :</b>
    {Object.keys(profile.contacts).map((key) => {
      return <div className={s.contact} key={key}>
        {key} : {createField(key, "contacts." + key, [], Input)}
      </div>
    })}
  </div>
    </form>
  );
};

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({ form: "edit-profile" })(
  ProfileDataForm
);

export default ProfileDataFormReduxForm;
