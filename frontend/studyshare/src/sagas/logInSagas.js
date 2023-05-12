import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { LOGIN_REQ, LOGOUT_REQ, SIGN_UP_REQ } from "../types/logInTypes";
import {
  logInSuccessAct,
  logInErrorAct,
  logOutSuccessAct,
  logOutErrorAct,
  signUpSuccessAct,
  signUpErrorAct,
} from "../actions/logInActions";
import { clearStoreAct } from "../actions/rootActions";
import { enqueueSnackbarAct } from "../actions/notifierActions";
import { logInReq, signUpReq, logOutReq } from "../api/logInRequests";

export function* workerLogInUser({ email, password }) {
  try {
    const user = yield call(logInReq, email, password);
    yield put(
      logInSuccessAct(user.id, user.login_token, user.firstname, user.lastname)
    );
  } catch (error) {
    yield put(logInErrorAct(error.message));
  }
}

export function* watcherLogInUser() {
  yield takeEvery(LOGIN_REQ, workerLogInUser);
}

export function* workerLogOutUser({ userId, loginToken }) {
  try {
    yield call(logOutReq, userId, loginToken);
    yield put(logOutSuccessAct());
    yield put(clearStoreAct());
  } catch (error) {
    yield put(logOutErrorAct(error.message));
  }
}

export function* watcherLogOutUser() {
  yield takeEvery(LOGOUT_REQ, workerLogOutUser);
}

export function* workerSignUpUser({ email, password, passwordConfirmation }) {
  try {
    const user = yield call(signUpReq, email, password, passwordConfirmation);
    yield put(
      signUpSuccessAct(user.id, user.login_token, user.firstname, user.lastname)
    );
  } catch (error) {
    yield put(signUpErrorAct(error.message));
    yield put(
      enqueueSnackbarAct({
        message: error.message,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "error",
        },
      })
    );
  }
}

export function* watcherSignUpUser() {
  yield takeEvery(SIGN_UP_REQ, workerSignUpUser);
}

export default function* rootSaga() {
  yield all([
    fork(watcherLogInUser),
    fork(watcherLogOutUser),
    fork(watcherSignUpUser),
  ]);
}
