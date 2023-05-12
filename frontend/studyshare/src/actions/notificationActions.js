import {
  NOTIFICATIONS_ERROR,
  NOTIFICATIONS_REQ,
  NOTIFICATIONS_SUCCESS,
  UPDATE_NOTIFICATION_ERROR,
  UPDATE_NOTIFICATION_REQ,
  UPDATE_NOTIFICATION_SUCCESS,
  DECLINE_NOTIFICATION_ERROR,
  DECLINE_NOTIFICATION_REQ,
  DECLINE_NOTIFICATION_SUCCESS,
} from "../types/notificationTypes";

export const notificationReqAct = (userId, loginToken) => {
  return {
    type: NOTIFICATIONS_REQ,
    userId,
    loginToken,
  };
};

export const notificationSuccessAct = (notifications) => {
  return {
    type: NOTIFICATIONS_SUCCESS,
    notifications,
  };
};

export const notificationErrorAct = (error) => {
  return {
    type: NOTIFICATIONS_ERROR,
    error,
  };
};

export const updateNotificationReqAct = (
  userId,
  loginToken,
  notificationId
) => {
  return {
    type: UPDATE_NOTIFICATION_REQ,
    userId,
    loginToken,
    notificationId,
  };
};

export const updateNotificationSuccessAct = () => {
  return {
    type: UPDATE_NOTIFICATION_SUCCESS,
  };
};

export const updateNotificationErrorAct = (error) => {
  return {
    type: UPDATE_NOTIFICATION_ERROR,
    error,
  };
};

export const declineNotificationReqAct = (
  userId,
  loginToken,
  notificationId
) => {
  return {
    type: DECLINE_NOTIFICATION_REQ,
    userId,
    loginToken,
    notificationId,
  };
};

export const declineNotificationSuccessAct = () => {
  return {
    type: DECLINE_NOTIFICATION_SUCCESS,
  };
};

export const declineNotificationErrorAct = (error) => {
  return {
    type: DECLINE_NOTIFICATION_ERROR,
    error,
  };
};
