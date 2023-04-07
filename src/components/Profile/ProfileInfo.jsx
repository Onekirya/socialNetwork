import React from "react";
import Preloader from "../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHook from "./ProfileStatusWithHook";

const ProfileInfo = ({profile, status, updateStatus}) => {

  if (!profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div>
        {/* <img
          className={s.image}
          src="https://gulaytour.ru/wp-content/uploads/2017/07/x4kFg.jpg"
        /> */}
      </div>
      <div className={s.description}>
        <img src={profile.photos.large} />
        <ProfileStatusWithHook
          status={status}
          updateStatus={updateStatus}
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
