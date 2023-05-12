export const formatIsoDate = (isoDateString, includeTime) => {
  const date = new Date(isoDateString);
  if (includeTime === null || includeTime === true) {
    return (
      addPadding(date.getUTCDate(), 2) +
      "." +
      addPadding(date.getUTCMonth() + 1, 2) +
      "." +
      date.getUTCFullYear() +
      ", " +
      addPadding(date.getUTCHours(), 2) +
      ":" +
      addPadding(date.getUTCMinutes(), 2) +
      ":" +
      addPadding(date.getUTCSeconds(), 2)
    );
  } else {
    return (
      addPadding(date.getUTCDate(), 2) +
      "." +
      addPadding(date.getUTCMonth() + 1, 2) +
      "." +
      date.getUTCFullYear()
    );
  }
};

const addPadding = (string, desiredLength) => {
  string = string.toString();
  while (string.length < desiredLength) {
    string = "0" + string;
  }
  return string;
};

export const shortenString = (string, maxLength) => {
  return maxLength > 3 ? string.substring(0, maxLength - 3) + "..." : string;
};
