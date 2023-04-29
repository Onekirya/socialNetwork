const SEND_MESSAGE = "SEND_MESSAGE";

type DialogType = {
  id: number,
  name: string
}

type MessageType = {
  id: number;
  message: string
}

let inicialState = {
  dialogData: [
    { id: 1, name: "Ivan" },
    { id: 2, name: "Petr" },
    { id: 3, name: "Gleb" },
    { id: 4, name: "Semen" },
    { id: 5, name: "Sergey" },
  ] as Array<DialogType>,
  messageData: [
    { id: 1, message: "Hi" },
    { id: 2, message: "How are you?" },
    { id: 3, message: "Russia" },
  ] as Array<MessageType>
};

export type inicialStateType = typeof inicialState;

const dialogsReducer = (state = inicialState, action:any):inicialStateType => {
  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.newMessageBody;
      return {
        ...state,
        messageData: [...state.messageData, { id: 4, message: body }],
      };
    default:
      return state;
  }
};

type sendMessageCreatorActionType = {
  type: typeof SEND_MESSAGE
  newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string):sendMessageCreatorActionType => ({
  type: "SEND_MESSAGE",
  newMessageBody,
});

export default dialogsReducer;
