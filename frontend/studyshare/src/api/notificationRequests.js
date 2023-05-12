export const getNotificationsReq = async (userId, loginToken) => {
  const url =
    "http://localhost/studyshare/backend/studyshare/public/api/notifications" +
    "?userid=" +
    userId +
    "&logintoken=" +
    loginToken;
  const settings = {
    method: "GET",
  };

  const response = await fetch(url, settings);
  const jsonResponse = await response.json();

  if (!response.ok) {
    const message = `Error ${response.status}: ${jsonResponse.ERROR}`;
    throw new Error(message);
  }
  return jsonResponse;
};

export const updateNotificationReq = async (
  userId,
  loginToken,
  notificationId
) => {
  const url =
    "http://localhost/studyshare/backend/studyshare/public/api/notification?userid=" +
    userId +
    "&logintoken=" +
    loginToken +
    "&notificationid=" +
    notificationId;

  const settings = {
    method: "PUT",
  };

  const response = await fetch(url, settings);

  const jsonResponse = await response.json();
  if (!response.ok) {
    const message = `Error ${response.status}: ${jsonResponse.error}`;
    throw new Error(message);
  }
  return jsonResponse;
};

export const declineNotificationReq = async (userId, loginToken, groupId) => {
  const url =
    "http://localhost/studyshare/backend/studyshare/public/api/group/decline?userid=" +
    userId +
    "&logintoken=" +
    loginToken +
    "&groupid=" +
    groupId;

  const settings = {
    method: "PUT",
  };

  const response = await fetch(url, settings);

  const jsonResponse = await response.json();
  if (!response.ok) {
    const message = `Error ${response.status}: ${jsonResponse.error}`;
    throw new Error(message);
  }
  return jsonResponse;
};

export const deleteNotificationReq = async (
  userId,
  loginToken,
  notificationId
) => {
  const url =
    "http://localhost/studyshare/backend/studyshare/public/api/notification?userid=" +
    userId +
    "&logintoken=" +
    loginToken +
    "&notificationid=" +
    notificationId;

  const settings = {
    method: "DELETE",
  };

  const response = await fetch(url, settings);

  const jsonResponse = await response.json();
  if (!response.ok) {
    const message = `Error ${response.status}: ${jsonResponse.error}`;
    throw new Error(message);
  }
  return jsonResponse;
};
