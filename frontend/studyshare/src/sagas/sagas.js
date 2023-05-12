import { all } from "redux-saga/effects";
import logInSagas from "./logInSagas";
import groupSaga from "./groupSaga";
import inventorySaga from "./inventorySaga";
import notificationSaga from "./notificationSaga";
import groupDetailSaga from "./groupDetailSaga";
export default function* rootSaga() {
  yield all([
    logInSagas(),
    groupSaga(),
    inventorySaga(),
    notificationSaga(),
    groupDetailSaga(),
  ]);
}
