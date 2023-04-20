import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import img from "./2023-04-20 13.13.05.jpg"

const Header = (props) => {
  return (
    <header className={s.header}>
      <img src={img}/>
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.login} -<button onClick={props.logout}>Log out</button>
          </div>
        ) : (
          <NavLink to={"/login"}> Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
