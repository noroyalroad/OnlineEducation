import { AUTH_USER, LOGIN_USER } from "../_actions/types";

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
      break;

    case AUTH_USER:
      return { ...state, userData: action.payload };
      break;

    default:
      return state;
  }
}
