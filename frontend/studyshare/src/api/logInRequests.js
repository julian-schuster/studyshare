/**
 * A constant determining the minimum delay of mocked backend requests
 * @constant
 * @type {number}
 */
const MIN_MOCKED_REQUEST_DELAY_IN_MS = 1000;

/**
 * A constant determining the maximum delay of mocked backend requests
 * @constant
 * @type {number}
 */
const MAX_MOCKED_REQUEST_DELAY_IN_MS = 4000;

/**
 * Mocks the network delay when requesting data from the backend
 * @function
 * @param   {Object}  mockedResponse  the response object which should be returned after the delay
 * @return  {Promise}                 A Promise resolving after a random waiting time between MIN_MOCKED_REQUEST_DELAY_IN_MS and MAX_MOCKED_REQUEST_DELAY_IN_MS milliseconds
 */

const mockDelayedApiCall = (mockedResponse) => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(mockedResponse),
      Math.floor(
        Math.random() *
          (MAX_MOCKED_REQUEST_DELAY_IN_MS - MIN_MOCKED_REQUEST_DELAY_IN_MS)
      ) + MIN_MOCKED_REQUEST_DELAY_IN_MS
    );
  });
};

export const logInReqMock = async (email, password) => {
  if (email === "jens.jux@informatik.hs-fulda.de" && password === "1234") {
    return mockDelayedApiCall();
  } else {
    throw new Error("wrong credentials");
  }
};

export const logInReq = async (email, password) => {
  const url = "http://localhost/studyshare/backend/studyshare/public/api/login";
  const data = {
    email,
    password,
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
    const message = `Error ${response.status}: ${jsonResponse.ERROR}`;
    throw new Error(message);
  }
  return jsonResponse;
};

export const logOutReq = async (userId, loginToken) => {
  const url =
    "http://localhost/studyshare/backend/studyshare/public/api/logout";
  const data = {
    userid: userId,
    logintoken: loginToken,
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
    const message = `Error ${response.status}: ${jsonResponse.ERROR}`;
    throw new Error(message);
  }
  return jsonResponse;
};

export const signUpReq = async (email, password, password_confirmation) => {
  const url =
    "http://localhost/studyshare/backend/studyshare/public/api/register";

  const data = {
    email,
    password,
    password_confirmation,
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
    const message = `Error ${response.status}: ${jsonResponse.email[0]}`;
    throw new Error(message);
  }
  return jsonResponse;
};
