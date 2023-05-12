import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import { Publish } from "@material-ui/icons";

import {
  getFilesReqAct,
  setInventoryListPageAct,
} from "../actions/inventoryActions";
import InventoryList from "./InventoryList";

const useStyles = makeStyles((theme) => ({
  pagination: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));

const FileSelectionDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleGetInventoryFiles = () => {
    const { getFilesReqAct, userId, loginToken } = props;
    getFilesReqAct(userId, loginToken, 1);
  };

  const handleClickOpen = () => {
    handleGetInventoryFiles();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    const { setDialogPageAct, userId, loginToken } = props;
    setDialogPageAct(userId, loginToken, newPage);
  };

  const { fileList, isLoading, totalPages, targetGroupId } = props;
  return (
    <div>
      <Tooltip title="Publish a file">
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleClickOpen}
          style={{ float: "right", marginInlineEnd: "10px" }}
          disabled={false}
        >
          <Publish />
        </Fab>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth={false}
        scroll="body"
      >
        <DialogTitle id="form-dialog-title">Publish a file</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Below you can select a file from your inventory to publish to this
            group.
          </DialogContentText>
          <InventoryList
            listItems={fileList}
            isGettingGroups={isLoading}
            targetGroupId={targetGroupId}
            myInventory
            canPublish
          />
          <Pagination
            count={totalPages}
            defaultPage={1}
            color="primary"
            onChange={handleChangePage}
            className={classes.pagination}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" disabled={false}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fileList: state.inventory.fileList,
    totalPages: state.inventory.totalPages,
    loginToken: state.login.loginToken,
    userId: state.login.userId,
    isLoading:
      state.inventory.isGettingFiles ||
      state.group.isPublishingFile ||
      state.group.isDeletingFile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFilesReqAct: (id, loginToken, page) =>
      dispatch(getFilesReqAct(id, loginToken, page)),
    setDialogPageAct: (userId, loginToken, page) =>
      dispatch(setInventoryListPageAct(userId, loginToken, page)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileSelectionDialog);
