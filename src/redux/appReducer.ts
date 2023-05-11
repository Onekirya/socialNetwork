import { getAuthUserData } from "./authReducer";
import { InferActionsTypes } from "./reduxStore";


export type inicialStateType = typeof inicialState

type ActioinsType = InferActionsTypes<typeof actions>

let inicialState = {
  initialized: false
};

const appReducer = (state = inicialState, action: ActioinsType): inicialStateType => {
  switch (action.type) {
    case 'INITIALIZED_SUCCSESS':
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

export const actions = {
  initializedSuccsess: () => ({
    type: 'INITIALIZED_SUCCSESS' as const
  })
}

export const initializeApp = () => (dispatch: any) => {

  let promise = dispatch(getAuthUserData());
  Promise.all([promise]).then(() => dispatch(actions.initializedSuccsess()));
};
export default appReducer;
