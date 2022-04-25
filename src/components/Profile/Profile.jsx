import React from "react";
import Posts from "./Posts/Posts";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo";

const Profile = (props) => {
  return (
    <div className={s.content}>
      <ProfileInfo />
      <Posts
        postData={props.profilePage.postData}
        mewPostText={props.profilePage.newPostText}
        addPost={props.addPost}
        updateNewPostText = {props.updateNewPostText}
      />
    </div>
  );
};

export default Profile;
