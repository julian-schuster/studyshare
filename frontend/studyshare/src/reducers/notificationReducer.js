import {
  NOTIFICATIONS_REQ,
  NOTIFICATIONS_SUCCESS,
  NOTIFICATIONS_ERROR,
  UPDATE_NOTIFICATION_ERROR,
  UPDATE_NOTIFICATION_REQ,
  UPDATE_NOTIFICATION_SUCCESS,
  DECLINE_NOTIFICATION_ERROR,
  DECLINE_NOTIFICATION_REQ,
  DECLINE_NOTIFICATION_SUCCESS,
} from "../types/notificationTypes";

const INITIAL_STATE = {
  isGettingNotifications: false,
  isUpdatingNotifications: false,
  isDecliningNotifications: false,
  notifications: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NOTIFICATIONS_REQ:
      return {
        ...state,
        isGettingNotifications: true,
      };

    case NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        isGettingNotifications: false,
        notifications: action.notifications,
      };

    case NOTIFICATIONS_ERROR:
      return {
        ...state,
        isGettingNotifications: false,
        error: action.error,
      };

    case UPDATE_NOTIFICATION_REQ:
      return {
        ...state,
        isUpdatingNotifications: true,
      };

    case UPDATE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isUpdatingNotifications: false,
      };

    case UPDATE_NOTIFICATION_ERROR:
      return {
        ...state,
        isUpdatingNotifications: false,
        error: action.error,
      };

    case DECLINE_NOTIFICATION_REQ:
      return {
        ...state,
        isDecliningNotifications: true,
      };

    case DECLINE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isDecliningNotifications: false,
      };

    case DECLINE_NOTIFICATION_ERROR:
      return {
        ...state,
        isDecliningNotifications: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
