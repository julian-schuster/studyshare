import React from "react";
import { connect } from "react-redux";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Tooltip,
  FormControl,
  FormControlLabel,
  Input,
  InputAdornment,
  InputLabel,
  Switch,
  useMediaQuery,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

import {
  createGroupReq,
  changeGroupCreationValue,
  clearGroupCreationValues,
} from "../actions/groupActions";
import { INPUT_KEYS_CREATE_GROUP } from "../types/groupTypes";
import { MAX_UPLOAD_SIZE_MBYTE } from "../constants";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fab: { float: "right", marginInlineEnd: "10px" },
  inputContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  switchPublic: { margin: 0 },
  formControl: { maxWidth: "45%" },
}));

const GroupCreationDialog = (props) => {
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();
  const matchesSm = useMediaQuery("(max-width:515px)");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    const { clearGroupCreationValues } = props;
    clearGroupCreationValues();
    setOpen(false);
  };

  const handleSubmit = () => {
    const {
      createGroupReq,
      userId,
      loginToken,
      groupName,
      groupDescription,
      fileCountLimit,
      fileSizeLimit,
      isGroupPublic,
    } = props;
    createGroupReq(
      userId,
      loginToken,
      groupName,
      groupDescription,
      fileCountLimit,
      fileSizeLimit,
      isGroupPublic
    );
    handleClose();
  };

  const handleInputChange = (inputKey, value) => {
    const { changeGroupCreationValue } = props;
    changeGroupCreationValue(inputKey, value);
  };

  const {
    groupName,
    isGroupPublic,
    groupDescription,
    fileCountLimit,
    fileSizeLimit,
    isCreatingGroup,
  } = props;
  const {
    GROUP_NAME,
    IS_GROUP_PUBLIC,
    GROUP_DESCRIPTION,
    FILE_COUNT_LIMIT,
    FILE_SIZE_LIMIT,
  } = INPUT_KEYS_CREATE_GROUP;
  return (
    <div>
      <Tooltip title="Create new group">
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleClickOpen}
          disabled={isCreatingGroup}
          className={classes.fab}
        >
          <Add />
        </Fab>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create new group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new group, please enter a group name and description.
            You can customize the group's file limit and the maximum file size
            as well. If you create a public group, every user can join it
            without an invite.
          </DialogContentText>
          <div className={classes.inputContainer}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Group name"
              type="text"
              required
              fullWidth
              onChange={(event) =>
                handleInputChange(GROUP_NAME, event.target.value)
              }
              value={groupName}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={isGroupPublic}
                  onChange={(event) =>
                    handleInputChange(IS_GROUP_PUBLIC, event.target.checked)
                  }
                  name="is-group-public"
                />
              }
              label="Public"
              className={classes.switchPublic}
            />
          </div>
          <TextField
            margin="dense"
            id="description"
            label="Short description"
            type="text"
            required
            fullWidth
            onChange={(event) =>
              handleInputChange(GROUP_DESCRIPTION, event.target.value)
            }
            value={groupDescription}
          />
          <div className={classes.inputContainer}>
            <FormControl
              fullWidth
              margin="dense"
              className={classes.formControl}
            >
              <InputLabel htmlFor="file-limit">
                {matchesSm ? "Max." : "File limit"}
              </InputLabel>
              <Input
                type="number"
                id="file-limit"
                endAdornment={
                  <InputAdornment position="end">Files</InputAdornment>
                }
                aria-describedby="file-limit-helper-text"
                inputProps={{
                  "aria-label": "file-limit",
                  min: 10,
                  max: 100,
                  step: 1,
                }}
                onChange={(event) =>
                  handleInputChange(FILE_COUNT_LIMIT, event.target.value)
                }
                value={fileCountLimit}
              />
            </FormControl>

            <FormControl
              fullWidth
              margin="dense"
              className={classes.formControl}
            >
              <InputLabel htmlFor="file-size">
                {matchesSm ? "Max." : "File size limit"}
              </InputLabel>
              <Input
                type="number"
                id="file-size"
                endAdornment={
                  <InputAdornment position="end">MB</InputAdornment>
                }
                aria-describedby="file-size-helper-text"
                inputProps={{
                  "aria-label": "file-size",
                  min: 10,
                  max: MAX_UPLOAD_SIZE_MBYTE,
                  step: 1,
                }}
                onChange={(event) =>
                  handleInputChange(FILE_SIZE_LIMIT, event.target.value)
                }
                value={fileSizeLimit}
              />
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            disabled={isCreatingGroup}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={isCreatingGroup}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isCreatingGroup: state.groups.isCreatingGroup,
    loginToken: state.login.loginToken,
    userId: state.login.userId,
    groupName: state.groups.newGroupName,
    isGroupPublic: state.groups.isGroupPublic,
    groupDescription: state.groups.newGroupDescription,
    fileCountLimit: state.groups.newGroupFileCountLimit,
    fileSizeLimit: state.groups.newGroupFileSizeLimit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createGroupReq: (
      userId,
      loginToken,
      title,
      description,
      fileCountLimit,
      fileSizeLimit,
      isPublic
    ) =>
      dispatch(
        createGroupReq(
          userId,
          loginToken,
          title,
          description,
          fileCountLimit,
          fileSizeLimit,
          isPublic
        )
      ),
    changeGroupCreationValue: (inputKey, value) =>
      dispatch(changeGroupCreationValue(inputKey, value)),
    clearGroupCreationValues: () => dispatch(clearGroupCreationValues()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupCreationDialog);
