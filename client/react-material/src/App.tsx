import React, { useState } from "react";
import {
  AppBar,
  CssBaseline,
  makeStyles,
  Paper,
  Tab,
  Tabs,
} from "@material-ui/core";
import {
  StarOutlineOutlined,
  CategoryOutlined,
  ShoppingCartOutlined,
  PersonOutlined,
} from "@material-ui/icons";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
  },
  root: {
    flexGrow: 1,
    maxWidth: 500,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <CssBaseline />
      <Paper></Paper>
      <BottomBar />
    </Router>
  );
}

function BottomBar() {
  const classes = useStyles();
  const [indicator, setIndicator] = useState(0);

  return (
    <AppBar position={"fixed"} color={"primary"} className={classes.appBar}>
      <Paper square className={classes.root}>
        <Tabs
          value={indicator}
          onChange={(_, newValue) => setIndicator(newValue)}
          variant={"fullWidth"}
          indicatorColor={"secondary"}
          textColor={"secondary"}
        >
          <Tab icon={<StarOutlineOutlined />} label={"首页"} />
          <Tab icon={<CategoryOutlined />} label={"分类"} />
          <Tab icon={<ShoppingCartOutlined />} label={"购物车"} />
          <Tab icon={<PersonOutlined />} label={"我的"} />
        </Tabs>
      </Paper>
    </AppBar>
  );
}

export default App;
