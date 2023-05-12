import {
  GET_GROUP_DETAILS_REQ,
  GET_GROUP_DETAILS_SUCCESS,
  GET_GROUP_DETAILS_ERROR,
  GET_GROUP_FILES_REQ,
  GET_GROUP_FILES_SUCCESS,
  GET_GROUP_FILES_ERROR,
  PUBLISH_FILE_TO_GROUP_REQ,
  PUBLISH_FILE_TO_GROUP_SUCCESS,
  PUBLISH_FILE_TO_GROUP_ERROR,
  DELETE_FILE_FROM_GROUP_REQ,
  DELETE_FILE_FROM_GROUP_SUCCESS,
  DELETE_FILE_FROM_GROUP_ERROR,
  DOWNLOAD_FILE_FROM_GROUP_REQ,
  DOWNLOAD_FILE_FROM_GROUP_SUCCESS,
  DOWNLOAD_FILE_FROM_GROUP_ERROR,
} from "../types/groupDetailTypes";

export const getGroupDetailsReqAct = (userId, loginToken, groupId) => {
  return {
    type: GET_GROUP_DETAILS_REQ,
    userId,
    loginToken,
    groupId,
  };
};

export const getGroupDetailsSuccessAct = (details) => {
  return {
    type: GET_GROUP_DETAILS_SUCCESS,
    details,
  };
};

export const getGroupDetailsErrorAct = (error) => {
  return {
    type: GET_GROUP_DETAILS_ERROR,
    error,
  };
};

export const getGroupFilesReqAct = (userId, loginToken, groupId) => {
  return {
    type: GET_GROUP_FILES_REQ,
    userId,
    loginToken,
    groupId,
  };
};

export const getGroupFilesSuccessAct = (files) => {
  return {
    type: GET_GROUP_FILES_SUCCESS,
    files,
  };
};

export const getGroupFilesErrorAct = (error) => {
  return {
    type: GET_GROUP_FILES_ERROR,
    error,
  };
};

export const publishFileToGroupReqAct = (
  userId,
  loginToken,
  groupId,
  fileId
) => {
  return {
    type: PUBLISH_FILE_TO_GROUP_REQ,
    userId,
    loginToken,
    groupId,
    fileId,
  };
};

export const publishFileToGroupSuccessAct = () => {
  return {
    type: PUBLISH_FILE_TO_GROUP_SUCCESS,
  };
};

export const publishFileToGroupErrorAct = (error) => {
  return {
    type: PUBLISH_FILE_TO_GROUP_ERROR,
    error,
  };
};

export const deleteFileFromGroupReqAct = (
  userId,
  loginToken,
  groupId,
  fileId
) => {
  return {
    type: DELETE_FILE_FROM_GROUP_REQ,
    userId,
    loginToken,
    groupId,
    fileId,
  };
};

export const deleteFileFromGroupSuccessAct = () => {
  return {
    type: DELETE_FILE_FROM_GROUP_SUCCESS,
  };
};

export const deleteFileFromGroupErrorAct = (error) => {
  return {
    type: DELETE_FILE_FROM_GROUP_ERROR,
    error,
  };
};

export const downloadFileFromGroupReqAct = (
  userId,
  loginToken,
  groupId,
  fileId
) => {
  return {
    type: DOWNLOAD_FILE_FROM_GROUP_REQ,
    userId,
    loginToken,
    groupId,
    fileId,
  };
};

export const downloadFileFromGroupSuccessAct = () => {
  return {
    type: DOWNLOAD_FILE_FROM_GROUP_SUCCESS,
  };
};

export const downloadFileFromGroupErrorAct = (error) => {
  return {
    type: DOWNLOAD_FILE_FROM_GROUP_ERROR,
    error,
  };
};
