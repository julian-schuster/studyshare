//validates searchTerm required
export const validateSearchTerm = (values) => {
  const errors = {};
  if (!values.searchTerm) {
    errors.searchTerm = "Please enter a username.";
  }
  return errors;
};

//validates email required, "real" email template and hs-fulda email template
export const validateEmail = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  } else if (
    !/^[a-z0-9._%+-]+\.[a-z0-9._%+-]+@informatik+\.hs-fulda+\.de$/i.test(
      values.email
    )
  ) {
    errors.email = "Invalid HS Fulda email address";
  }
  return errors;
};

//validates password and passwordConfirmation filled, length (min. 8 chars)
//and same string
export const validatePassword = (
  values,
  hasPasswordConfirmation,
  discloseRequiredChars
) => {
  const errors = {};
  if (!values.password) {
    errors.password = "Required";
  }
  if (hasPasswordConfirmation && !values.passwordConfirmation) {
    errors.passwordConfirmation = "Required";
  } else if (
    discloseRequiredChars &&
    values.password.length > 0 &&
    values.password.length < 8
  ) {
    errors.password = "At least 8 characters required";
  } else if (
    discloseRequiredChars &&
    hasPasswordConfirmation &&
    values.passwordConfirmation.length < 8
  ) {
    errors.passwordConfirmation = "At least 8 characters required";
  } else if (
    hasPasswordConfirmation &&
    values.password !== values.passwordConfirmation
  ) {
    errors.passwordConfirmation = "Not the same password";
  }
  return errors;
};

//merges validateEmail and validatePassword error objects
export const validateEmailAndPasswords = (
  values,
  hasPasswordConfirmation,
  discloseRequiredChars
) => {
  const mailErrors = validateEmail(values);
  const passwordErrors = validatePassword(
    values,
    hasPasswordConfirmation,
    discloseRequiredChars
  );
  return { ...mailErrors, ...passwordErrors };
};
