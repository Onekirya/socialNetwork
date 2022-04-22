import React from "react";
import Posts from "./Posts/Posts";
import s from './Profile.module.css';

const Profile = () => {
  return (
    <div className={s.content}>
      <div>
        <img className={s.image} src="https://gulaytour.ru/wp-content/uploads/2017/07/x4kFg.jpg" />
      </div>
      <div>
        ava + description
        </div>
        <div>
          <Posts />
        </div>
    </div>
  );
};

export default Profile;