import React from "react";

import { NOTIFICATIONS } from "../../constants";
export const NotificationItem = (props) => {
  const { notification } = props;
  const { notification_type, notification_msg } = notification;

  if (notification_type === NOTIFICATIONS.NOTIFICATION_TYPE_GROUP_INVITE) {
    return <div>{notification_msg}</div>;
  } else if (
    notification_type === NOTIFICATIONS.NOTIFICATION_TYPE_GROUP_UPLOAD
  ) {
    return <div>FILE</div>;
  }
};
