import {CircularProgress, makeStyles} from "@material-ui/core";
import React from "react";


const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  bottom: {
    color: "#e7e7ff"
  },
  top: {
    color: "#6564F5",
    animationDuration: "550ms",
    position: "absolute",
    left: 0,
  },
  circle: {
    strokeLinecap: "round",
  },
}));

export const ProgressContainer = () => {
  const classes = useStyles();

  return (
    <div className="loader-div">
      Loading data...

      <div className={classes.root}>
        <CircularProgress
          variant="determinate"
          className={classes.bottom}
          size={50}
          thickness={4}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          className={classes.top}
          classes={{
            circle: classes.circle,
          }}
          size={50}
          thickness={4}
        />
      </div>
    </div>
  );
}
