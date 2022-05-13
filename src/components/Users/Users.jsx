import axios from "axios";
import React from "react";
import styles from "./user.module.css";
import userPhoto from "../../assets/images/userPhoto.jpg";

const Users = (props) => {
  let getUsers = () =>{
    if (props.users.length === 0) {
      axios
        .get("https://social-network.samuraijs.com/api/1.0/users")
        .then((response) => {
          props.setUsers(response.data.items);
        });
    }
  }

  return (
    <div>
      <button onClick={getUsers}>getUsers</button>
      {props.users.map((u) => (
        <div key={u.id}>
          <span>
            <div>
              <img
                src={u.photos.small != null ? u.photos.smal : userPhoto}
                className={styles.userPhoto}
              />
            </div>
            <div>
              {u.followed ? (
                <button
                  onClick={() => {
                    props.unfollow(u.id);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    props.follow(u.id);
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{u.name}</div>
              <div>{"u.status"}</div>
            </span>
            <span>
              <div>{"u.location"}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Users;
