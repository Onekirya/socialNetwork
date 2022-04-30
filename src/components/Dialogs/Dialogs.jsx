import React from "react";
import {
  sendMessageCreator,
  updateNewMessageBodyCreator,
} from "../../redux/store";
import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";

const Dialogs = (props) => {
  let state = props.store.getState().dialogsePage;

  let dialogElements = state.dialogData.map((d) => (
    <DialogItem name={d.name} id={d.id} />
  ));
  let messageElements = state.messageData.map((m) => (
    <Message message={m.message} />
  ));
  let newMessageBody = state.newMessageBody;
  let onNewMessageChange = (e) => {
    let body = e.target.value;
    props.store.dispatch(updateNewMessageBodyCreator(body));
  };
  let onSendMessageClick = () => {
    props.store.dispatch(sendMessageCreator());
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogItems}>{dialogElements}</div>
      <div className={s.messages}>
        <div>{messageElements}</div>
        <div>
          <textarea
            value={newMessageBody}
            placeholder="Enter your message"
            onChange={onNewMessageChange}
          ></textarea>
        </div>
        <div>
          <button onClick={onSendMessageClick}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
