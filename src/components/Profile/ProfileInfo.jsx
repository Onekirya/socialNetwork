import React from "react";
import s from "./ProfileInfo.module.css";

const ProfileInfo = () => {
  return (
    <div>
      <div>
        <img
          className={s.image}
          src="https://gulaytour.ru/wp-content/uploads/2017/07/x4kFg.jpg"
        />
      </div>
      <div className={s.description}> ava + description </div>
    </div>
  );
};

export default ProfileInfo