import React, { FC } from "react";
import { NavLink } from "react-router-dom";
//@ts-ignore
import s from "./Header.module.css";
//@ts-ignore
import img from "./2023-04-20 13.13.05.jpg"

export type MapPropsType = {
  isAuth: boolean
  login: string | null
}
export type DispatchPropsType = {
  logout: ()=> void
}
const Header: FC<MapPropsType & DispatchPropsType> = (props) => {
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
