import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

export default function TableSkeleton(props) {
  const classes = useStyles();
  let skeletons = [];
  for (let i = 0; i < props.no; i++)
    skeletons.push(<Skeleton animation="wave" key={i} />);
  return <div className={classes.root}>{skeletons}</div>;
}
