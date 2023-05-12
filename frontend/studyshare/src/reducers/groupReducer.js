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
  INPUT_KEYS_CREATE_GROUP,
  JOIN_GROUP_REQ,
  JOIN_GROUP_SUCCESS,
  JOIN_GROUP_ERROR,
  DELETE_GROUP_REQ,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_ERROR,
  LEAVE_GROUP_REQ,
  LEAVE_GROUP_SUCCESS,
  LEAVE_GROUP_ERROR,
  SEARCH_USER_REQ,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_ERROR,
  RESET_AVAILABLE_USERS,
  INVITE_USER_REQ,
  INVITE_USER_SUCCESS,
  INVITE_USER_ERROR,
} from "../types/groupTypes";

const {
  GROUP_NAME,
  IS_GROUP_PUBLIC,
  GROUP_DESCRIPTION,
  FILE_COUNT_LIMIT,
  FILE_SIZE_LIMIT,
} = INPUT_KEYS_CREATE_GROUP;

const INITIAL_STATE = {
  isGettingGroups: false,
  isGettingAllGroups: false,
  isCreatingGroup: false,
  isJoiningGroup: false,
  isDeletingGroup: false,
  isLeavingGroup: false,
  isSearchingUser: false,
  isInvitingUser: false,
  groups: [],
  allGroups: [],
  availableUsers: [],
  totalPagesAvailableUsers: 1,
  totalPages: 1,
  totalPagesAllGroups: 1,
  newGroupName: null,
  isGroupPublic: false,
  newGroupDescription: null,
  newGroupFileCountLimit: null,
  newGroupFileSizeLimit: null,
  searchTerm: "",
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_GROUPS_REQ:
      return {
        ...state,
        isGettingGroups: true,
      };

    case SHOW_GROUPS_SUCCESS:
      return {
        ...state,
        isGettingGroups: false,
        groups: action.groups,
        totalPages: action.totalPages,
      };

    case SHOW_GROUPS_ERROR:
      return {
        ...state,
        isGettingGroups: false,
        error: action.error,
      };

    case SHOW_AVAILABLE_GROUPS_REQ:
      return {
        ...state,
        isGettingAllGroups: true,
      };

    case SHOW_AVAILABLE_GROUPS_SUCCESS:
      return {
        ...state,
        isGettingAllGroups: false,
        allGroups: action.groups,
        totalPagesAllGroups: action.totalPages,
      };

    case SHOW_AVAILABLE_GROUPS_ERROR:
      return {
        ...state,
        isGettingAllGroups: false,
        error: action.error,
      };

    case CREATE_GROUP_REQ:
      return {
        ...state,
        isCreatingGroup: true,
      };

    case CREATE_GROUP_SUCCESS:
      return {
        ...state,
        isCreatingGroup: false,
      };

    case CREATE_GROUP_ERROR:
      return {
        ...state,
        isCreatingGroup: false,
        error: action.error,
      };

    case JOIN_GROUP_REQ:
      return {
        ...state,
        isJoiningGroup: true,
      };

    case JOIN_GROUP_SUCCESS:
      return {
        ...state,
        isJoiningGroup: false,
      };

    case JOIN_GROUP_ERROR:
      return {
        ...state,
        isJoiningGroup: false,
        error: action.error,
      };

    case CHANGE_GROUP_CREATION_VALUE:
      switch (action.inputKey) {
        case GROUP_NAME:
          return { ...state, newGroupName: action.value };
        case IS_GROUP_PUBLIC:
          return { ...state, isGroupPublic: action.value };
        case GROUP_DESCRIPTION:
          return { ...state, newGroupDescription: action.value };
        case FILE_COUNT_LIMIT:
          return { ...state, newGroupFileCountLimit: action.value };
        case FILE_SIZE_LIMIT:
          return { ...state, newGroupFileSizeLimit: action.value };
        default:
          break;
      }
      break;

    case CLEAR_GROUP_CREATION_VALUES:
      return {
        ...state,
        newGroupName: INITIAL_STATE.newGroupName,
        isGroupPublic: INITIAL_STATE.isGroupPublic,
        newGroupDescription: INITIAL_STATE.newGroupDescription,
        newGroupFileCountLimit: INITIAL_STATE.newGroupFileCountLimit,
        newGroupFileSizeLimit: INITIAL_STATE.newGroupFileSizeLimit,
      };

    case DELETE_GROUP_REQ:
      return {
        ...state,
        isDeletingGroup: true,
      };

    case DELETE_GROUP_SUCCESS:
      return {
        ...state,
        isDeletingGroup: false,
      };

    case DELETE_GROUP_ERROR:
      return {
        ...state,
        isDeletingGroup: false,
        error: action.error,
      };

    case LEAVE_GROUP_REQ:
      return {
        ...state,
        isLeavingGroup: true,
      };

    case LEAVE_GROUP_SUCCESS:
      return {
        ...state,
        isLeavingGroup: false,
      };

    case LEAVE_GROUP_ERROR:
      return {
        ...state,
        isLeavingGroup: false,
        error: action.error,
      };

    case SEARCH_USER_REQ:
      return {
        ...state,
        isSearchingUser: true,
        searchTerm: action.searchTerm,
      };

    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        isSearchingUser: false,
        availableUsers: action.users,
        totalPagesAvailableUsers: action.totalPages,
      };

    case SEARCH_USER_ERROR:
      return {
        ...state,
        isSearchingUser: false,
        error: action.error,
      };

    case RESET_AVAILABLE_USERS:
      return {
        ...state,
        availableUsers: INITIAL_STATE.availableUsers,
        searchTerm: INITIAL_STATE.searchTerm,
        totalPagesAvailableUsers: INITIAL_STATE.totalPagesAvailableUsers,
      };

    case INVITE_USER_REQ:
      return {
        ...state,
        isInvitingUser: true,
      };

    case INVITE_USER_SUCCESS:
      return {
        ...state,
        isInvitingUser: false,
      };

    case INVITE_USER_ERROR:
      return {
        ...state,
        isInvitingUser: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
