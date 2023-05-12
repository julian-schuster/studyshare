import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import LogInForm from "../components/LogInForm";
import SignUpForm from "../components/SignUpForm";
import background from "../img/bg.jpg";
import Navbar from "../components/Navbar/Navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: "100vh",
    width: "100vw",
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center, center",
  },
  login: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto auto",
    width: "30%",
    zIndex: 1,
    display: "flex",
  },
  loginMd: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto auto",
    width: "70%",
    zIndex: 1,
    display: "flex",
  },
  loginSm: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto auto",
    width: "90%",
    zIndex: 1,
    display: "flex",
  },
}));

const LogInContainer = (props) => {
  const classes = useStyles();
  const matchesSm = useMediaQuery("(max-width:650px)");
  const matchesMd = useMediaQuery("(min-width:651px) and (max-width:1080px)");

  const getSize = () => {
    if (matchesSm) {
      return classes.loginSm;
    } else if (matchesMd) {
      return classes.loginMd;
    } else return classes.login;
  };

  const { isSignedUp, isLoggedIn } = props;
  return (
    <div className={classes.root}>
      <Navbar />
      {isLoggedIn ? (
        <Redirect to={{ pathname: "/groups" }} />
      ) : (
        <div className={getSize()}>
          {isSignedUp ? <LogInForm /> : <SignUpForm />}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.login.isLoggedIn,
  };
};

export default connect(mapStateToProps, null)(LogInContainer);
