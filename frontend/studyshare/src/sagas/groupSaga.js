import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import {
  SHOW_GROUPS_REQ,
  SHOW_AVAILABLE_GROUPS_REQ,
  CREATE_GROUP_REQ,
  SET_GROUP_LIST_PAGE,
  JOIN_GROUP_REQ,
  SET_AVAILABLE_GROUPS_DIALOG_PAGE,
  DELETE_GROUP_REQ,
  LEAVE_GROUP_REQ,
  SEARCH_USER_REQ,
  SET_AVAILABLE_USERS_DIALOG_PAGE,
  INVITE_USER_REQ,
} from "../types/groupTypes";
import {
  showGroupsReqAct,
  showGroupsSuccessAct,
  showGroupsErrorAct,
  showAvailableGroupsSuccessAct,
  showAvailableGroupsErrorAct,
  createGroupSuccessAct,
  createGroupErrorAct,
  joinGroupSuccessAct,
  joinGroupErrorAct,
  showAvailableGroupsReqAct,
  deleteGroupSuccessAct,
  deleteGroupErrorAct,
  leaveGroupSuccessAct,
  leaveGroupErrorAct,
  searchUserReqAct,
  searchUserSuccessAct,
  searchUserErrorAct,
  inviteUserSuccessAct,
  inviteUserErrorAct,
} from "../actions/groupActions";
import {
  createGroupReq,
  showGroupsReq,
  showAvailableGroupsReq,
  joinGroupReq,
  deleteGroupReq,
  leaveGroupReq,
  searchUserReq,
  inviteUserReq,
} from "../api/groupRequests";
import { notificationReqAct } from "../actions/notificationActions";

import { enqueueSnackbarAct } from "../actions/notifierActions";

export function* workerShowGroups({ userId, loginToken, page }) {
  try {
    let res = yield call(showGroupsReq, userId, loginToken, page);
    const totalPages = res.data[res.data.length - 1].pages;
    const groups = res.data.slice(0, res.data.length - 1);
    yield put(showGroupsSuccessAct(groups, totalPages));
    yield put(
      enqueueSnackbarAct({
        message: groups.length + " groups loaded.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "info",
        },
      })
    );
  } catch (error) {
    yield put(showGroupsErrorAct(error.message));
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

export function* watcherShowGroups() {
  yield takeEvery(SHOW_GROUPS_REQ, workerShowGroups);
}

export function* workerShowAvailableGroups({ userId, loginToken, page }) {
  try {
    let res = yield call(showAvailableGroupsReq, userId, loginToken, page);
    const totalPages = res.data[res.data.length - 1].pages;
    const groups = res.data.slice(0, res.data.length - 1);
    yield put(showAvailableGroupsSuccessAct(groups, totalPages));
    yield put(
      enqueueSnackbarAct({
        message: groups.length + " available groups loaded.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "info",
        },
      })
    );
  } catch (error) {
    yield put(showAvailableGroupsErrorAct(error.message));
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

export function* watcherShowAvailableGroups() {
  yield takeEvery(SHOW_AVAILABLE_GROUPS_REQ, workerShowAvailableGroups);
}

export function* workerJoinGroup({ userId, loginToken, groupId }) {
  try {
    yield call(joinGroupReq, userId, loginToken, groupId);
    yield put(joinGroupSuccessAct());
    yield put(showAvailableGroupsReqAct(userId, loginToken, 1));
    yield put(showGroupsReqAct(userId, loginToken, 1));
    yield put(
      enqueueSnackbarAct({
        message: "Joined group successfully.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "success",
        },
      })
    );
    yield put(notificationReqAct(userId, loginToken));
  } catch (error) {
    yield put(joinGroupErrorAct(error.message));
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

export function* watcherJoinGroup() {
  yield takeEvery(JOIN_GROUP_REQ, workerJoinGroup);
}

export function* workerCreateGroup({
  userId,
  loginToken,
  title,
  description,
  fileCountLimit,
  fileSizeLimit,
  isPublic,
}) {
  try {
    yield call(
      createGroupReq,
      userId,
      loginToken,
      title,
      description,
      fileCountLimit,
      fileSizeLimit,
      isPublic
    );

    yield put(createGroupSuccessAct());
    yield put(
      enqueueSnackbarAct({
        message: "Created new group.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "success",
        },
      })
    );
    yield put(showGroupsReqAct(userId, loginToken, 1));
  } catch (error) {
    yield put(createGroupErrorAct(error.message));
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

export function* watcherCreateGroup() {
  yield takeEvery(CREATE_GROUP_REQ, workerCreateGroup);
}

export function* workerSetPage({ userId, loginToken, page }) {
  yield put(showGroupsReqAct(userId, loginToken, page));
}

export function* watcherSetPage() {
  yield takeEvery(SET_GROUP_LIST_PAGE, workerSetPage);
}

export function* workerSetDialogPage({ userId, loginToken, page }) {
  yield put(showAvailableGroupsReqAct(userId, loginToken, page));
}

export function* watcherSetDialogPage() {
  yield takeEvery(SET_AVAILABLE_GROUPS_DIALOG_PAGE, workerSetDialogPage);
}

export function* workerDeleteGroup({ userId, loginToken, groupId }) {
  try {
    yield call(deleteGroupReq, userId, loginToken, groupId);

    yield put(deleteGroupSuccessAct());
    yield put(
      enqueueSnackbarAct({
        message: "Deleted group successfully.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "success",
        },
      })
    );
    yield put(showGroupsReqAct(userId, loginToken, 1));
  } catch (error) {
    yield put(deleteGroupErrorAct(error.message));
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

export function* watcherDeleteGroup() {
  yield takeEvery(DELETE_GROUP_REQ, workerDeleteGroup);
}

export function* workerLeaveGroup({ userId, loginToken, groupId }) {
  try {
    yield call(leaveGroupReq, userId, loginToken, groupId);

    yield put(leaveGroupSuccessAct());
    yield put(
      enqueueSnackbarAct({
        message: "Left group successfully.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "success",
        },
      })
    );
    yield put(showGroupsReqAct(userId, loginToken, 1));
  } catch (error) {
    yield put(leaveGroupErrorAct(error.message));
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

export function* watcherLeaveGroup() {
  yield takeEvery(LEAVE_GROUP_REQ, workerLeaveGroup);
}

export function* workerSearchUser({ userId, loginToken, searchTerm, page }) {
  try {
    const res = yield call(searchUserReq, userId, loginToken, searchTerm, page);
    const totalPages = res.data[res.data.length - 1].pages;
    const users = res.data.slice(0, res.data.length - 1);
    yield put(searchUserSuccessAct(users, totalPages));
    yield put(
      enqueueSnackbarAct({
        message: `Found ${users.length} users.`,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "success",
        },
      })
    );
  } catch (error) {
    yield put(searchUserErrorAct(error.message));
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

export function* watcherSearchUser() {
  yield takeEvery(SEARCH_USER_REQ, workerSearchUser);
}

export function* workerSetAvailableUsersDialogPage({
  userId,
  loginToken,
  searchTerm,
  page,
}) {
  yield put(searchUserReqAct(userId, loginToken, searchTerm, page));
}

export function* watcherSetAvailableUsersDialogPage() {
  yield takeEvery(
    SET_AVAILABLE_USERS_DIALOG_PAGE,
    workerSetAvailableUsersDialogPage
  );
}

export function* workerInviteUser({ userId, loginToken, receiverId, groupId }) {
  try {
    yield call(inviteUserReq, userId, loginToken, receiverId, groupId);
    yield put(inviteUserSuccessAct());
    yield put(
      enqueueSnackbarAct({
        message: `Invitation sent.`,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "success",
        },
      })
    );
  } catch (error) {
    yield put(inviteUserErrorAct(error.message));
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

export function* watcherInviteUser() {
  yield takeEvery(INVITE_USER_REQ, workerInviteUser);
}

export default function* rootSaga() {
  yield all([
    fork(watcherShowGroups),
    fork(watcherShowAvailableGroups),
    fork(watcherCreateGroup),
    fork(watcherSetPage),
    fork(watcherJoinGroup),
    fork(watcherSetDialogPage),
    fork(watcherDeleteGroup),
    fork(watcherLeaveGroup),
    fork(watcherSearchUser),
    fork(watcherSetAvailableUsersDialogPage),
    fork(watcherInviteUser),
  ]);
}
