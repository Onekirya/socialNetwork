import React, { FC } from "react";
//@ts-ignore
import styles from "./user.module.css";
//@ts-ignore
import userPhoto from "../../assets/images/userPhoto.jpg";
import { NavLink } from "react-router-dom";
import { UserType } from "../../types/types";

type PropsType = {
  user: UserType,
  followingInProgress: Array<number>, 
  unfollow: (userId:number)=>void,
  follow: (userId:number)=>void
}

const User: FC<PropsType> = ({ user, followingInProgress, unfollow, follow }) => {
  return (
    <div>
      <div key={user.id}> 
        <span>
          <div>
            <NavLink to={"/profile/" + user.id}>
              <img
                src={user.photos.small != null ? user.photos.small : userPhoto}
                className={styles.userPhoto}
              />
            </NavLink>
          </div>
          <div>
            {user.followed ? (
              <button
                disabled={followingInProgress.some((id) => id === user.id)}
                onClick={() => {
                  unfollow(user.id);
                }}
              >
                Unfollow
              </button>
            ) : (
              <button
                disabled={followingInProgress.some((id) => id === user.id)}
                onClick={() => {
                  follow(user.id);
                }}
              >
                Follow
              </button>
            )}
          </div>
        </span>
        <span>
          <span>
            <div>{user.name}</div>
            <div>{"user.status"}</div>
          </span>
          <span>
            <div>{"user.location"}</div>
          </span>
        </span>
      </div>
    </div>
  );
};

export default User;
