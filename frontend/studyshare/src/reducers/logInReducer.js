import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_REQ,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_REQ,
  SET_IS_LOGGED_IN,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_UP_REQ,
} from "../types/logInTypes";

const INITIAL_STATE = {
  isLoggedIn: false,
  isLoggingIn: false,
  isSigningUp: false,
  isSignedUp: false,
  userId: null,
  loginToken: null,
  firstName: null,
  lastName: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQ:
      return {
        ...state,
        isLoggingIn: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        userId: action.userId,
        loginToken: action.loginToken,
        firstName: action.firstName,
        lastName: action.lastName,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        error: action.error,
      };

    case LOGOUT_REQ:
      return {
        ...state,
        isLoggingOut: true,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
      };

    case LOGOUT_ERROR:
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: true,
        error: action.error,
      };

    case SIGN_UP_REQ:
      return {
        ...state,
        isSigningUp: true,
      };

    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isSigningUp: false,
        isSignedUp: true,
        isLoggedIn: true,
        userId: action.userId,
        loginToken: action.loginToken,
        firstName: action.firstName,
        lastName: action.lastName,
      };

    case SIGN_UP_ERROR:
      return {
        ...state,
        isSigningUp: false,
        isSignedUp: false,
        error: action.error,
      };

    case SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };

    default:
      return state;
  }
};

export default reducer;
