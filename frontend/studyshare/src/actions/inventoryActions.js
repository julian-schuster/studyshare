import {
  FILE_UPLOAD_REQ,
  FILE_UPLOAD_SUCCESS,
  FILE_UPLOAD_ERROR,
  SET_INVENTORY_LIST_PAGE,
  RESET_INVENTORY_LIST_PAGE,
  GET_FILES_ERROR,
  GET_FILES_SUCCESS,
  GET_FILES_REQ,
  DELETE_FILE_FROM_INVENTORY_REQ,
  DELETE_FILE_FROM_INVENTORY_SUCCESS,
  DELETE_FILE_FROM_INVENTORY_ERROR,
  DOWNLOAD_FILE_FROM_INVENTORY_REQ,
  DOWNLOAD_FILE_FROM_INVENTORY_SUCCESS,
  DOWNLOAD_FILE_FROM_INVENTORY_ERROR,
} from "../types/inventoryTypes";

export const uploadFileReqAct = (userId, loginToken, file) => {
  return {
    type: FILE_UPLOAD_REQ,
    userId,
    loginToken,
    file,
  };
};

export const uploadFileSuccessAct = (fileid, filename) => {
  return {
    type: FILE_UPLOAD_SUCCESS,
    fileid,
    filename,
  };
};

export const uploadFileErrorAct = (error) => {
  return {
    type: FILE_UPLOAD_ERROR,
    error,
  };
};

export const setInventoryListPageAct = (userId, loginToken, page) => {
  return {
    type: SET_INVENTORY_LIST_PAGE,
    userId,
    loginToken,
    page,
  };
};

export const resetInventoryListPageAct = () => {
  return {
    type: RESET_INVENTORY_LIST_PAGE,
  };
};

export const getFilesReqAct = (userId, loginToken, page) => {
  return {
    type: GET_FILES_REQ,
    userId,
    loginToken,
    page,
  };
};

export const getFilesSuccessAct = (filelist, totalPages) => {
  return {
    type: GET_FILES_SUCCESS,
    filelist,
    totalPages,
  };
};

export const getFilesErrorAct = (error) => {
  return {
    type: GET_FILES_ERROR,
    error,
  };
};

export const deleteFileFromInventoryReqAct = (userId, loginToken, fileId) => {
  return {
    type: DELETE_FILE_FROM_INVENTORY_REQ,
    userId,
    loginToken,
    fileId,
  };
};

export const deleteFileFromInventorySuccessAct = () => {
  return {
    type: DELETE_FILE_FROM_INVENTORY_SUCCESS,
  };
};

export const deleteFileFromInventoryErrorAct = (error) => {
  return {
    type: DELETE_FILE_FROM_INVENTORY_ERROR,
    error,
  };
};

export const downloadFileFromInventoryReqAct = (userId, loginToken, fileId) => {
  return {
    type: DOWNLOAD_FILE_FROM_INVENTORY_REQ,
    userId,
    loginToken,
    fileId,
  };
};

export const downloadFileFromInventorySuccessAct = () => {
  return {
    type: DOWNLOAD_FILE_FROM_INVENTORY_SUCCESS,
  };
};

export const downloadFileFromInventoryErrorAct = (error) => {
  return {
    type: DOWNLOAD_FILE_FROM_INVENTORY_ERROR,
    error,
  };
};
