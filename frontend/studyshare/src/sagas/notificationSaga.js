import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import {
  NOTIFICATIONS_REQ,
  UPDATE_NOTIFICATION_REQ,
  DECLINE_NOTIFICATION_REQ,
} from "../types/notificationTypes";
import {
  notificationReqAct,
  notificationSuccessAct,
  notificationErrorAct,
  updateNotificationSuccessAct,
  updateNotificationErrorAct,
  declineNotificationSuccessAct,
  declineNotificationErrorAct,
} from "../actions/notificationActions";
import {
  getNotificationsReq,
  updateNotificationReq,
  declineNotificationReq,
} from "../api/notificationRequests";

import { enqueueSnackbarAct } from "../actions/notifierActions";

export function* workerGetNotifications({ userId, loginToken }) {
  try {
    let notifications = yield call(getNotificationsReq, userId, loginToken);
    notifications = notifications.data;
    yield put(notificationSuccessAct(notifications));
  } catch (error) {
    yield put(notificationErrorAct(error.message));
  }
}

export function* watcherGetNotifications() {
  yield takeEvery(NOTIFICATIONS_REQ, workerGetNotifications);
}

export function* workerUpdateNotification({
  userId,
  loginToken,
  notificationId,
}) {
  try {
    yield call(updateNotificationReq, userId, loginToken, notificationId);
    yield put(updateNotificationSuccessAct());
    yield put(notificationReqAct(userId, loginToken));
    yield put(
      enqueueSnackbarAct({
        message: "Notification dismissed.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "info",
        },
      })
    );
  } catch (error) {
    yield put(updateNotificationErrorAct(error.message));
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

export function* watcherUpdateNotification() {
  yield takeEvery(UPDATE_NOTIFICATION_REQ, workerUpdateNotification);
}

export function* workerdeclineNotification({
  userId,
  loginToken,
  notificationId,
}) {
  try {
    yield call(declineNotificationReq, userId, loginToken, notificationId);
    yield put(declineNotificationSuccessAct());
    yield put(
      enqueueSnackbarAct({
        message: "Invite declined.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "info",
        },
      })
    );
    yield put(notificationReqAct(userId, loginToken));
  } catch (error) {
    yield put(declineNotificationErrorAct(error.message));
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

export function* watcherdeclineNotification() {
  yield takeEvery(DECLINE_NOTIFICATION_REQ, workerdeclineNotification);
}

export default function* rootSaga() {
  yield all([
    fork(watcherGetNotifications),
    fork(watcherUpdateNotification),
    fork(watcherdeclineNotification),
  ]);
}
