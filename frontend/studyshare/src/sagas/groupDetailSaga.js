import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import {
  GET_GROUP_DETAILS_REQ,
  GET_GROUP_FILES_REQ,
  PUBLISH_FILE_TO_GROUP_REQ,
  DELETE_FILE_FROM_GROUP_REQ,
  DOWNLOAD_FILE_FROM_GROUP_REQ,
} from "../types/groupDetailTypes";
import {
  getGroupDetailsReqAct,
  getGroupDetailsSuccessAct,
  getGroupDetailsErrorAct,
  getGroupFilesReqAct,
  getGroupFilesSuccessAct,
  getGroupFilesErrorAct,
  publishFileToGroupSuccessAct,
  publishFileToGroupErrorAct,
  deleteFileFromGroupSuccessAct,
  deleteFileFromGroupErrorAct,
  downloadFileFromGroupSuccessAct,
  downloadFileFromGroupErrorAct,
} from "../actions/groupDetailActions";
import {
  getGroupDetailsReq,
  getGroupFilesReq,
  publishFileToGroupReq,
  deleteFileFromGroupReq,
  downloadFileFromGroupReq,
} from "../api/groupDetailRequests";

import { enqueueSnackbarAct } from "../actions/notifierActions";

export function* workerGetGroupDetails({ userId, loginToken, groupId }) {
  try {
    let groupDetails = yield call(
      getGroupDetailsReq,
      userId,
      loginToken,
      groupId
    );

    yield put(getGroupDetailsSuccessAct(groupDetails));
    yield put(
      enqueueSnackbarAct({
        message: "Group details loaded.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "info",
        },
      })
    );
  } catch (error) {
    yield put(getGroupDetailsErrorAct(error.message));
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

export function* watcherGetGroupDetails() {
  yield takeEvery(GET_GROUP_DETAILS_REQ, workerGetGroupDetails);
}

export function* workerGetGroupFiles({ userId, loginToken, groupId }) {
  try {
    const res = yield call(getGroupFilesReq, userId, loginToken, groupId);
    const groupFiles = res.map((elem) => {
      return {
        id: elem.id,
        fileownerid: elem.fileownerid,
        filename: elem.filename,
        filepath: elem.filepath,
        filetype: elem.filetype,
        created_at: elem.created_at,
        updated_at: elem.updated_at,
        group_id: elem.group_id,
        filesize: elem.filesize,
        fileid: elem.file_id,
      };
    });

    yield put(getGroupFilesSuccessAct(groupFiles));
    yield put(
      enqueueSnackbarAct({
        message: `${groupFiles.length} Files loaded.`,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "info",
        },
      })
    );
  } catch (error) {
    yield put(getGroupFilesErrorAct(error.message));
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

export function* watcherGetGroupFiles() {
  yield takeEvery(GET_GROUP_FILES_REQ, workerGetGroupFiles);
}

export function* workerPublishFileToGroup({
  userId,
  loginToken,
  groupId,
  fileId,
}) {
  try {
    yield call(publishFileToGroupReq, userId, loginToken, groupId, fileId);
    yield put(publishFileToGroupSuccessAct());
    yield put(
      enqueueSnackbarAct({
        message: "File published.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "info",
        },
      })
    );
    yield put(getGroupDetailsReqAct(userId, loginToken, groupId));
    yield put(getGroupFilesReqAct(userId, loginToken, groupId));
  } catch (error) {
    yield put(publishFileToGroupErrorAct(error.message));
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

export function* watcherPublishFileToGroup() {
  yield takeEvery(PUBLISH_FILE_TO_GROUP_REQ, workerPublishFileToGroup);
}

export function* workerDeleteFileFromGroup({
  userId,
  loginToken,
  groupId,
  fileId,
}) {
  try {
    yield call(deleteFileFromGroupReq, userId, loginToken, groupId, fileId);

    yield put(deleteFileFromGroupSuccessAct());
    yield put(
      enqueueSnackbarAct({
        message: "File deleted.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "info",
        },
      })
    );
    yield put(getGroupDetailsReqAct(userId, loginToken, groupId));
    yield put(getGroupFilesReqAct(userId, loginToken, groupId));
  } catch (error) {
    yield put(deleteFileFromGroupErrorAct(error.message));
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

export function* watcherDeleteFileFromGroup() {
  yield takeEvery(DELETE_FILE_FROM_GROUP_REQ, workerDeleteFileFromGroup);
}

export function* workerDownloadFileFromGroup({
  userId,
  loginToken,
  groupId,
  fileId,
}) {
  try {
    yield call(downloadFileFromGroupReq, userId, loginToken, groupId, fileId);
    yield put(downloadFileFromGroupSuccessAct());
  } catch (error) {
    yield put(downloadFileFromGroupErrorAct(error.message));
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

export function* watcherDownloadFileFromGroup() {
  yield takeEvery(DOWNLOAD_FILE_FROM_GROUP_REQ, workerDownloadFileFromGroup);
}

export default function* rootSaga() {
  yield all([
    fork(watcherGetGroupDetails),
    fork(watcherGetGroupFiles),
    fork(watcherPublishFileToGroup),
    fork(watcherDeleteFileFromGroup),
    fork(watcherDownloadFileFromGroup),
  ]);
}
