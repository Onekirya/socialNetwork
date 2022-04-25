import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";

const Dialogs = (props) => {
  let dialogElements = props.dialogData.map(d=><DialogItem name={d.name} id={d.id} />);
  let messageElements = props.messageData.map(m=><Message message={m.message} />)
  return (
    <div className={s.dialogs}>
      <div className={s.dialogItems}>
        {dialogElements}
      </div>
      <div className={s.messages}>
        {messageElements}
      </div>
    </div>
  );
};

export default Dialogs;
