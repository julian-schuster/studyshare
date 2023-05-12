import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import StudyShareContainer from "./StudyShareContainer";
import InventoryList from "../components/InventoryList";
import FileUploadDialog from "../components/FileUploadDialog";

import { Pagination } from "@material-ui/lab";
//import { getPageCount, getPageContent } from "../helpers/paginationHelper";
import {
  setInventoryListPageAct,
  resetInventoryListPageAct,
  getFilesReqAct,
} from "../actions/inventoryActions";

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

class InventoryContainer extends Component {
  componentDidMount() {
    const { resetPageAct } = this.props;
    resetPageAct();
    this.handleGetFiles();
  }

  handleGetFiles = () => {
    const { getFilesReqAct, userId, loginToken } = this.props;
    getFilesReqAct(userId, loginToken, 1);
  };

  handleChangePage = (event, newPage) => {
    const { userId, loginToken, setPageAct } = this.props;
    setPageAct(userId, loginToken, newPage);
  };

  render() {
    return (
      <StudyShareContainer pageTitle="My Inventory">
        <InventoryList
          listItems={this.props.fileList}
          isGettingFiles={this.props.isLoading}
          myInventory
          canDelete
          canDownload
        />

        <div className={this.props.classes.bottom}>
          <Pagination
            count={this.props.totalPages}
            defaultPage={1}
            color="primary"
            onChange={this.handleChangePage}
            className={this.props.classes.pagination}
          />
          <FileUploadDialog />
        </div>
      </StudyShareContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading:
      state.inventory.isUploadingFile || state.inventory.isGettingFiles,
    page: state.inventory.page,
    totalPages: state.inventory.totalPages,
    fileList: state.inventory.fileList,
    userId: state.login.userId,
    loginToken: state.login.loginToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageAct: (userId, loginToken, page) =>
      dispatch(setInventoryListPageAct(userId, loginToken, page)),
    resetPageAct: () => dispatch(resetInventoryListPageAct()),
    getFilesReqAct: (userId, loginToken, page) =>
      dispatch(getFilesReqAct(userId, loginToken, page)),
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(InventoryContainer)
);
