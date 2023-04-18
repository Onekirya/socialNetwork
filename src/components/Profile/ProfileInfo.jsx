import React from "react";
import Preloader from "../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHook from "./ProfileStatusWithHook";
import userPhoto from "../../assets/images/userPhoto.jpg";

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto }) => {
  if (!profile) {
    return <Preloader />;
  }
  const mainPhotoSelected = (e) => {
    if(e.target.files.length){
      savePhoto(e.target.files[0])
    }
  };
  debugger;
  return (
    <div>
      <div>
        {/* <img
          className={s.image}
          src="https://gulaytour.ru/wp-content/uploads/2017/07/x4kFg.jpg"
        /> */}
      </div>
      <div className={s.description}>
        <img src={profile.photos.large || userPhoto} className={s.mainPhoto} />
        {isOwner && <input type={"file"} onChange={mainPhotoSelected} />}
        <ProfileStatusWithHook status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
};

export default ProfileInfo;
