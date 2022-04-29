const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND_MESSAGE";

let store = {
  _state: {
    dialogsPage: {
      dialogData: [
        { id: 1, name: "Ivan" },
        { id: 2, name: "Petr" },
        { id: 3, name: "Gleb" },
        { id: 4, name: "Semen" },
        { id: 5, name: "Sergey" },
      ],
      messageData: [
        {  id: 1, message: "Hi" },
        {  id: 2, message: "How are you?" },
        {  id: 3, message: "Russia" },
      ],
      newMessageBody: "",
    },

    profilePage: {
      postData: [
        { id: 1, message: "It is my post number 1", likesCount: 10 },
        { id: 2, message: "It is my post number 2", likesCount: 5 },
        { id: 3, message: "It is my post number 3", likesCount: 100 },
        { id: 4, message: "It is my post number 4", likesCount: 7 },
        { id: 5, message: "It is my post number 5", likesCount: 9 },
        { id: 6, message: "It is my post number 6", likesCount: 14 },
      ],
      newPostText: "Kirill",
    },
  },
  _callSubscriber() {
    console.log("State changed");
  },
  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },
  dispatch(action) {
    // { type : 'ADD-POST' }
    if (action.type === ADD_POST) {
      let newPost = {
        id: 6,
        message: this._state.profilePage.newPostText,
        likesCount: 0,
      };

      this._state.profilePage.postData.push(newPost);
      this._state.profilePage.newPostText = "";
      this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_POST_TEXT) {
      this._state.profilePage.newPostText = action.newText;
      this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
      this._state.dialogsPage.newMessageBody = action.body;
      this._callSubscriber(this._state);
    } else if (action.type===SEND_MESSAGE){
      let body = this._state.dialogsPage.newMessageBody;
      this._state.dialogsPage.newMessageBody = '';
      this._state.dialogsPage.messageData.push({id: 4, message: body});
      this._callSubscriber(this._state);
    }
  },
};

export const addPostAcrionCreator = () => {
  return {
    type: ADD_POST,
  };
};
export const updateNewPostTextActionCreator = (text) => {
  return {
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
  };
};
export const sendMessageCreator = () => ({type: SEND_MESSAGE})
export const updateNewMessageBodyCreator = (body) => ({type: UPDATE_NEW_MESSAGE_BODY, body: body})


export default store;
window.store = store;
//store - OOP
