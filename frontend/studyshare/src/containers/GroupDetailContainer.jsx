import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import StudyShareContainer from "./StudyShareContainer";
import FileSelectionDialog from "../components/FileSelectionDialog";
import GroupDetailsCard from "../components/GroupDetailsCard";
import InventoryList from "../components/InventoryList";

import {
  getGroupDetailsReqAct,
  getGroupFilesReqAct,
} from "../actions/groupDetailActions";

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

class GroupDetailContainer extends Component {
  componentDidMount() {
    this.handleGetGroupDetails();
    this.handleGetGroupFiles();
  }

  handleGetGroupDetails = () => {
    const { getGroupDetailsReqAct, userId, loginToken } = this.props;
    const { id } = this.props.match.params;
    getGroupDetailsReqAct(userId, loginToken, id);
  };

  handleGetGroupFiles = () => {
    const { getGroupFilesReqAct, userId, loginToken } = this.props;
    const { id } = this.props.match.params;
    getGroupFilesReqAct(userId, loginToken, id);
  };

  //   handleChangePage = (event, newPage) => {
  //     const { setPageAct, userId, loginToken } = this.props;
  //     setPageAct(userId, loginToken, newPage);
  //   };

  render() {
    const {
      isGettingGroupDetails,
      isGettingGroupFiles,
      groupFiles,
    } = this.props;
    const {
      title,
      description,
      createdAt,
      lastActivity,
      lastActive,
      members,
    } = this.props.groupDetails;
    const { id } = this.props.match.params;
    return (
      <StudyShareContainer pageTitle={isGettingGroupDetails ? "Group" : title}>
        <GroupDetailsCard
          isLoading={isGettingGroupDetails}
          description={description}
          createdAt={createdAt}
          lastActivity={lastActivity}
          lastActive={lastActive}
          members={members}
        />
        <InventoryList
          listItems={groupFiles}
          isGettingFiles={isGettingGroupFiles}
          targetGroupId={id}
          myInventory={false}
          canDelete
          canDownload
        />

        <div className={this.props.classes.bottom}>
          <Pagination
            //count={this.props.totalPages}
            defaultPage={1}
            color="primary"
            //onChange={this.handleChangePage}
            className={this.props.classes.pagination}
          />
          <FileSelectionDialog targetGroupId={id} />
        </div>
      </StudyShareContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // totalPages: state.groups.totalPages,
    loginToken: state.login.loginToken,
    userId: state.login.userId,
    groupDetails: state.group.groupDetails,
    isGettingGroupDetails: state.group.isGettingGroupDetails,
    isGettingGroupFiles: state.group.isGettingGroupFiles,
    groupFiles: state.group.groupFiles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGroupDetailsReqAct: (id, loginToken, groupId) =>
      dispatch(getGroupDetailsReqAct(id, loginToken, groupId)),
    getGroupFilesReqAct: (id, loginToken, groupId) =>
      dispatch(getGroupFilesReqAct(id, loginToken, groupId)),
    // setPageAct: (userId, loginToken, page) =>
    //   dispatch(setGroupListPageAct(userId, loginToken, page)),
  };
};

export default withRouter(
  withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(GroupDetailContainer)
  )
);
