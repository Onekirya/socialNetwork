import { authAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";

let inicialState = {
  id: null,
  login: null,
  email: null,
  isAuth: false
};

const authReducer = (state = inicialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
        isAuth: true
      };
    default:
      return state;
  }
};

export const setAuthUserData = (id, login, email) => ({
  type: SET_USER_DATA,
  data: { id, login, email },
});

export const getAuthUserData = () => (dispatch) =>{
  authAPI.me()
      .then((response) => {
        if (response.data.resultCode === 0) {
          let {id, email, login} = response.data.data;
          dispatch(setAuthUserData(id, email, login));
        }
      });
}

export default authReducer;
