export const getGroupDetailsReq = async (userId, loginToken, groupId) => {
  const url =
    "http://localhost/studyshare/backend/studyshare/public/api/group/details?userid=" +
    userId +
    "&logintoken=" +
    loginToken +
    "&groupid=" +
    groupId;

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

export const getGroupFilesReq = async (userId, loginToken, groupId) => {
  const url =
    "http://localhost/studyshare/backend/studyshare/public/api/group/files?userid=" +
    userId +
    "&logintoken=" +
    loginToken +
    "&groupid=" +
    groupId;

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

export const publishFileToGroupReq = async (
  userId,
  loginToken,
  groupId,
  fileId
) => {
  const url =
    "http://localhost/studyshare/backend/studyshare/public/api/inventory/publish";
  const data = {
    userid: userId,
    logintoken: loginToken,
    groupid: groupId,
    fileid: fileId,
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

export const deleteFileFromGroupReq = async (
  userId,
  loginToken,
  groupId,
  fileId
) => {
  const url =
    "http://localhost/studyshare/backend/studyshare/public/api/group/deletefile?userid=" +
    userId +
    "&logintoken=" +
    loginToken +
    "&groupid=" +
    groupId +
    "&fileid=" +
    fileId;

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

export const downloadFileFromGroupReq = async (
  userId,
  loginToken,
  groupId,
  fileId
) => {
  const url =
    `http://localhost/studyshare/backend/studyshare/public/api/group/${groupId}/${fileId}?userid=` +
    userId +
    "&logintoken=" +
    loginToken +
    "&groupid=" +
    groupId +
    "&fileid=" +
    fileId;

  window.open(url, "_blank");
};
