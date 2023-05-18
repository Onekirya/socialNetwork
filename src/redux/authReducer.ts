import { FormAction, stopSubmit } from "redux-form";
import { ResultCodeForCaptchaEnum, ResultCodesEnum } from "../api/api";
import { authAPI } from "../api/authAPI";
import { securityAPI } from "../api/securityAPI";
import { BaseThunkType, InferActionsTypes } from "./reduxStore";
import { Action, AnyAction } from "redux";

export type inicialStateType2 = {
  id: number | null,
  login: string | null,
  email: string | null,
  isAuth: boolean,
  captchaUrl: string | null
};

let inicialState = {
  id: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null
};


const authReducer = (state = inicialState, action: ActioinsType): inicialStateType => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        ...action.payload,
        isAuth: true,
      };
    case 'GET_CAPTCHA_URL_SUCCESS':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

const actions = {
  setAuthUserData: (id: number | null, login: string | null, email: string | null, isAuth: boolean) => ({
    type: 'SET_USER_DATA',
    payload: { id, login, email, isAuth },
  } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) => ({
    type: 'GET_CAPTCHA_URL_SUCCESS',
    payload: { captchaUrl },
  } as const)
}

export const getAuthUserData = ():ThunkType => async (dispatch) => {
  let meData = await authAPI.me();
  if (meData.resultCode === ResultCodesEnum.Success) {
    let { id, email, login } = meData.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: any):ThunkType => async (dispatch) => {
  let data = await authAPI.login(email, password, rememberMe, captcha);
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  } else {
    if (data.resultCode === ResultCodeForCaptchaEnum.captchaIsRequired) {
      dispatch(getCaptchaUrl())
    }
    let message =
      data.messages.length > 0
        ? data.messages[0]
        : "Some error";
    dispatch(stopSubmit("login", { _error: message }));
  }
};

export const getCaptchaUrl = ():ThunkType => async (dispatch) => {
  let data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
}

export const logout = (): ThunkType => async (dispatch: any) => {
  let response = await authAPI.logout();

  if (response.data.resultCode === 0) {
    dispatch(getAuthUserData());
  }
};
export default authReducer;


export type inicialStateType = typeof inicialState;
type ActioinsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActioinsType | FormAction >