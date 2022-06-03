import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={s.header}>
      <img src="https://avatars.mds.yandex.net/get-zen_doc/1639101/pub_611768146eab3f04defe25d7_6117687f7e37175eb6759ed8/scale_1200" />
      <div className={s.loginBlock}>
        {props.isAuth ? props.login : <NavLink to={"/login"}> Login</NavLink>}
      </div>
    </header>
  );
};

export default Header;
