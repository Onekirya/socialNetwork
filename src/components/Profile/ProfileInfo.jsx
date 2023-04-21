import React, { useState } from "react";
import Preloader from "../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHook from "./ProfileStatusWithHook";
import userPhoto from "../../assets/images/userPhoto.jpg";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({
  profile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
  saveProfile,
}) => {
  let [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />;
  }
  const mainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData) => {
    saveProfile(formData).then(
      ()=>{
        setEditMode(false);
      }
    )
    
  };

  return (
    <div>
      <div className={s.description}>
        <img src={profile.photos.large || userPhoto} className={s.mainPhoto} />
        {isOwner && <input type={"file"} onChange={mainPhotoSelected} />}
        {editMode ? (
          <ProfileDataForm
            initialValues={profile}
            profile={profile}
            onSubmit={onSubmit}
          />
        ) : (
          <ProfileData
            profile={profile}
            isOwner={isOwner}
            goToEditMode={() => {
              setEditMode(true);
            }}
          />
        )}
        <ProfileStatusWithHook status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
};
const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div className={s.contact}>
      <b>{contactTitle}</b> : {contactValue}
    </div>
  );
};

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return (
    <div>
      <div>{isOwner && <button onClick={goToEditMode}>edit</button>}</div>
      <div>
        <b>Full name</b> : {profile.fullName}
      </div>
      <div>
        <b>looking for a jod</b> : {profile.lookingForAJob ? "yes" : "no"}
      </div>
      {profile.lookingForAJob && (
        <div>
          <b>My skills</b> : {profile.lookingForAJobDescription}
        </div>
      )}
      <div>
        <b>About me </b> : {profile.aboutMe}
      </div>
      <div>
        <b>Contacts :</b>
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProfileInfo;
