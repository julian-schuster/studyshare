import React from "react";
import { Paper, withStyles, Grid, Typography } from "@material-ui/core";
import { Face, Fingerprint } from "@material-ui/icons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress, Divider } from "@material-ui/core";
import { TextField } from "formik-material-ui";

import { logInReqAct } from "../actions/logInActions";
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
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(2),
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
  handleLogin = (userEmail, password) => {
    const { login } = this.props;
    if (userEmail != null && password != null) {
      login(userEmail, password);
    }
  };

  render() {
    const { classes, isLoggingIn } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography variant="h4" component="h4" gutterBottom>
          Login
        </Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={(values) => validateEmailAndPasswords(values, false, false)}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            this.handleLogin(values.email, values.password);
            resetForm();
          }}
        >
          {({ submitForm }) => (
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
                    disabled={isLoggingIn}
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
                    disabled={isLoggingIn}
                  />
                </Grid>
              </Grid>
              <Grid container justify="center" style={{ marginTop: "10px" }}>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ textTransform: "none" }}
                    className={classes.button}
                    disabled={isLoggingIn}
                    onClick={submitForm}
                  >
                    Log In
                  </Button>
                </Grid>
              </Grid>
              {isLoggingIn && <LinearProgress />}
              <Divider variant="middle" className={classes.divider} />
              <Grid container justify="center">
                <Grid item>
                  <Link to="/signup" className={classes.link}>
                    Sign Up
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
    isLoggingIn: state.login.isLoggingIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(logInReqAct(email, password)),
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(LogInForm)
);
