import {
  FILE_UPLOAD_REQ,
  FILE_UPLOAD_SUCCESS,
  FILE_UPLOAD_ERROR,
  SET_INVENTORY_LIST_PAGE,
  RESET_INVENTORY_LIST_PAGE,
  GET_FILES_REQ,
  GET_FILES_SUCCESS,
  GET_FILES_ERROR,
  DELETE_FILE_FROM_INVENTORY_REQ,
  DELETE_FILE_FROM_INVENTORY_SUCCESS,
  DELETE_FILE_FROM_INVENTORY_ERROR,
  DOWNLOAD_FILE_FROM_INVENTORY_REQ,
  DOWNLOAD_FILE_FROM_INVENTORY_SUCCESS,
  DOWNLOAD_FILE_FROM_INVENTORY_ERROR,
} from "../types/inventoryTypes";

const INITIAL_STATE = {
  isGettingFiles: false,
  isUploadingFile: false,
  isDeletingFile: false,
  fileId: null,
  fileName: null,
  fileList: [],
  page: 1,
  totalPages: 1,
  isDownloadingFile: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FILE_UPLOAD_REQ:
      return {
        ...state,
        isUploadingFile: true,
      };

    case FILE_UPLOAD_SUCCESS:
      return {
        ...state,
        isUploadingFile: false,
        fileId: action.fileid,
        fileName: action.filename,
      };

    case FILE_UPLOAD_ERROR:
      return {
        ...state,
        isUploadingFile: false,
        error: action.error,
      };

    case SET_INVENTORY_LIST_PAGE:
      return {
        ...state,
        page: action.page,
      };

    case RESET_INVENTORY_LIST_PAGE:
      return {
        ...state,
        page: INITIAL_STATE.page,
      };

    case GET_FILES_REQ:
      return {
        ...state,
        isGettingFiles: true,
      };

    case GET_FILES_SUCCESS:
      return {
        ...state,
        isGettingFiles: false,
        fileList: action.filelist,
        totalPages: action.totalPages,
      };

    case GET_FILES_ERROR:
      return {
        ...state,
        isGettingFiles: false,
        error: action.error,
      };

    case DELETE_FILE_FROM_INVENTORY_REQ:
      return {
        ...state,
        isDeletingFile: true,
      };

    case DELETE_FILE_FROM_INVENTORY_SUCCESS:
      return {
        ...state,
        isDeletingFile: false,
      };

    case DELETE_FILE_FROM_INVENTORY_ERROR:
      return {
        ...state,
        isDeletingFile: false,
        error: action.error,
      };

    case DOWNLOAD_FILE_FROM_INVENTORY_REQ:
      return {
        ...state,
        isDownloadingFile: true,
      };

    case DOWNLOAD_FILE_FROM_INVENTORY_SUCCESS:
      return {
        ...state,
        isDownloadingFile: false,
      };

    case DOWNLOAD_FILE_FROM_INVENTORY_ERROR:
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
