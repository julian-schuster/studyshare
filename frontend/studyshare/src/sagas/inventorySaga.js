import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import {
  FILE_UPLOAD_REQ,
  GET_FILES_REQ,
  SET_INVENTORY_LIST_PAGE,
  DELETE_FILE_FROM_INVENTORY_REQ,
  DOWNLOAD_FILE_FROM_INVENTORY_REQ,
} from "../types/inventoryTypes";
import {
  uploadFileErrorAct,
  uploadFileSuccessAct,
  getFilesSuccessAct,
  getFilesErrorAct,
  getFilesReqAct,
  deleteFileFromInventorySuccessAct,
  deleteFileFromInventoryErrorAct,
  downloadFileFromInventorySuccessAct,
  downloadFileFromInventoryErrorAct,
} from "../actions/inventoryActions";
import {
  uploadFileReq,
  getFilesReq,
  deleteFileFromInventoryReq,
  downloadFileFromInventoryReq,
} from "../api/inventoryRequests";

import { enqueueSnackbarAct } from "../actions/notifierActions";

export function* workerUploadFile({ userId, loginToken, file }) {
  try {
    const res = yield call(uploadFileReq, userId, loginToken, file);

    yield put(uploadFileSuccessAct(res.fileid, res.filename));
    yield put(
      enqueueSnackbarAct({
        message: "File uploaded successfully.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "success",
        },
      })
    );
    yield put(getFilesReqAct(userId, loginToken, 1));
  } catch (error) {
    yield put(uploadFileErrorAct(error.message));
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

export function* watcherUploadFile() {
  yield takeEvery(FILE_UPLOAD_REQ, workerUploadFile);
}

export function* workerGetFiles({ userId, loginToken, page }) {
  try {
    const res = yield call(getFilesReq, userId, loginToken, page);
    const totalPages = res.data[res.data.length - 1].pages;
    const files = res.data.slice(0, res.data.length - 1);
    yield put(getFilesSuccessAct(files, totalPages));
    yield put(
      enqueueSnackbarAct({
        message: files.length + " files loaded.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "success",
        },
      })
    );
  } catch (error) {
    yield put(getFilesErrorAct(error.message));
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

export function* watcherGetFiles() {
  yield takeEvery(GET_FILES_REQ, workerGetFiles);
}

export function* workerSetPage({ userId, loginToken, page }) {
  yield put(getFilesReqAct(userId, loginToken, page));
}

export function* watcherSetPage() {
  yield takeEvery(SET_INVENTORY_LIST_PAGE, workerSetPage);
}

export function* workerDeleteFileFromInventory({ userId, loginToken, fileId }) {
  try {
    yield call(deleteFileFromInventoryReq, userId, loginToken, fileId);

    yield put(deleteFileFromInventorySuccessAct());
    yield put(
      enqueueSnackbarAct({
        message: "File deleted.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "success",
        },
      })
    );
    yield put(getFilesReqAct(userId, loginToken, 1));
  } catch (error) {
    yield put(deleteFileFromInventoryErrorAct(error.message));
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

export function* watcherDeleteFileFromInventory() {
  yield takeEvery(
    DELETE_FILE_FROM_INVENTORY_REQ,
    workerDeleteFileFromInventory
  );
}

export function* workerDownloadFileFromInventory({
  userId,
  loginToken,
  fileId,
}) {
  try {
    yield call(downloadFileFromInventoryReq, userId, loginToken, fileId);
    yield put(downloadFileFromInventorySuccessAct());
  } catch (error) {
    yield put(downloadFileFromInventoryErrorAct(error.message));
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

export function* watcherDownloadFileFromInventory() {
  yield takeEvery(
    DOWNLOAD_FILE_FROM_INVENTORY_REQ,
    workerDownloadFileFromInventory
  );
}

export default function* rootSaga() {
  yield all([
    fork(watcherUploadFile),
    fork(watcherGetFiles),
    fork(watcherSetPage),
    fork(watcherDeleteFileFromInventory),
    fork(watcherDownloadFileFromInventory),
  ]);
}
