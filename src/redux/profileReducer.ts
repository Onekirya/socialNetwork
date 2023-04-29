import { stopSubmit } from "redux-form";
import { profileAPI, usersAPI } from "../api/api";
import { PhotosType, PostType, ProfileType } from "../types/types";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

let inicialState = {
  postData: [
    { id: 1, message: "It is my post number 1", likesCount: 10 },
    { id: 2, message: "It is my post number 2", likesCount: 5 },
    { id: 3, message: "It is my post number 3", likesCount: 100 },
    { id: 4, message: "It is my post number 4", likesCount: 7 },
    { id: 5, message: "It is my post number 5", likesCount: 9 },
    { id: 6, message: "It is my post number 6", likesCount: 14 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
  newPostText: ''
};

export type inicialStateType = typeof inicialState;

const profileReducer = (state = inicialState, action: any): inicialStateType => {
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
    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    }
    default:
      return state;
  }
};

type addPostActionCreatorActionType = {
  type: typeof ADD_POST,
  newPostText: string
}
export const addPostActionCreator = (newPostText: string): addPostActionCreatorActionType => ({
  type: ADD_POST,
  newPostText,
});

type SetUserProfileAcrionType = {
  type: typeof SET_USER_PROFILE
  profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileAcrionType => ({
  type: SET_USER_PROFILE,
  profile,
});

type SetStatusActionType = {
  type: typeof SET_STATUS
  status: string
}
export const setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status });

type DeletePostActionType = {
  type: typeof DELETE_POST
  postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({
  type: DELETE_POST,
  postId,
});

type savePhotoSuccessActionType = { type: typeof SAVE_PHOTO_SUCCESS, photos: PhotosType }
export const savePhotoSuccess = (photos: PhotosType): savePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photos });

export const getUserProfile = (userId:number) => async (dispatch:any) => {
  let response = await usersAPI.getProfile(userId);

  dispatch(setUserProfile(response.data));
};

export const getStatus = (userId:number) => async (dispatch:any) => {
  let response = await profileAPI.getStatus(userId);

  dispatch(setStatus(response.data));
};

export const updateStatus = (status:string) => async (dispatch:any) => {
  let response = await profileAPI.updateStatus(status);

  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export const savePhoto = (file:any) => async (dispatch:any) => {
  let response = await profileAPI.savePhoto(file);

  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};

export const saveProfile = (profile: ProfileType) => async (dispatch:any, getState:any) => {
  const userId = getState().auth.id
  let response = await profileAPI.saveProfile(profile);
  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId));
  } else {
    debugger
    dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }));
    return Promise.reject(response.data.messages[0])
  }
};
export default profileReducer;
