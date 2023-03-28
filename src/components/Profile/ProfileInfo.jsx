import React from "react";
import Preloader from "../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
  if (!props.profile) {
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
        <img src={props.profile.photos.large} />
        <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
      </div>
    </div>
  );
};

export default ProfileInfo;
