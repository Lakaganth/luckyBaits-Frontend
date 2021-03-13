import { SIGNIN_USER, SIGNOUT_USER } from "../actions/AuthActions";

const initialState = {
  user: "",
  token: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_USER:
      return { ...state, user: action.payload.user, token: localStorage.token };
    case SIGNOUT_USER:
      return { ...state, user: "", token: localStorage.token };
    default:
      return state;
  }
};

export default authReducer;
