import { PAGINATION } from "../constants";

export const showGroupsReq = async (userId, loginToken, page) => {
  const url =
    "http://localhost/studyshare/backend/studyshare/public/api/group/getlist?userid=" +
    userId +
    "&grouplistuserid=" +
    userId +
    "&logintoken=" +
    loginToken +
    "&size=" +
    PAGINATION.GROUPS_PER_PAGE +
    "&page=" +
    page;

  const settings = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, settings);

  const jsonResponse = await response.json();
  if (!response.ok) {
    const message = `Error ${response.status}: ${jsonResponse.error}`;
    throw new Error(message);
  }
  return jsonResponse;
};

export const showAvailableGroupsReq = async (userId, loginToken, page) => {
  const url =
    "http://localhost/studyshare/backend/studyshare/public/api/group/nomemberlist?userid=" +
    userId +
    "&logintoken=" +
    loginToken +
    "&size=" +
    PAGINATION.GROUPS_PER_PAGE +
    "&page=" +
    page;

  const settings = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, settings);

  const jsonResponse = await response.json();
  if (!response.ok) {
    const message = `Error ${response.status}: ${jsonResponse.error}`;
    throw new Error(message);
  }
  return jsonResponse;
};

export const createGroupReq = async (
  userId,
  loginToken,
  title,
  description,
  fileCountLimit,
  fileSizeLimit,
  isPublic
) => {
  const url =
    "http://localhost/studyshare/backend/studyshare/public/api/group/create";
  const data = {
    userid: userId,
    logintoken: loginToken,
    groupname: title,
    description: description,
    filelimit: fileCountLimit,
    filesizelimit: fileSizeLimit,
    is_public: isPublic,
  };

  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, settings);

  const jsonResponse = await response.json();
  if (!response.ok) {
    const message = `Error ${response.status}: ${jsonResponse.error}`;
    throw new Error(message);
  }
  return jsonResponse;
};

export const joinGroupReq = async (userId, loginToken, groupId) => {
  const url =
    "http://localhost/studyshare/backend/studyshare/public/api/group/join";
  const data = {
    userid: userId,
    logintoken: loginToken,
    groupid: groupId,
  };

  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, settings);

  const jsonResponse = await response.json();
  if (!response.ok) {
    const message = `Error ${response.status}: ${jsonResponse.error}`;
    throw new Error(message);
  }
  return jsonResponse;
};

export const deleteGroupReq = async (userId, loginToken, groupId) => {
  const url = `http://localhost/studyshare/backend/studyshare/public/api/group/delete?userid=${userId}&logintoken=${loginToken}&groupid=${groupId}`;

  const response = await fetch(url, {
    method: "DELETE",
  });

  const jsonResponse = await response.json();
  if (!response.ok) {
    const message = `Error ${response.status}: ${jsonResponse.error}`;
    throw new Error(message);
  }
  return jsonResponse;
};

export const leaveGroupReq = async (userId, loginToken, groupId) => {
  const url = `http://localhost/studyshare/backend/studyshare/public/api/group/leave?userid=${userId}&logintoken=${loginToken}&groupid=${groupId}`;

  const response = await fetch(url, {
    method: "DELETE",
  });

  const jsonResponse = await response.json();
  if (!response.ok) {
    const message = `Error ${response.status}: ${jsonResponse.error}`;
    throw new Error(message);
  }
  return jsonResponse;
};

export const searchUserReq = async (userId, loginToken, searchTerm, page) => {
  const url =
    "http://localhost/studyshare/backend/studyshare/public/api/getuser?userid=" +
    userId +
    "&logintoken=" +
    loginToken +
    "&size=" +
    PAGINATION.GROUPS_PER_PAGE +
    "&page=" +
    page +
    "&name=" +
    searchTerm;

  const settings = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, settings);

  const jsonResponse = await response.json();
  if (!response.ok) {
    const message = `Error ${response.status}: ${jsonResponse.error}`;
    throw new Error(message);
  }
  return jsonResponse;
};

export const inviteUserReq = async (
  userId,
  loginToken,
  receiverId,
  groupId
) => {
  const url =
    "http://localhost/studyshare/backend/studyshare/public/api/group/invite";
  const data = {
    userid: userId,
    logintoken: loginToken,
    receiverid: receiverId,
    groupid: groupId,
  };

  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, settings);

  const jsonResponse = await response.json();
  if (!response.ok) {
    const message = `Error ${response.status}: ${jsonResponse.error}`;
    throw new Error(message);
  }
  return jsonResponse;
};
