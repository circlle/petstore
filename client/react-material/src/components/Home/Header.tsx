import React from "react";
import {
  Avatar,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import logo from "../../images/logo.png";
import { MenuOpenOutlined } from "@material-ui/icons";
const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      fontFamily: "Source Code Pro",
      alignItems: "center",
    },
    left: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  })
);
function Header() {
  const classes = useStyles();
  return (
    <header className={classes.header}>
      <div className={classes.left}>
        <Avatar alt={"logo"} src={logo} />
        <span>Sprite82</span>
      </div>
      <div>
        <MenuOpenOutlined />
      </div>
    </header>
  );
}

export default Header;
