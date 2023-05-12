import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Typography, useMediaQuery } from "@material-ui/core";
import fuldi from "../img/fuldi.png";
const useStyles = makeStyles((theme) => ({
  placeholder: {
    borderRadius: "5px",
    display: "flex",
    height: "100%",
    background: "#e8eaed",
    justifyContent: "center",
  },
  imgcontainer: {
    margin: " auto 0",
  },
  large: {
    width: "150px",
    height: "auto",
    opacity: "50%",
  },
  small: {
    width: "75px",
    height: "auto",
    opacity: "50%",
  },
  heading: {
    textAlign: "start",
  },
  headingcontainer: {
    color: "grey",
    margin: "auto 0",
  },
}));

function StudySharePlaceholder(props) {
  const classes = useStyles();
  const matchesSm = useMediaQuery("(max-width:515px)");

  return (
    <div className={classes.placeholder}>
      <div className={classes.imgcontainer}>
        <Avatar
          alt="Remy Sharp"
          className={matchesSm ? classes.small : classes.large}
          src={fuldi}
        />
      </div>
      <div className={classes.headingcontainer}>
        <Typography
          variant={matchesSm ? "h6" : "h4"}
          className={classes.heading}
        >
          {props.heading}
        </Typography>
        <Typography
          variant={matchesSm ? "subtitle2" : "subtitle1"}
          align="left"
        >
          {props.subheading}
        </Typography>
      </div>
    </div>
  );
}

export default StudySharePlaceholder;
