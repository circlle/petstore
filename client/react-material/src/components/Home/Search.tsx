import React from "react";
import { createStyles, makeStyles, TextField } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    textField: {
      flexGrow: 1,
      // width: "100%",
    },
  })
);
function Search() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TextField className={classes.textField} label="Search" type="search" />
      <SearchOutlined />
    </div>
  );
}

export default Search;
