import React, { FC } from "react";
import AddMessageFormRedux from "./AddMessageForm";
import DialogItem from "./DialogItem/DialogItem";
//@ts-ignore
import s from "./Dialogs.module.css";
import Message from "./Message/Message";
import {inicialStateType} from './../../redux/dialogsReducer'


type OwnPropsType = {
  dialogsePage: inicialStateType
  sendMessage: (messageText:string) => void
}

export type NewMassageFormValuesType = {
  newMessageBody: string
}

const Dialogs: FC<OwnPropsType> = (props) => {
  let state = props.dialogsePage;

  let dialogElements = state.dialogData.map((d) => (
    <DialogItem name={d.name} id={d.id} key={d.id} />
  ));
  let messageElements = state.messageData.map((m) => (
    <Message message={m.message} key={m.id} />
  ));

  let addNewMessage = (values: NewMassageFormValuesType) => {
    props.sendMessage(values.newMessageBody);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogItems}>{dialogElements}</div>
      <div className={s.messages}>
        <div>{messageElements}</div>
      </div>
      <AddMessageFormRedux onSubmit={addNewMessage} />
    </div>
  );
};

export default Dialogs;
