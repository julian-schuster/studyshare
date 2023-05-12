import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const StudyShareAlert = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 5000); //5 Second delay
  }, []);

  const { text, severity } = props;
  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {text}
        </Alert>
      </Collapse>
    </div>
  );
};

export default StudyShareAlert;
