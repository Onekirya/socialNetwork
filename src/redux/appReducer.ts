import { getAuthUserData } from "./authReducer";

const INITIALIZED_SUCCSESS = "INITIALIZED_SUCCSESS";

export type inicialStateType = {
  initialized: boolean
}

let inicialState: inicialStateType = {
  initialized: false
};

const appReducer = (state = inicialState, action: any): inicialStateType => {
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

type initializedSuccsessActionType = {
  type: typeof INITIALIZED_SUCCSESS
}

export const initializedSuccsess = (): initializedSuccsessActionType => ({
  type: INITIALIZED_SUCCSESS,
});

export const initializeApp = () => (dispatch: any) => {

  let promise = dispatch(getAuthUserData());
  Promise.all([promise]).then(() => dispatch(initializedSuccsess()));
};
export default appReducer;
