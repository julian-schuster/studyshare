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
  useMediaQuery,
} from "@material-ui/core";
import { Delete, InsertDriveFile, Publish, GetApp } from "@material-ui/icons";

import { formatIsoDate, shortenString } from "../helpers/formatHelper";
import { PAGINATION, INVENTORY_LIST_MAX_STRING_LENGTH } from "../constants";
import ListRowSkeleton from "./ListRowSkeleton";
import StudySharePlaceholder from "./StudySharePlaceholder";

import {
  publishFileToGroupReqAct,
  deleteFileFromGroupReqAct,
  downloadFileFromGroupReqAct,
} from "../actions/groupDetailActions";

import {
  deleteFileFromInventoryReqAct,
  downloadFileFromInventoryReqAct,
} from "../actions/inventoryActions";

const useStyles = makeStyles((theme) => ({
  rootInventory: {
    maxHeight: "calc(100% - 56px)",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: "0 10px",
  },
  rootGroupDetails: {
    maxHeight: "calc(100% - 213px)",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: "0 10px",
  },
  list: {
    height: "100%",
    overflowY: "auto",
  },
  fileName: {
    width: "50%",
  },
  uploadDate: {
    width: "25%",
  },
  fileSize: {
    width: "25%",
  },
  skeleton: {
    justifyContent: "space-between",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
}));

const InventoryList = (props) => {
  const classes = useStyles();
  const matchesMd = useMediaQuery("(max-width:767px)");
  const matchesSm = useMediaQuery("(max-width:515px)");
  const { listItems, userId } = props;

  const handlePublish = (id) => {
    const {
      publishFileToGroupReqAct,
      userId,
      loginToken,
      targetGroupId,
    } = props;
    publishFileToGroupReqAct(userId, loginToken, targetGroupId, id);
  };

  const handleDownload = (id) => {
    const {
      downloadFileFromGroupReqAct,
      downloadFileFromInventoryReqAct,
      userId,
      loginToken,
      targetGroupId,
      myInventory,
    } = props;
    if (!myInventory) {
      downloadFileFromGroupReqAct(userId, loginToken, targetGroupId, id);
    } else {
      downloadFileFromInventoryReqAct(userId, loginToken, id);
    }
  };

  const handleDelete = (id) => {
    const {
      deleteFileFromGroupReqAct,
      deleteFileFromInventoryReqAct,
      userId,
      loginToken,
      targetGroupId,
      myInventory,
    } = props;
    if (!myInventory) {
      deleteFileFromGroupReqAct(userId, loginToken, targetGroupId, id);
    } else if (myInventory) {
      deleteFileFromInventoryReqAct(userId, loginToken, id);
    }
  };

  const isOwner = (groupOwnerId) => {
    const { myInventory } = props;
    return groupOwnerId === userId || myInventory;
  };

  const createListItems = (listItemArray) => {
    const { canPublish, canDelete, canDownload, myInventory } = props;
    return listItemArray.map((listItem) => {
      return (
        <Fragment>
          <ListItem button key={listItem.fileid}>
            {!matchesSm && (
              <ListItemAvatar>
                <Avatar>
                  <InsertDriveFile />
                </Avatar>
              </ListItemAvatar>
            )}
            <ListItemText
              primary={
                listItem.filename.length > INVENTORY_LIST_MAX_STRING_LENGTH
                  ? shortenString(
                      listItem.filename,
                      INVENTORY_LIST_MAX_STRING_LENGTH
                    )
                  : listItem.filename
              }
              className={classes.fileName}
            />
            {!matchesMd && (
              <ListItemText
                className={classes.uploadDate}
                primary={"File added on " + formatIsoDate(listItem.created_at)}
              />
            )}
            {!matchesMd && (
              <ListItemText
                className={classes.fileSize}
                primary={
                  myInventory ? listItem.filesize : `${listItem.filesize} B`
                }
              />
            )}
            <ListItemSecondaryAction>
              {canDownload && (
                <IconButton
                  edge="end"
                  aria-label="download"
                  onClick={() => handleDownload(listItem.fileid)}
                >
                  <GetApp />
                </IconButton>
              )}
              {canDelete && isOwner(listItem.fileownerid) && (
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(listItem.fileid)}
                >
                  <Delete />
                </IconButton>
              )}
              {canPublish && (
                <IconButton
                  edge="end"
                  aria-label="publish"
                  onClick={() => handlePublish(listItem.fileid)}
                >
                  <Publish />
                </IconButton>
              )}
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </Fragment>
      );
    });
  };

  return (
    <div
      className={
        props.myInventory ? classes.rootInventory : classes.rootGroupDetails
      }
    >
      <List dense={true} className={classes.list}>
        {props.isGettingFiles && (
          <ListRowSkeleton rows={PAGINATION.FILES_PER_PAGE} />
        )}

        {!props.isGettingFiles &&
          props.listItems.length > 0 && <Divider /> &&
          createListItems(listItems)}
        {!props.isGettingFiles && props.listItems.length === 0 && (
          <StudySharePlaceholder
            heading={
              props.myInventory
                ? "Your inventory is empty."
                : "This group has no files yet."
            }
            subheading="Try uploading a new file."
          />
        )}
      </List>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    userId: state.login.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    publishFileToGroupReqAct: (userId, loginToken, groupId, fileId) =>
      dispatch(publishFileToGroupReqAct(userId, loginToken, groupId, fileId)),
    downloadFileFromGroupReqAct: (userId, loginToken, groupId, fileId) =>
      dispatch(
        downloadFileFromGroupReqAct(userId, loginToken, groupId, fileId)
      ),
    deleteFileFromGroupReqAct: (userId, loginToken, groupId, fileId) =>
      dispatch(deleteFileFromGroupReqAct(userId, loginToken, groupId, fileId)),
    deleteFileFromInventoryReqAct: (userId, loginToken, fileId) =>
      dispatch(deleteFileFromInventoryReqAct(userId, loginToken, fileId)),
    downloadFileFromInventoryReqAct: (userId, loginToken, fileId) =>
      dispatch(downloadFileFromInventoryReqAct(userId, loginToken, fileId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryList);
