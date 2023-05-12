import { React, useState, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";

import { logOutReqAct } from "../../actions/logInActions";
import NotificationDialog from "./NotificationDialog";
import { ResponsiveLogo } from "./ResponsiveLogo";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "white",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navbar: {
    padding: "200px",
  },
  title: {
    flexGrow: 1,
  },
  menu: {
    color: "black",
    marginLeft: "-100%",
  },
  menu2: {
    marginLeft: "5px",
    marginTop: "50px",
  },
  menu3: {
    color: "white",
    marginLeft: "-50%",
  },
  menu4: {
    marginLeft: "5px",
    marginTop: "50px",
  },
  menulinks: {
    textDecoration: "none",
    color: "black",
  },
  logoutmenu: {
    color: "black",
  },
}));

const Navbar = (props) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    const { logOut, userId, loginToken } = props;
    logOut(userId, loginToken);
  };

  const renderMenuLoggedIn = () => (
    <Fragment>
      <Button
        className={classes.menu}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {`Hello, ${props.firstName}`}
      </Button>
      <Menu
        className={classes.menu2}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Link className={classes.menulinks} to="/inventory">
            Inventory
          </Link>
        </MenuItem>
        <MenuItem>
          <Link className={classes.menulinks} to="/groups">
            My Groups
          </Link>
        </MenuItem>
        <MenuItem className={classes.logoutmenu} onClick={handleLogOut}>
          Logout
        </MenuItem>
      </Menu>
      <NotificationDialog />
    </Fragment>
  );

  const renderMenuLoggedOut = () => (
    <Fragment>
      <Link className={classes.menulinks} to="/login">
        <Button>Log In</Button>
      </Link>
      <Link className={classes.menulinks} to="/signup">
        <Button>Sign Up</Button>
      </Link>
    </Fragment>
  );

  const { isLoggedIn } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          {isLoggedIn ? (
            <Link to="/groups">
              <ResponsiveLogo />
            </Link>
          ) : (
            <ResponsiveLogo />
          )}
          <Typography variant="h6" className={classes.title}></Typography>
          {isLoggedIn ? renderMenuLoggedIn() : renderMenuLoggedOut()}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.login.isLoggedIn,
    firstName: state.login.firstName,
    notifications: state.notifications.notifications,
    userId: state.login.userId,
    loginToken: state.login.loginToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: (userId, loginToken) => dispatch(logOutReqAct(userId, loginToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
