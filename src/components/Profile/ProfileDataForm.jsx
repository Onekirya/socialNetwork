import React from "react";
import { Input, createField } from "../common/FormsControls/FormsControls";
import { reduxForm } from "redux-form";
import s from "./../common/FormsControls/FormsControls.module.css"

const ProfileDataForm = ({ profile, handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button>save</button>
      </div>
      {error && <div className={s.formSumaryError}>{error}</div>}
      <div>
        <b>Full name</b> : {createField("Full name", "fullName", [], Input)}
      </div>
      <div>
        <b>looking for a jod</b> :
        {createField("", "lookingForAJob", [], Input, { type: "checkbox" })}
      </div>
      <div>
        <b>My skills</b> : {createField("My skills", "lookingForAJobDescription", [], Input)}
      </div>
      <div>
        <b>About me </b> :{createField("About me", "aboutMe", [], Input)}
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

const ProfileDataFormReduxForm = reduxForm({ form: "edit-profile" })(
  ProfileDataForm
);

export default ProfileDataFormReduxForm;
