import {
  SHOW_GROUPS_REQ,
  SHOW_GROUPS_SUCCESS,
  SHOW_GROUPS_ERROR,
  SHOW_AVAILABLE_GROUPS_REQ,
  SHOW_AVAILABLE_GROUPS_SUCCESS,
  SHOW_AVAILABLE_GROUPS_ERROR,
  CREATE_GROUP_REQ,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_ERROR,
  CHANGE_GROUP_CREATION_VALUE,
  CLEAR_GROUP_CREATION_VALUES,
  SET_GROUP_LIST_PAGE,
  JOIN_GROUP_REQ,
  JOIN_GROUP_SUCCESS,
  JOIN_GROUP_ERROR,
  SET_AVAILABLE_GROUPS_DIALOG_PAGE,
  DELETE_GROUP_REQ,
  DELETE_GROUP_ERROR,
  DELETE_GROUP_SUCCESS,
  LEAVE_GROUP_REQ,
  LEAVE_GROUP_ERROR,
  LEAVE_GROUP_SUCCESS,
  SEARCH_USER_REQ,
  SEARCH_USER_ERROR,
  SEARCH_USER_SUCCESS,
  SET_AVAILABLE_USERS_DIALOG_PAGE,
  RESET_AVAILABLE_USERS,
  INVITE_USER_REQ,
  INVITE_USER_SUCCESS,
  INVITE_USER_ERROR,
} from "../types/groupTypes";

export const showGroupsReqAct = (userId, loginToken, page) => {
  return {
    type: SHOW_GROUPS_REQ,
    userId,
    loginToken,
    page,
  };
};

export const showGroupsSuccessAct = (groups, totalPages) => {
  return {
    type: SHOW_GROUPS_SUCCESS,
    groups,
    totalPages,
  };
};

export const showGroupsErrorAct = (error) => {
  return {
    type: SHOW_GROUPS_ERROR,
    error,
  };
};

export const showAvailableGroupsReqAct = (userId, loginToken, page) => {
  return {
    type: SHOW_AVAILABLE_GROUPS_REQ,
    userId,
    loginToken,
    page,
  };
};

export const showAvailableGroupsSuccessAct = (groups, totalPages) => {
  return {
    type: SHOW_AVAILABLE_GROUPS_SUCCESS,
    groups,
    totalPages,
  };
};

export const showAvailableGroupsErrorAct = (error) => {
  return {
    type: SHOW_AVAILABLE_GROUPS_ERROR,
    error,
  };
};

export const createGroupReq = (
  userId,
  loginToken,
  title,
  description,
  fileCountLimit,
  fileSizeLimit,
  isPublic
) => {
  return {
    type: CREATE_GROUP_REQ,
    userId,
    loginToken,
    title,
    description,
    fileCountLimit,
    fileSizeLimit,
    isPublic,
  };
};

export const createGroupSuccessAct = () => {
  return {
    type: CREATE_GROUP_SUCCESS,
  };
};

export const createGroupErrorAct = (error) => {
  return {
    type: CREATE_GROUP_ERROR,
    error,
  };
};

export const joinGroupReqAct = (userId, loginToken, groupId) => {
  return {
    type: JOIN_GROUP_REQ,
    userId,
    loginToken,
    groupId,
  };
};

export const joinGroupSuccessAct = () => {
  return {
    type: JOIN_GROUP_SUCCESS,
  };
};

export const joinGroupErrorAct = (error) => {
  return {
    type: JOIN_GROUP_ERROR,
    error,
  };
};

export const changeGroupCreationValue = (inputKey, value) => {
  return {
    type: CHANGE_GROUP_CREATION_VALUE,
    inputKey,
    value,
  };
};

export const clearGroupCreationValues = () => {
  return {
    type: CLEAR_GROUP_CREATION_VALUES,
  };
};

export const setGroupListPageAct = (userId, loginToken, page) => {
  return {
    type: SET_GROUP_LIST_PAGE,
    userId,
    loginToken,
    page,
  };
};

export const setAvailableGroupsDialogPageAct = (userId, loginToken, page) => {
  return {
    type: SET_AVAILABLE_GROUPS_DIALOG_PAGE,
    userId,
    loginToken,
    page,
  };
};

export const setAvailableUsersDialogPageAct = (
  userId,
  loginToken,
  searchTerm,
  page
) => {
  return {
    type: SET_AVAILABLE_USERS_DIALOG_PAGE,
    userId,
    loginToken,
    searchTerm,
    page,
  };
};

export const deleteGroupReqAct = (userId, loginToken, groupId) => {
  return {
    type: DELETE_GROUP_REQ,
    userId,
    loginToken,
    groupId,
  };
};
export const deleteGroupSuccessAct = () => {
  return {
    type: DELETE_GROUP_SUCCESS,
  };
};
export const deleteGroupErrorAct = (error) => {
  return {
    type: DELETE_GROUP_ERROR,
    error,
  };
};

export const leaveGroupReqAct = (userId, loginToken, groupId) => {
  return {
    type: LEAVE_GROUP_REQ,
    userId,
    loginToken,
    groupId,
  };
};
export const leaveGroupSuccessAct = () => {
  return {
    type: LEAVE_GROUP_SUCCESS,
  };
};
export const leaveGroupErrorAct = (error) => {
  return {
    type: LEAVE_GROUP_ERROR,
    error,
  };
};

export const searchUserReqAct = (userId, loginToken, searchTerm, page) => {
  return {
    type: SEARCH_USER_REQ,
    userId,
    loginToken,
    searchTerm,
    page,
  };
};
export const searchUserSuccessAct = (users, totalPages) => {
  return {
    type: SEARCH_USER_SUCCESS,
    users,
    totalPages,
  };
};
export const searchUserErrorAct = (error) => {
  return {
    type: SEARCH_USER_ERROR,
    error,
  };
};

export const resetAvailableUsersAct = () => {
  return {
    type: RESET_AVAILABLE_USERS,
  };
};

export const inviteUserReqAct = (userId, loginToken, receiverId, groupId) => {
  return {
    type: INVITE_USER_REQ,
    userId,
    loginToken,
    receiverId,
    groupId,
  };
};
export const inviteUserSuccessAct = () => {
  return {
    type: INVITE_USER_SUCCESS,
  };
};
export const inviteUserErrorAct = (error) => {
  return {
    type: INVITE_USER_ERROR,
    error,
  };
};
