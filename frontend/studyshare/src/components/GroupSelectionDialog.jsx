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
import { List } from "@material-ui/icons";

import {
  showAvailableGroupsReqAct,
  setAvailableGroupsDialogPageAct,
} from "../actions/groupActions";
import GroupList from "./GroupList";

const useStyles = makeStyles((theme) => ({
  pagination: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));

const GroupSelectionDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleShowGroups = () => {
    const { showAvailableGroupsReqAct, userId, loginToken } = props;
    showAvailableGroupsReqAct(userId, loginToken, 1);
  };

  const handleClickOpen = () => {
    handleShowGroups();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    const { setDialogPageAct, userId, loginToken } = props;
    setDialogPageAct(userId, loginToken, newPage);
  };

  const { allGroups, isLoading, totalPagesAllGroups } = props;
  return (
    <div>
      <Tooltip title="Join a group">
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleClickOpen}
          style={{ float: "right", marginInlineEnd: "10px" }}
          disabled={false}
        >
          <List />
        </Fab>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth={false}
        scroll="body"
      >
        <DialogTitle id="form-dialog-title">Join a group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Below you can find all existing groups you can join.
          </DialogContentText>
          <GroupList
            listItems={allGroups}
            isGettingGroups={isLoading}
            canJoin
          />
          <Pagination
            count={totalPagesAllGroups}
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
    allGroups: state.groups.allGroups,
    totalPagesAllGroups: state.groups.totalPagesAllGroups,
    loginToken: state.login.loginToken,
    userId: state.login.userId,
    isLoading: state.groups.isGettingAllGroups || state.groups.isJoiningGroup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showAvailableGroupsReqAct: (id, loginToken, page) =>
      dispatch(showAvailableGroupsReqAct(id, loginToken, page)),
    setDialogPageAct: (userId, loginToken, page) =>
      dispatch(setAvailableGroupsDialogPageAct(userId, loginToken, page)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupSelectionDialog);
