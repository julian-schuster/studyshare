import React, { Fragment } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Avatar,
  ListItemAvatar,
  ListItemSecondaryAction,
  Tooltip,
} from "@material-ui/core";
import { Person, PersonAdd } from "@material-ui/icons";
import ListRowSkeleton from "./ListRowSkeleton";
import { PAGINATION } from "../constants";
import { inviteUserReqAct } from "../actions/groupActions";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    minWidth: "1000px",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: "0 10px",
  },
  listItem: {
    maxWidth: "29%",
  },
  skeleton: {
    justifyContent: "space-between",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  list: {
    height: "100%",
  },
}));

const UserList = (props) => {
  const classes = useStyles();

  const handleInvite = (id) => {
    const { inviteUserReqAct, userId, loginToken, inviteToGroup } = props;
    inviteUserReqAct(userId, loginToken, id, inviteToGroup);
  };

  const { isLoading, isInvitingUser } = props;
  const renderListItems = (listArray) => {
    if (isLoading) {
      const { USERS_PER_PAGE } = PAGINATION;
      return <ListRowSkeleton rows={USERS_PER_PAGE} />;
    } else {
      return listArray.map((listItem) => {
        return (
          <Fragment>
            <ListItem
              button
              onClick={() => handleInvite(listItem.id)}
              key={listItem.id}
            >
              <ListItemAvatar>
                <Avatar>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={listItem.firstname}
                className={classes.listItem}
              />
              <ListItemText
                primary={listItem.lastname}
                className={classes.listItem}
              />

              <ListItemSecondaryAction className={classes.listItem}>
                <Tooltip title="Invite">
                  <IconButton
                    edge="end"
                    aria-label="add"
                    onClick={() => handleInvite(listItem.id)}
                    disabled={isInvitingUser}
                  >
                    <PersonAdd />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </Fragment>
        );
      });
    }
  };

  const { listItems } = props;
  return (
    <List dense={true} className={classes.list}>
      {listItems.length > 0 && (
        <div>
          <Divider />
          {renderListItems(listItems)}
        </div>
      )}
    </List>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.login.userId,
    loginToken: state.login.loginToken,
    isInvitingUser: state.groups.isInvitingUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    inviteUserReqAct: (userId, loginToken, receiverId, groupId) =>
      dispatch(inviteUserReqAct(userId, loginToken, receiverId, groupId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
