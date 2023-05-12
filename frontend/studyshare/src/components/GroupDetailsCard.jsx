import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Avatar, useMediaQuery } from "@material-ui/core";
import { PeopleAlt, Person, Today, NewReleases } from "@material-ui/icons";

import IconWithLabel from "../components/IconWithLabel";
import { formatIsoDate } from "../helpers/formatHelper";
import { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
  },
  rootMd: {
    padding: "5px",
    margin: "5px",
  },
  description: {
    textAlign: "start",
  },
  stats: { display: "flex", textAlign: "start" },
  left: {
    marginRight: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  right: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  iconWithLabel: {
    marginBottom: "5px",
  },
  typographySm: {
    backgroundColor: "#66cc33",
    borderRadius: "5px",
    marginBottom: "2px",
  },
}));

const GroupDetailsCard = (props) => {
  const classes = useStyles();
  const matchesMd = useMediaQuery("(max-width:1199px)");
  const matchesSm = useMediaQuery("(max-width:575px)");

  const findOwner = (memberArray) => {
    if (memberArray !== undefined) {
      return memberArray.find((memberItem) => memberItem.role === 0).firstname;
    }
  };

  const {
    isLoading,
    description,
    createdAt,
    lastActivity,
    lastActive,
    members,
  } = props;
  return (
    <div className={matchesMd ? classes.rootMd : classes.root}>
      <Typography variant="h6" gutterBottom className={classes.description}>
        {isLoading ? "" : description}
      </Typography>
      <div className={classes.stats}>
        <div className={classes.left}>
          {matchesSm ? (
            <Fragment>
              <Typography className={classes.typographySm}>{`Owned by ${
                isLoading ? "" : findOwner(members)
              }`}</Typography>
              <Typography className={classes.typographySm}>{`Created on ${
                isLoading ? "" : formatIsoDate(createdAt)
              }`}</Typography>
            </Fragment>
          ) : (
            <Fragment>
              {" "}
              <IconWithLabel
                variant="h6"
                label={`Owned by ${isLoading ? "" : findOwner(members)}`}
              >
                <Avatar>
                  <Person />
                </Avatar>
              </IconWithLabel>
              <IconWithLabel
                variant="h6"
                label={`Created on ${
                  isLoading ? "" : formatIsoDate(createdAt)
                }`}
              >
                <Avatar>
                  <Today />
                </Avatar>
              </IconWithLabel>
            </Fragment>
          )}
        </div>
        <div className={classes.right}>
          {matchesSm ? (
            <Fragment>
              <Typography className={classes.typographySm}>{`${
                isLoading || members === undefined ? 0 : members.length
              } Member(s)`}</Typography>
              <Typography className={classes.typographySm}>{`${
                isLoading ? "" : formatIsoDate(lastActivity, true)
              } (${isLoading ? "" : lastActive})`}</Typography>
            </Fragment>
          ) : (
            <Fragment>
              <IconWithLabel
                variant="h6"
                label={`${
                  isLoading || members === undefined ? 0 : members.length
                } Member(s)`}
              >
                <Avatar>
                  <PeopleAlt />
                </Avatar>
              </IconWithLabel>

              <IconWithLabel
                variant="h6"
                label={`${
                  isLoading ? "" : formatIsoDate(lastActivity, true)
                } (${isLoading ? "" : lastActive})`}
              >
                <Avatar>
                  <NewReleases />{" "}
                </Avatar>
              </IconWithLabel>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupDetailsCard;
