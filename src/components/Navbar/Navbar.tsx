import React, { FC } from "react";
import { NavLink } from "react-router-dom";
//@ts-ignore
import s from "./Navbar.module.css";

const Navbar: FC = () => {
  return (
    <nav className={s.nav}>
      <div>
        <NavLink
          className={(navData) => (navData.isActive ? s.active : s.link)}
          to="/profile"
        >
          Profile
        </NavLink>
      </div>
      <div>
        <NavLink
          className={(navData) => (navData.isActive ? s.active : s.link)}
          to="/dialogs"
        >
          Messages
        </NavLink>
      </div>
      <div>
        <NavLink
          className={(navData) => (navData.isActive ? s.active : s.link)}
          to="/users"
        >
          Users
        </NavLink>
      </div>
      <div>
        <NavLink
          className={(navData) => (navData.isActive ? s.active : s.link)}
          to="/news"
        >
          News
        </NavLink>
      </div>
      <div>
        <NavLink
          className={(navData) => (navData.isActive ? s.active : s.link)}
          to="/music"
        >
          Music
        </NavLink>
      </div>
      <div>
        <NavLink
          className={(navData) => (navData.isActive ? s.active : s.link)}
          to="/settings"
        >
          Settings
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
