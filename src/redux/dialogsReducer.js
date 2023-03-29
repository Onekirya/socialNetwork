const SEND_MESSAGE = "SEND_MESSAGE";

let inicialState = {
  dialogData: [
    { id: 1, name: "Ivan" },
    { id: 2, name: "Petr" },
    { id: 3, name: "Gleb" },
    { id: 4, name: "Semen" },
    { id: 5, name: "Sergey" },
  ],
  messageData: [
    { id: 1, message: "Hi" },
    { id: 2, message: "How are you?" },
    { id: 3, message: "Russia" },
  ],
  sidebar: {},
};

const dialogsReducer = (state = inicialState, action) => {
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

export const sendMessageCreator = (newMessageBody) => ({
  type: "SEND_MESSAGE",
  newMessageBody,
});

export default dialogsReducer;
