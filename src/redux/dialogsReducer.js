const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
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
  newMessageBody: "",
  sidebar: {},
}

const dialogsReducer = (state = inicialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      state.newMessageBody = action.body;
      return state;
    case SEND_MESSAGE:
      let body = state.newMessageBody;
      state.newMessageBody = "";
      state.messageData.push({ id: 4, message: body });
      return state;
    default:
      return state;
  }
};

export default dialogsReducer;
