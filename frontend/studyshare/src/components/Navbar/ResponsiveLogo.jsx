import { React } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

import logo from "../../img/logo.png";
import logoMobile from "../../img/logo-mobile.png";

const useStyles = makeStyles((theme) => ({
  logo: {
    width: "450px",
    height: "96px",
  },
  logoMobile: {
    height: "96px",
  },
}));

export const ResponsiveLogo = () => {
  const classes = useStyles();
  const matches = useMediaQuery("(max-width:650px)");
  return matches ? (
    <img className={classes.logoMobile} src={logoMobile} alt="logoMobile" />
  ) : (
    <img className={classes.logo} src={logo} alt="logo" />
  );
};
