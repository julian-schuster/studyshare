import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import StudyShareContainer from "./StudyShareContainer";
import GroupList from "../components/GroupList";
import GroupCreationDialog from "../components/GroupCreationDialog";
import GroupSelectionDialog from "../components/GroupSelectionDialog";

import { showGroupsReqAct, setGroupListPageAct } from "../actions/groupActions";

import { Pagination } from "@material-ui/lab";

const styles = (theme) => ({
  bottom: {
    display: "flex",
  },
  pagination: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
});

class GroupsContainer extends Component {
  componentDidMount() {
    this.handleShowGroups();
  }

  handleShowGroups = () => {
    const { showGroupsReqAct, userId, loginToken } = this.props;
    showGroupsReqAct(userId, loginToken, 1);
  };

  handleChangePage = (event, newPage) => {
    const { setPageAct, userId, loginToken } = this.props;
    setPageAct(userId, loginToken, newPage);
  };

  render() {
    return (
      <StudyShareContainer pageTitle="My Groups">
        <GroupList
          listItems={this.props.groups}
          isGettingGroups={this.props.isLoading}
          canInvite
          canLeave
          canDelete
        />
        <div className={this.props.classes.bottom}>
          <Pagination
            count={this.props.totalPages}
            defaultPage={1}
            color="primary"
            onChange={this.handleChangePage}
            className={this.props.classes.pagination}
          />
          <GroupSelectionDialog />
          <GroupCreationDialog />
        </div>
      </StudyShareContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    groups: state.groups.groups,
    totalPages: state.groups.totalPages,
    loginToken: state.login.loginToken,
    userId: state.login.userId,
    isLoading: state.groups.isCreatingGroup || state.groups.isGettingGroups,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showGroupsReqAct: (id, loginToken, page) =>
      dispatch(showGroupsReqAct(id, loginToken, page)),
    setPageAct: (userId, loginToken, page) =>
      dispatch(setGroupListPageAct(userId, loginToken, page)),
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(GroupsContainer)
);
