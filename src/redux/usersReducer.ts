import { Dispatch } from "redux";
import { usersAPI } from "../api/usersAPI";
import { UserType } from "../types/types";
import { updateObjectInArray } from "../utils/objectHelpers";
import { BaseThunkType, InferActionsTypes } from "./reduxStore";

let inicialState = {
  users: [] as Array<UserType>,
  pageSize: 20,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,//array of usersId
  toggleIsFetching: [] as Array<number>
};

const usersReducer = (state = inicialState, action: ActionsTypes): inicialState => {
  switch (action.type) {
    case 'FOLLOW': {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
      };
    }
    case 'UNFOLLOW': {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
      };
    }
    case 'SET_USERS': {
      return { ...state, users: action.users };
    }
    case 'SET_CURRENT_PAGE': {
      return { ...state, currentPage: action.currentPage };
    }
    case 'SET_TOTAL_USERS_COUNT': {
      return { ...state, totalUsersCount: action.count };
    }
    case 'TOGGLE_IS_FETCHINNG': {
      return { ...state, isFetching: action.isFetching };
    }
    case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
      return {
        ...state,
        toggleIsFetching: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id != action.userId),
      };
    }

    default:
      return state;
  }
};



export let actions = {
  followSuccess: (userId: number) => ({ type: 'FOLLOW', userId }as const),

  unFollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId }as const),

  setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users }as const),

  setCurrentPage: (currentPage: number) => ({
    type: 'SET_CURRENT_PAGE',
    currentPage,
  }as const),

  setTotalUsersCount: (totalUsersCount: number) => ({
    type: 'SET_TOTAL_USERS_COUNT',
    count: totalUsersCount,
  }as const),

  toggleIsFetching: (isFetching: boolean) => ({
    type: 'TOGGLE_IS_FETCHINNG',
    isFetching,
  }as const),

  toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
    type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
    isFetching,
    userId,
  }as const)
}

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => {
  return async (dispatch: DispatchType) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(currentPage));

    let data = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
  };
};

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionsTypes) => {
  dispatch(actions.toggleFollowingProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.data.resultCode == 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
  };
};

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unFollowSuccess)
  };
};

export default usersReducer

type inicialState = typeof inicialState;
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes>
type ActionsTypes = InferActionsTypes<typeof actions>