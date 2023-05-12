import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
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
  useMediaQuery,
} from "@material-ui/core";
import { ExitToApp, Delete, PersonAdd, Folder } from "@material-ui/icons";

import StudySharePlaceholder from "./StudySharePlaceholder";
import ListRowSkeleton from "./ListRowSkeleton";
import ConfirmationDialog from "./ConfirmationDialog";
import InviteMemberDialog from "./InviteMemberDialog";
import {
  joinGroupReqAct,
  deleteGroupReqAct,
  leaveGroupReqAct,
} from "../actions/groupActions";
import { formatIsoDate } from "../helpers/formatHelper";
import { PAGINATION } from "../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: "calc(100% - 56px)",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: "0 10px",
  },
  list: {
    height: "100%",
    overflowY: "auto",
  },
  listItemTitle: {
    maxWidth: "100%",
  },
  listItemTitleSm: {
    maxWidth: "80%",
  },
  skeleton: {
    justifyContent: "space-between",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  otherListItems: {
    display: "flex",
    width: "200px",
  },
  listItem: {
    width: "calc(100% - 50px)",
  },
}));

const GroupList = (props) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isLeaveDialogOpen, setLeaveDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const classes = useStyles();
  const matchesMd = useMediaQuery("(max-width:767px)");
  const matchesSm = useMediaQuery("(max-width:515px)");
  const history = useHistory();
  const {
    listItems,
    isGettingGroups,
    canJoin,
    canInvite,
    canLeave,
    canDelete,
    userId,
    loginToken,
    joinGroupReqAct,
    deleteGroupReqAct,
    leaveGroupReqAct,
  } = props;

  const getResponsiveTitleItemStyling = () => {
    if (matchesSm) {
      return classes.listItemTitleSm;
    } else {
      return classes.listItemTitle;
    }
  };

  const handleShow = (id) => history.push(`/group/${id}`);

  const handleJoin = (id) => joinGroupReqAct(userId, loginToken, id);

  const handleLeave = (id) => leaveGroupReqAct(userId, loginToken, id);

  const handleDelete = (id) => deleteGroupReqAct(userId, loginToken, id);

  const isOwner = (groupOwnerId) => groupOwnerId === userId;

  const updateSelectedAndOpenDialog = (id, key) => {
    setSelectedId(id);
    switch (key) {
      case "DELETE":
        setDeleteDialogOpen(true);
        break;
      case "LEAVE":
        setLeaveDialogOpen(true);
        break;
      default:
        break;
    }
  };

  const createListItems = (listItemArray) => {
    if (isGettingGroups) {
      const { GROUPS_PER_PAGE } = PAGINATION;
      return <ListRowSkeleton rows={GROUPS_PER_PAGE} />;
    } else {
      return listItemArray.map((listItem) => {
        return (
          <Fragment>
            <ListItem
              button
              onClick={
                canJoin
                  ? () => handleJoin(listItem.id)
                  : () => handleShow(listItem.id)
              }
              key={listItem.id}
              className={classes.listItem}
            >
              {!matchesSm && (
                <ListItemAvatar>
                  <Avatar>
                    <Folder />
                  </Avatar>
                </ListItemAvatar>
              )}
              <ListItemText
                primary={listItem.title}
                secondary={listItem.description}
                className={getResponsiveTitleItemStyling()}
              />

              {!matchesMd && (
                <div className={classes.otherListItems}>
                  <ListItemText
                    primary={formatIsoDate(listItem.lastActivity)}
                    secondary={"By " + listItem.lastActive}
                  />
                  <ListItemText
                    primary={listItem.memberCount + " Members"}
                    secondary={"Owned by " + listItem.owner}
                  />
                </div>
              )}
              <ListItemSecondaryAction className={classes.listItemActions}>
                {canJoin && !isOwner(listItem.ownerid) && (
                  <Tooltip title="Join">
                    <IconButton
                      edge="end"
                      aria-label="add"
                      onClick={() => handleJoin(listItem.id)}
                    >
                      <PersonAdd />
                    </IconButton>
                  </Tooltip>
                )}
                {canInvite && isOwner(listItem.ownerid) && (
                  <InviteMemberDialog targetGroupId={listItem.id} />
                )}
                {canLeave && !isOwner(listItem.ownerid) && (
                  <Tooltip title="Leave group">
                    <IconButton
                      edge="end"
                      aria-label="leave"
                      onClick={() =>
                        updateSelectedAndOpenDialog(listItem.id, "LEAVE")
                      }
                    >
                      <ExitToApp />
                    </IconButton>
                  </Tooltip>
                )}
                {canDelete && isOwner(listItem.ownerid) && (
                  <Tooltip title="Delete group">
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() =>
                        updateSelectedAndOpenDialog(listItem.id, "DELETE")
                      }
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                )}
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </Fragment>
        );
      });
    }
  };

  return (
    <div className={classes.root}>
      <List dense={true} className={classes.list}>
        {listItems.length > 0 ? (
          <div>
            <Divider />
            {createListItems(listItems)}
          </div>
        ) : (
          <StudySharePlaceholder
            heading="You are not part of any group."
            subheading="Try joining an existing one or create your own group."
          />
        )}
      </List>
      <ConfirmationDialog
        title="Confirm group deletion"
        description="Do you really want to delete your group? All members will lose access to it."
        handleClose={() => setDeleteDialogOpen(false)}
        handleConfirm={() => handleDelete(selectedId)}
        open={isDeleteDialogOpen}
      />
      <ConfirmationDialog
        title="Confirm leaving group"
        description="Do you really want to leave this group? Attention: Your published files will remain available unless you delete them yourself beforehand."
        handleClose={() => setLeaveDialogOpen(false)}
        handleConfirm={() => handleLeave(selectedId)}
        open={isLeaveDialogOpen}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.login.userId,
    loginToken: state.login.loginToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    joinGroupReqAct: (userId, loginToken, groupId) =>
      dispatch(joinGroupReqAct(userId, loginToken, groupId)),
    deleteGroupReqAct: (userId, loginToken, groupId) =>
      dispatch(deleteGroupReqAct(userId, loginToken, groupId)),
    leaveGroupReqAct: (userId, loginToken, groupId) =>
      dispatch(leaveGroupReqAct(userId, loginToken, groupId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
