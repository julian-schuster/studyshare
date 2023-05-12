import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SET_IS_LOGGED_IN,
  LOGIN_REQ,
  SIGN_UP_REQ,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  LOGOUT_REQ,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from "../types/logInTypes";

export const logInReqAct = (email, password) => {
  return {
    type: LOGIN_REQ,
    email,
    password,
  };
};

export const logInSuccessAct = (userId, loginToken, firstName, lastName) => {
  return {
    type: LOGIN_SUCCESS,
    userId,
    loginToken,
    firstName,
    lastName,
  };
};

export const logInErrorAct = (error) => {
  return {
    type: LOGIN_ERROR,
    error,
  };
};

export const logOutReqAct = (userId, loginToken) => {
  return {
    type: LOGOUT_REQ,
    userId,
    loginToken,
  };
};

export const logOutSuccessAct = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const logOutErrorAct = (error) => {
  return {
    type: LOGOUT_ERROR,
    error,
  };
};

export const signUpReq = (email, password, passwordConfirmation) => {
  return {
    type: SIGN_UP_REQ,
    email,
    password,
    passwordConfirmation,
  };
};

export const signUpSuccessAct = (userId, loginToken, firstName, lastName) => {
  return {
    type: SIGN_UP_SUCCESS,
    userId,
    loginToken,
    firstName,
    lastName,
  };
};

export const signUpErrorAct = (error) => {
  return {
    type: SIGN_UP_ERROR,
    error,
  };
};

export const setIsLoggedIn = (isLoggedIn) => {
  return {
    type: SET_IS_LOGGED_IN,
    isLoggedIn,
  };
};
