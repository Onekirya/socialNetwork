import React from "react";
import PostsContainer from "./Posts/PostsContainer";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo";

const Profile = (props) => {
  return (
    <div className={s.content}>
      <ProfileInfo />
      <PostsContainer store={props.store} />
    </div>
  );
};

export default Profile;
