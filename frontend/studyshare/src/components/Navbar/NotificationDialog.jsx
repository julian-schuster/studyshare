import React, { useEffect } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SimpleTabs from "./SimpleTabs";

import { NOTIFICATIONS, AUTO_LOG_OUT_TIMEOUT_MS } from "../../constants";
import { notificationReqAct } from "../../actions/notificationActions";
import { logOutReqAct } from "../../actions/logInActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NotificationDialog = (props) => {
  const { notificationReqAct, logOutReqAct, userId, loginToken } = props;
  useEffect(() => {
    const { REFRESH_RATE_IN_MS } = NOTIFICATIONS;
    notificationReqAct(userId, loginToken);
    const autoRefresh = setInterval(() => {
      notificationReqAct(userId, loginToken);
    }, REFRESH_RATE_IN_MS);
    const autoLogOut = setTimeout(() => {
      logOutReqAct(userId, loginToken);
    }, AUTO_LOG_OUT_TIMEOUT_MS);

    return () => {
      clearInterval(autoRefresh);
      clearTimeout(autoLogOut);
    };
  }, [userId, loginToken, notificationReqAct, logOutReqAct]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { notifications } = props;
  return (
    <div>
      <IconButton
        onClick={handleClickOpen}
        aria-label="show-notifications"
        aria-controls="simple-menu"
        aria-haspopup="true"
      >
        <Badge color="secondary" badgeContent={notifications.length}>
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Notifications</DialogTitle>
        <DialogContent>
          <SimpleTabs notifications={notifications} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications.notifications,
    userId: state.login.userId,
    loginToken: state.login.loginToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    notificationReqAct: (userId, loginToken) =>
      dispatch(notificationReqAct(userId, loginToken)),
    logOutReqAct: (userId, loginToken) =>
      dispatch(logOutReqAct(userId, loginToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationDialog);
