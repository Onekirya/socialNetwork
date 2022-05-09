const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

let inicialState = {
  postData: [
    { id: 1, message: "It is my post number 1", likesCount: 10 },
    { id: 2, message: "It is my post number 2", likesCount: 5 },
    { id: 3, message: "It is my post number 3", likesCount: 100 },
    { id: 4, message: "It is my post number 4", likesCount: 7 },
    { id: 5, message: "It is my post number 5", likesCount: 9 },
    { id: 6, message: "It is my post number 6", likesCount: 14 },
  ],
  newPostText: "It is my post number 7",
}

const profileReducer = (state = inicialState, action) => {
  switch (action.type) {
  case ADD_POST: 
  let newPost = {
    id: 6,
    message: state.newPostText,
    likesCount: 0
  }
  state.postData.push(newPost);
    state.newPostText = "";
    return state;
  case UPDATE_NEW_POST_TEXT :
    state.newPostText = action.newText;
    return state;
    default:
      return state;
  }
};

export default profileReducer;
