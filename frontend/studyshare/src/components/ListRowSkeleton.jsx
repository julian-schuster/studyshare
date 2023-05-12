import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, Divider } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  skeleton: {
    justifyContent: "space-between",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
}));

const createSkeleton = (rows, styling) => {
  let res = [];
  for (let i = 0; i < rows; i++) {
    res.push(
      <Fragment>
        <ListItem button className={styling} id={i}>
          <Skeleton animation="wave" variant="circle" width={40} height={40} />
          <Skeleton animation="wave" variant="rect" width={"95%"} height={40} />
        </ListItem>
        <Divider />
      </Fragment>
    );
  }
  return <Fragment>{res}</Fragment>;
};

const ListRowSkeleton = (props) => {
  const classes = useStyles();
  const { rows } = props;

  return <Fragment>{createSkeleton(rows, classes.skeleton)}</Fragment>;
};

export default ListRowSkeleton;
