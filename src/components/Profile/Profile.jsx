import React from "react";
import Posts from "./Posts/Posts";
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo";

const Profile = () => {
  return (
    <div className={s.content}>
      <ProfileInfo/>
      <Posts />
      </div>
  );
};

export default Profile;