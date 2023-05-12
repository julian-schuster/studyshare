import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";

import Navbar from "../components/Navbar/Navbar";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "75%",
    height: "calc(100vh - 300px)",
    margin: "96px auto",
    paddingTop: "5px",
  },
  paperMd: {
    width: "85%",
    height: "calc(100vh - 300px)",
    margin: "96px auto",
    paddingTop: "5px",
  },
  pageTitle: {
    marginStart: "10px",
  },
  children: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 382px)",
    justifyContent: "space-between",
  },
}));

const StudyShareContainer = (props) => {
  const classes = useStyles();
  const matchesMd = useMediaQuery("(max-width:767px)");

  const { isLoggedIn, pageTitle } = props;

  return isLoggedIn ? (
    <Fragment>
      <Navbar />
      <Paper className={matchesMd ? classes.paperMd : classes.paper}>
        <Typography
          variant={matchesMd ? "h5" : "h3"}
          component={matchesMd ? "h5" : "h3"}
          gutterBottom
          align="left"
          className={classes.pageTitle}
        >
          {pageTitle}
        </Typography>
        <div className={classes.children}>{props.children}</div>
      </Paper>
    </Fragment>
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.login.isLoggedIn,
  };
};

export default connect(mapStateToProps, null)(StudyShareContainer);
