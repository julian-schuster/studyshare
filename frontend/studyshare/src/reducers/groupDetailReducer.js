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

const INITIAL_STATE = {
  isGettingGroupDetails: false,
  isGettingGroupFiles: false,
  isPublishingFile: false,
  isDeletingFile: false,
  isDownloadingFile: false,
  groupDetails: [],
  groupFiles: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_GROUP_DETAILS_REQ:
      return {
        ...state,
        isGettingGroupDetails: true,
      };

    case GET_GROUP_DETAILS_SUCCESS:
      return {
        ...state,
        isGettingGroupDetails: false,
        groupDetails: action.details,
      };

    case GET_GROUP_DETAILS_ERROR:
      return {
        ...state,
        isGettingGroupDetails: false,
        error: action.error,
      };

    case GET_GROUP_FILES_REQ:
      return {
        ...state,
        isGettingGroupFiles: true,
      };

    case GET_GROUP_FILES_SUCCESS:
      return {
        ...state,
        isGettingGroupFiles: false,
        groupFiles: action.files,
      };

    case GET_GROUP_FILES_ERROR:
      return {
        ...state,
        isGettingGroupFiles: false,
        error: action.error,
      };

    case PUBLISH_FILE_TO_GROUP_REQ:
      return {
        ...state,
        isPublishingFile: true,
      };

    case PUBLISH_FILE_TO_GROUP_SUCCESS:
      return {
        ...state,
        isPublishingFile: false,
      };

    case PUBLISH_FILE_TO_GROUP_ERROR:
      return {
        ...state,
        isPublishingFile: false,
        error: action.error,
      };

    case DELETE_FILE_FROM_GROUP_REQ:
      return {
        ...state,
        isDeletingFile: true,
      };

    case DELETE_FILE_FROM_GROUP_SUCCESS:
      return {
        ...state,
        isDeletingFile: false,
      };

    case DELETE_FILE_FROM_GROUP_ERROR:
      return {
        ...state,
        isDeletingFile: false,
        error: action.error,
      };

    case DOWNLOAD_FILE_FROM_GROUP_REQ:
      return {
        ...state,
        isDownloadingFile: true,
      };

    case DOWNLOAD_FILE_FROM_GROUP_SUCCESS:
      return {
        ...state,
        isDownloadingFile: false,
      };

    case DOWNLOAD_FILE_FROM_GROUP_ERROR:
      return {
        ...state,
        isDownloadingFile: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
