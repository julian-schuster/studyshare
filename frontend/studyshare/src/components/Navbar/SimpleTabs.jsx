import React, { Fragment } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import partition from "lodash/partition";
import { Check, Close, Folder, Mail } from "@material-ui/icons";
import {
  AppBar,
  Tabs,
  Tab,
  Badge,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Avatar,
  ListItemAvatar,
  ListItemSecondaryAction,
  Tooltip,
  useMediaQuery,
} from "@material-ui/core";

import {
  updateNotificationReqAct,
  declineNotificationReqAct,
} from "../../actions/notificationActions";
import { joinGroupReqAct } from "../../actions/groupActions";
import TabPanel from "./TabPanel";
import ListRowSkeleton from "../ListRowSkeleton";
import StudySharePlaceholder from "../StudySharePlaceholder";
import { NOTIFICATIONS } from "../../constants";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  badge: {
    marginTop: "20px ",
  },

  tabs: {
    //minWidth: "500px",
  },
  listitemtext: {
    maxWidth: "80%",
  },
}));

const SimpleTabs = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const matchesSm = useMediaQuery("(max-width:515px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const analyseNotifications = (array) => {
    return partition(array, (elem) => elem.notification_type === 1);
  };

  const analysedArray = analyseNotifications(props.notifications);

  //decline invite notification (status is updated by the backend)
  const handleDecline = (groupId) => {
    const { declineNotificationReqAct, userId, loginToken } = props;
    declineNotificationReqAct(userId, loginToken, groupId);
  };

  //accept invite notification (status is updated by the backend)
  const handleAccept = (groupId) => {
    const { joinGroupReqAct, userId, loginToken } = props;
    joinGroupReqAct(userId, loginToken, groupId);
  };

  //set the notification to read "manually"
  const handleUpdate = (notificationId) => {
    const { updateNotificationReqAct, userId, loginToken } = props;
    updateNotificationReqAct(userId, loginToken, notificationId);
  };

  const renderListItems = (array, type) => {
    return array.map((arrayItem) => {
      return (
        <Fragment>
          <ListItem button>
            {!matchesSm && (
              <ListItemAvatar>
                <Avatar>
                  {type === NOTIFICATIONS.NOTIFICATION_TYPE_GROUP_INVITE && (
                    <Mail />
                  )}
                  {type === NOTIFICATIONS.NOTIFICATION_TYPE_GROUP_UPLOAD && (
                    <Folder />
                  )}
                </Avatar>
              </ListItemAvatar>
            )}

            {type === NOTIFICATIONS.NOTIFICATION_TYPE_GROUP_INVITE && (
              <Fragment>
                <ListItemText
                  className={classes.listitemtext}
                  primary={"Invite"}
                  secondary={arrayItem.notification_msg}
                />
                <ListItemSecondaryAction>
                  <Tooltip title="Accept Invite">
                    <IconButton
                      edge="end"
                      aria-label="accept"
                      onClick={() => handleAccept(arrayItem.invited_group_id)}
                    >
                      <Check />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Decline Invite">
                    <IconButton
                      edge="end"
                      aria-label="decline"
                      onClick={() => handleDecline(arrayItem.invited_group_id)}
                    >
                      <Close />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </Fragment>
            )}

            {type === NOTIFICATIONS.NOTIFICATION_TYPE_GROUP_UPLOAD && (
              <Fragment>
                <ListItemText
                  className={classes.listitemtext}
                  primary={"Update"}
                  secondary={arrayItem.notification_msg}
                />
                <ListItemSecondaryAction>
                  <Tooltip title="Dismiss">
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleUpdate(arrayItem.notification_id)}
                    >
                      <Close />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </Fragment>
            )}
          </ListItem>
          <Divider />
        </Fragment>
      );
    });
  };

  const { isLoading } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          className={classes.tabs}
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          color="secondary"
        >
          <Tab
            label={matchesSm ? "Invites" : "Group Invites"}
            {...a11yProps(0)}
          />
          <Badge
            className={classes.badge}
            color="secondary"
            badgeContent={analysedArray[0].length}
          />
          <Tab
            label={matchesSm ? "Updates" : "Group Updates"}
            {...a11yProps(1)}
          />
          <Badge
            className={classes.badge}
            color="secondary"
            badgeContent={analysedArray[1].length}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <List>
          {isLoading ? (
            <ListRowSkeleton rows={NOTIFICATIONS.NOTIFICATIONS_PER_PAGE} />
          ) : analysedArray[0].length > 0 ? (
            renderListItems(
              analysedArray[0],
              NOTIFICATIONS.NOTIFICATION_TYPE_GROUP_INVITE
            )
          ) : (
            <StudySharePlaceholder
              heading="No pending invites"
              subheading="Don't worry, you can always join public groups."
            />
          )}
        </List>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <List>
          {isLoading ? (
            <ListRowSkeleton rows={NOTIFICATIONS.NOTIFICATIONS_PER_PAGE} />
          ) : analysedArray[1].length > 0 ? (
            renderListItems(
              analysedArray[1],
              NOTIFICATIONS.NOTIFICATION_TYPE_GROUP_UPLOAD
            )
          ) : (
            <StudySharePlaceholder
              heading="No updates"
              subheading="There has no activity in your groups recently."
            />
          )}
        </List>
      </TabPanel>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.login.userId,
    loginToken: state.login.loginToken,
    isLoading:
      state.notifications.isUpdatingNotifications ||
      state.notifications.isGettingNotifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateNotificationReqAct: (userId, loginToken, notificationId) =>
      dispatch(updateNotificationReqAct(userId, loginToken, notificationId)),
    declineNotificationReqAct: (userId, loginToken, groupId) =>
      dispatch(declineNotificationReqAct(userId, loginToken, groupId)),
    joinGroupReqAct: (userId, loginToken, groupId) =>
      dispatch(joinGroupReqAct(userId, loginToken, groupId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleTabs);
