import React from "react";
import {
  sendMessageCreator,
  updateNewMessageBodyCreator,
} from "../../redux/store";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {
  let state = props.store.getState().dialogsePage;

  let onNewMessageChange = (body) => {
    props.store.dispatch(updateNewMessageBodyCreator(body));
  };

  let onSendMessageClick = () => {
    props.store.dispatch(sendMessageCreator());
  };

  return (
    <Dialogs
      updateNewMessageBody={onNewMessageChange}
      sendMessage={onSendMessageClick}
      dialogsePage={state}
    />
  );
};

export default DialogsContainer;
