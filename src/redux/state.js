let state = {
  dialogsPage: {
    dialogData: [
      { id: 1, name: "Ivan" },
      { id: 2, name: "Petr" },
      { id: 3, name: "Gleb" },
      { id: 4, name: "Semen" },
      { id: 5, name: "Sergey" },
    ],
    messageData: [
      { message: "Hi" },
      { message: "How are you?" },
      { message: "Russia" },
    ],
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
  },
};

export let addPost = (postMessage) => {

  let newPost = {
    id: 5,
    message: postMessage,
    likesCount: 0,
  };

  state.profilePage.postData.push(newPost);
};

export default state;
