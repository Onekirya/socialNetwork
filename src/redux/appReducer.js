import { getAuthUserData } from "./authReducer";

const INITIALIZED_SUCCSESS = "INITIALIZED_SUCCSESS";

let inicialState = {
  initialized: false,
};

const appReducer = (state = inicialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCSESS:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

export const initializedSuccsess = () => ({
  type: INITIALIZED_SUCCSESS,
});

export const initializeApp = () => (dispatch) => {

  let promise = dispatch(getAuthUserData());
  Promise.all([promise]).then(() => dispatch(initializedSuccsess()));
};
export default appReducer;
