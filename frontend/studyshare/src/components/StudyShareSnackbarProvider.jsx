import React, { Component } from "react";
import { SnackbarProvider } from "notistack";
import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const notistackRef = React.createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

export default class StudyShareSnackbarProvider extends Component {
  render() {
    return (
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        autoHideDuration={5000}
        ref={notistackRef}
        action={(key) => (
          <IconButton onClick={onClickDismiss(key)}>
            <Close />
          </IconButton>
        )}
      >
        {this.props.children}
      </SnackbarProvider>
    );
  }
}
