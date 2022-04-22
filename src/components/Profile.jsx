import React from "react";
import s from './Profile.module.css';

const Profile = () => {
  return (
    <div className={s.content}>
      <div>
        <img src="https://gulaytour.ru/wp-content/uploads/2017/07/x4kFg.jpg" />
      </div>
      <div>
        ava + description
        </div>
        <div>
          my post
          <div>
            new post
          </div>
          <div>
            post 1
          </div>
          <div>
            post 2
          </div>
        </div>
    </div>
  );
};

export default Profile;