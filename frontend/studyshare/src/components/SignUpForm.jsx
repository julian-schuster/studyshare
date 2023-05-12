import React from "react";
import { connect } from "react-redux";

import {
  Paper,
  withStyles,
  Grid,
  Button,
  FormGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText,
  Typography,
  LinearProgress,
  Divider,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Face, Fingerprint } from "@material-ui/icons";
import { TextField, Checkbox } from "formik-material-ui";
import { Formik, Form, Field } from "formik";

import { signUpReq } from "../actions/logInActions";
import { validateEmailAndPasswords } from "../helpers/validationHelper";

const styles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: "auto auto",
  },
  options: {
    marginTop: theme.spacing(1),
    marginBottom: 0,
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  formControl: {
    marginTop: theme.spacing(6),
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
  link: {
    color: "gray",
    textDecoration: "none",
  },
});

class LogInForm extends React.Component {
  handleLogin = () => {
    const { signUp, userEmail, password, passwordConfirmation } = this.props;
    if (userEmail != null && password != null) {
      signUp(userEmail, password, passwordConfirmation);
    }
  };

  validateCheckboxes = (values) => {
    return values.privacyPolicy && values.termsOfService;
  };

  displayHelperText = (values) => {
    if (!this.validateCheckboxes(values)) {
      return (
        <FormHelperText>Please agree with the conditions above</FormHelperText>
      );
    }
  };

  render() {
    const { classes, isSigningUp } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography variant="h4" component="h4" gutterBottom>
          Sign Up
        </Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
            passwordConfirmation: "",
            privacyPolicy: false,
            termsOfService: false,
          }}
          validate={(values) => validateEmailAndPasswords(values, true, true)}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            if (this.validateCheckboxes(values)) {
              const { signUp } = this.props;
              setSubmitting(true);
              signUp(
                values.email,
                values.password,
                values.passwordConfirmation
              );
              resetForm();
            } else {
              setSubmitting(false);
            }
          }}
        >
          {({ values, submitForm }) => (
            <Form>
              <Grid
                container
                spacing={4}
                alignItems="flex-end"
                justify="center"
              >
                <Grid item>
                  <Face />
                </Grid>
                <Grid item>
                  <Field
                    component={TextField}
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="max.muster@informatik.hs-fulda.de"
                    disabled={isSigningUp}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={4}
                alignItems="flex-end"
                justify="center"
              >
                <Grid item>
                  <Fingerprint />
                </Grid>
                <Grid item>
                  <Field
                    component={TextField}
                    type="password"
                    label="Password"
                    name="password"
                    disabled={isSigningUp}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={4}
                alignItems="flex-end"
                justify="center"
              >
                <Grid item>
                  <Fingerprint />
                </Grid>
                <Grid item>
                  <Field
                    component={TextField}
                    type="password"
                    label="Confirm Password"
                    name="passwordConfirmation"
                    disabled={isSigningUp}
                  />
                </Grid>
              </Grid>
              <FormControl
                required
                error={!this.validateCheckboxes(values)}
                component="fieldset"
                className={classes.formControl}
              >
                <FormLabel component="legend">
                  {"Privacy Policy & Terms of Service"}
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Field
                        component={Checkbox}
                        type="checkbox"
                        name="privacyPolicy"
                        disabled={isSigningUp}
                      />
                    }
                    label="I agree with the Privacy Policy."
                  />
                  <FormControlLabel
                    control={
                      <Field
                        component={Checkbox}
                        type="checkbox"
                        name="termsOfService"
                        disabled={isSigningUp}
                      />
                    }
                    label="I agree with the Terms of Service."
                  />
                </FormGroup>
                {this.displayHelperText(values)}
              </FormControl>
              <Grid container justify="center" style={{ marginTop: "10px" }}>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ textTransform: "none" }}
                    className={classes.button}
                    disabled={isSigningUp}
                    onClick={submitForm}
                  >
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
              {isSigningUp && <LinearProgress />}
              <Divider variant="middle" className={classes.divider} />
              <Grid container justify="center">
                <Grid item>
                  <Link to="/login" className={classes.link}>
                    Log In
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSigningUp: state.login.isSigningUp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (email, password, passwordConfirmation) =>
      dispatch(signUpReq(email, password, passwordConfirmation)),
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(LogInForm)
);
