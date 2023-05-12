import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Tooltip,
  useMediaQuery,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { DropzoneArea } from "material-ui-dropzone";

import { uploadFileReqAct } from "../actions/inventoryActions";
import { MAX_UPLOAD_SIZE_BYTE } from "../constants";

const FileUploadDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState(null);

  const matchesMd = useMediaQuery("(max-width:768px)");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const { uploadFileReqAct, userId, loginToken } = props;
    uploadFileReqAct(userId, loginToken, file);
    handleClose();
  };

  const { isUploadingFile } = props;

  return (
    <div>
      <Tooltip title="Upload a file">
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleClickOpen}
          style={{ float: "right", marginInlineEnd: "10px" }}
          disabled={isUploadingFile}
        >
          <Add />
        </Fab>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Upload file</DialogTitle>
        <DialogContent>
          <DropzoneArea
            onChange={(files) => setFile(files)}
            filesLimit={1}
            maxFileSize={MAX_UPLOAD_SIZE_BYTE}
            showAlerts={!matchesMd}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            disabled={isUploadingFile}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={isUploadingFile}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isUploadingFile: state.inventory.isUploadingFile,
    userId: state.login.userId,
    loginToken: state.login.loginToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadFileReqAct: (userId, loginToken, file) =>
      dispatch(uploadFileReqAct(userId, loginToken, file)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUploadDialog);
