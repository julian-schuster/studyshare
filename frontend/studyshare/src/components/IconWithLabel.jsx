import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: "2px 0",
  },
  children: {
    marginRight: "10px",
  },
}));

export default function IconWithLabel(props) {
  const classes = useStyles();
  const { label, variant, children } = props;
  return (
    <div className={classes.root}>
      <div className={classes.children}>{children}</div>
      <Typography variant={variant} gutterBottom>
        {label}
      </Typography>
    </div>
  );
}
