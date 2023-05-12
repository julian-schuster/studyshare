import { PAGINATION } from "../constants";

export const uploadFileReq = async (userId, loginToken, file) => {
  const url = "http://localhost/studyshare/backend/studyshare/public/api/files";

  const formData = new FormData();
  formData.append("file", file[0]);
  formData.append("userid", userId);
  formData.append("logintoken", loginToken);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const jsonResponse = await response.json();
  if (!response.ok) {
    const message = `Error ${response.status}: ${jsonResponse.error}`;
    throw new Error(message);
  } else if (jsonResponse.status !== undefined && jsonResponse.status !== 200) {
    const message = `Error ${jsonResponse.status}: ${jsonResponse.error}`;
    throw new Error(message);
  }
  return jsonResponse;
};

export const getFilesReq = async (userId, loginToken, page) => {
  const url =
    "http://localhost/studyshare/backend/studyshare/public/api/files?userid=" +
    userId +
    "&logintoken=" +
    loginToken +
    "&size=" +
    PAGINATION.FILES_PER_PAGE +
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
    const message = `Error ${response.status}: ${jsonResponse.ERROR}`;
    throw new Error(message);
  }
  return jsonResponse;
};

export const deleteFileFromInventoryReq = async (
  userId,
  loginToken,
  fileId
) => {
  const url =
    "http://localhost/studyshare/backend/studyshare/public/api/files?userid=" +
    userId +
    "&logintoken=" +
    loginToken +
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

export const downloadFileFromInventoryReq = async (
  userId,
  loginToken,
  fileId
) => {
  const url =
    "http://localhost/studyshare/backend/studyshare/public/api/files/download?userid=" +
    userId +
    "&logintoken=" +
    loginToken +
    "&fileid=" +
    fileId;

  window.open(url, "_blank");
};
