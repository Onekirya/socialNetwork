import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";

let inicialState = {
  postData: [
    { id: 1, message: "It is my post number 1", likesCount: 10 },
    { id: 2, message: "It is my post number 2", likesCount: 5 },
    { id: 3, message: "It is my post number 3", likesCount: 100 },
    { id: 4, message: "It is my post number 4", likesCount: 7 },
    { id: 5, message: "It is my post number 5", likesCount: 9 },
    { id: 6, message: "It is my post number 6", likesCount: 14 },
  ],
  profile: null,
  status: "",
};

const profileReducer = (state = inicialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 6,
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        newPostText: "",
        postData: [...state.postData, newPost],
      };
    }

    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        postData: state.postData.filter((p) => p.id != action.postId),
      };
    }
    default:
      return state;
  }
};

export const addPostActionCreator = (newPostText) => ({
  type: ADD_POST,
  newPostText,
});

export const deletePost = (postId) => ({
  type: DELETE_POST,
  postId,
});

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});
export const setStatus = (status) => ({ type: SET_STATUS, status });

export const getUserProfile = (userId) => (dispatch) => {
  usersAPI.getProfile(userId).then((response) => {
    dispatch(setUserProfile(response.data));
  });
};

export const getStatus = (userId) => (dispatch) => {
  profileAPI.getStatus(userId).then((response) => {
    dispatch(setStatus(response.data));
  });
};

export const updateStatus = (status) => (dispatch) => {
  profileAPI.updateStatus(status).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  });
};
export default profileReducer;
