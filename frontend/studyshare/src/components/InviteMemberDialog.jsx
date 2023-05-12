import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  LinearProgress,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import { PersonAdd, Search } from "@material-ui/icons";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

import {
  setAvailableUsersDialogPageAct,
  searchUserReqAct,
  resetAvailableUsersAct,
} from "../actions/groupActions";
import { validateSearchTerm } from "../helpers/validationHelper";
import UserList from "./UserList";
import StudySharePlaceholder from "./StudySharePlaceholder";

const useStyles = makeStyles((theme) => ({
  pagination: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  searchBar: {
    display: "flex",
    width: "100%",
  },
  searchInput: {
    marginTop: "9px",
    width: "100%",
  },
  searchButton: {
    minWidth: "50px",
  },
}));

const InviteMemberDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    const { resetAvailableUsersAct } = props;
    resetAvailableUsersAct();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    const { setDialogPageAct, userId, searchTerm, loginToken } = props;
    setDialogPageAct(userId, loginToken, searchTerm, newPage);
  };

  const handleSearch = (searchTerm) => {
    const { searchUserReqAct, userId, loginToken } = props;
    searchUserReqAct(userId, loginToken, searchTerm, 1);
  };

  const noUsersFound = () => {
    const { availableUsers, searchTerm, isLoading } = props;
    return availableUsers.length === 0 && searchTerm !== "" && !isLoading;
  };

  const {
    isLoading,
    availableUsers,
    totalPagesAvailableUsers,
    targetGroupId,
  } = props;
  return (
    <Fragment>
      <Tooltip title="Invite a user">
        <IconButton edge="end" aria-label="add" onClick={handleClickOpen}>
          <PersonAdd />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth={false}
        scroll="body"
      >
        <DialogTitle id="form-dialog-title">Invite a user</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Type in the name of the user you want to invite.
          </DialogContentText>
          <Formik
            initialValues={{
              searchTerm: "",
            }}
            validate={(values) => validateSearchTerm(values)}
            onSubmit={(values) => {
              handleSearch(values.searchTerm);
            }}
          >
            {({ submitForm }) => (
              <Form>
                <div className={classes.searchBar}>
                  <Field
                    className={classes.searchInput}
                    component={TextField}
                    name="searchTerm"
                    type="text"
                    placeholder="Search user name"
                    disabled={isLoading}
                    autoFocus={true}
                  />
                  <IconButton
                    className={classes.searchButton}
                    aria-label="delete"
                    color="primary"
                    style={{ textTransform: "none" }}
                    disabled={isLoading}
                    onClick={submitForm}
                  >
                    <Search />
                  </IconButton>
                </div>
                {isLoading && <LinearProgress />}
                <UserList
                  inviteToGroup={targetGroupId}
                  listItems={availableUsers}
                  isLoading={isLoading}
                />
                {noUsersFound() && (
                  <StudySharePlaceholder
                    heading="No matching user found."
                    subheading="This user does not exist. Did you check for typos?"
                  />
                )}
                <Pagination
                  count={totalPagesAvailableUsers}
                  defaultPage={1}
                  color="primary"
                  onChange={handleChangePage}
                  className={classes.pagination}
                />
              </Form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" disabled={false}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    totalPagesAvailableUsers: state.groups.totalPagesAvailableUsers,
    loginToken: state.login.loginToken,
    userId: state.login.userId,
    isLoading: state.groups.isSearchingUser,
    availableUsers: state.groups.availableUsers,
    searchTerm: state.groups.searchTerm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchUserReqAct: (id, loginToken, searchTerm, page) =>
      dispatch(searchUserReqAct(id, loginToken, searchTerm, page)),
    setDialogPageAct: (userId, loginToken, searchTerm, page) =>
      dispatch(
        setAvailableUsersDialogPageAct(userId, loginToken, searchTerm, page)
      ),
    resetAvailableUsersAct: () => dispatch(resetAvailableUsersAct()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InviteMemberDialog);
