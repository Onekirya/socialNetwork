import { FormAction, stopSubmit } from "redux-form";
import { profileAPI } from "../api/profileAPI";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { BaseThunkType, InferActionsTypes } from "./reduxStore";

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
  status: ""
};

const profileReducer = (state = inicialState, action: ActionsType): inicialStateType => {
  switch (action.type) {
    case 'ADD_POST': {
      let newPost = {
        id: 6,
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        postData: [...state.postData, newPost],
      };
    }

    case 'SET_USER_PROFILE': {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case 'SET_STATUS': {
      return {
        ...state,
        status: action.status,
      };
    }
    case 'DELETE_POST': {
      return {
        ...state,
        postData: state.postData.filter((p) => p.id != action.postId),
      };
    }
    case 'SAVE_PHOTO_SUCCESS': {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  addPostActionCreator: (newPostText: string) => ({
    type: 'ADD_POST',
    newPostText,
  } as const),
  setUserProfile: (profile: ProfileType) => ({
    type: 'SET_USER_PROFILE',
    profile,
  }as const),
  setStatus: (status: string) => ({ type: 'SET_STATUS', status }as const),
  deletePost: (postId: number) => ({
    type: 'DELETE_POST',
    postId,
  }as const),
  savePhotoSuccess: (photos: PhotosType) => ({ type: 'SAVE_PHOTO_SUCCESS', photos }as const)
}

export const getUserProfile = (userId:number): ThunkType => async (dispatch) => {
  let data = await profileAPI.getProfile(userId);

  dispatch(actions.setUserProfile(data));
};

export const getStatus = (userId:number):ThunkType => async (dispatch) => {
  let data = await profileAPI.getStatus(userId);

  dispatch(actions.setStatus(data));
};

export const updateStatus = (status:string):ThunkType => async (dispatch) => {
  let data = await profileAPI.updateStatus(status);

  if (data.resultCode === 0) {
    dispatch(actions.setStatus(status));
  }
};

export const savePhoto = (file: File):ThunkType => async (dispatch) => {
  let data = await profileAPI.savePhoto(file);

  if (data.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(data.data.photos));
  }
};

export const saveProfile = (profile: ProfileType):ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.id
  let data = await profileAPI.saveProfile(profile);
  if (data.resultCode === 0) {
    if (userId != null) {
    dispatch(getUserProfile(userId));}
    else {
      throw new Error("userId can't be null")
    }
  } else {
    dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }));
    return Promise.reject(data.messages[0])
  }
};
export default profileReducer;

export type inicialStateType = typeof inicialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>