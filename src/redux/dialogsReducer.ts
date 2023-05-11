import { InferActionsTypes } from "./reduxStore";

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


const dialogsReducer = (state = inicialState, action: ActionsType): inicialStateType => {
  switch (action.type) {
    case 'SEND_MESSAGE':
      let body = action.newMessageBody;
      return {
        ...state,
        messageData: [...state.messageData, { id: 4, message: body }],
      };
    default:
      return state;
  }
};

export const actions = {
  sendMessageCreator: (newMessageBody: string) => ({
    type: "SEND_MESSAGE",
    newMessageBody,
  } as const)
}



export default dialogsReducer;

export type inicialStateType = typeof inicialState;
type ActionsType = InferActionsTypes<typeof actions>