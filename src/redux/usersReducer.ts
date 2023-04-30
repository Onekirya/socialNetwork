import { Dispatch } from "redux";
import { usersAPI } from "../api/api";
import { UserType } from "../types/types";
import { updateObjectInArray } from "../utils/objectHelpers";
import { AppStateType } from "./reduxStore";
import { ThunkAction } from "redux-thunk";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHINNG = "TOGGLE_IS_FETCHINNG";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";



let inicialState = {
  users: [] as Array<UserType>,
  pageSize: 20,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,//array of usersId
  toggleIsFetching: [] as Array<number>
};

type inicialState = typeof inicialState;

const usersReducer = (state = inicialState, action: ActionsTypes): inicialState => {
  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
      };
    }
    case UNFOLLOW: {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
      };
    }
    case SET_USERS: {
      return { ...state, users: action.users };
    }
    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage };
    }
    case SET_TOTAL_USERS_COUNT: {
      return { ...state, totalUsersCount: action.count };
    }
    case TOGGLE_IS_FETCHINNG: {
      return { ...state, isFetching: action.isFetching };
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
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

type ActionsTypes = followSuccessActionType | unFollowSuccessActionType |
  setUsersActionType | setCurrentPageActionType |
  setTotalUsersCountActionType | toggleIsFetchingActionType | toggleFollowingProgressActionType

type followSuccessActionType = {
  type: typeof FOLLOW, userId: number
}
export const followSuccess = (userId: number): followSuccessActionType => ({ type: FOLLOW, userId });

type unFollowSuccessActionType = {
  type: typeof UNFOLLOW, userId: number
}
export const unFollowSuccess = (userId: number): unFollowSuccessActionType => ({ type: UNFOLLOW, userId });

type setUsersActionType = {
  type: typeof SET_USERS, users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): setUsersActionType => ({ type: SET_USERS, users });

type setCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE, currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageActionType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

type setTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT, count: number
}
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountActionType => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalUsersCount,
});

type toggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHINNG, isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingActionType => ({
  type: TOGGLE_IS_FETCHINNG,
  isFetching,
});

type toggleFollowingProgressActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS, isFetching: boolean, userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): toggleFollowingProgressActionType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => {
  return async (dispatch: DispatchType, getState: GetStateType) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));

    let data = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  };
};

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => followSuccessActionType | unFollowSuccessActionType) => {
  dispatch(toggleFollowingProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.data.resultCode == 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
  };
};

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unFollowSuccess)
  };
};

export default usersReducer
