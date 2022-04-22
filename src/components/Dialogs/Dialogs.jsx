import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Dialogs.module.css";

const DialogItem = (props) => {

  let path = "/dialogs/" + props.id;

  return (
    <div className={s.dialog + " " + s.active}>
      <NavLink to={path}> {props.name}</NavLink>
    </div>
  );
};

const Message = (props) =>{
  return <div className={s.message}>{props.message}</div>
}

const Dialogs = () => {
  return (
    <div className={s.dialogs}>
      <div className={s.dialogItems}>
        <DialogItem name="Ivan" id="1" />
        <DialogItem name="Petr" id="2" />
        <DialogItem name="Gleb" id="3" />
        <DialogItem name="Semen" id="4" />
        <DialogItem name="Sergey" id="5" />
      </div>
      <div className={s.messages}>
        <Message message='Hi'/>
        <Message message='How are you?'/>
        <Message message='Russia'/>
      </div>
    </div>
  );
};

export default Dialogs;
