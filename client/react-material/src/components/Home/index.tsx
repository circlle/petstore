import React from "react";
import Header from "./Header";
import Carousel from "./Carousel";
import Search from "./Search";
import Category from "./Category";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  header: {},
  search: {},
  carousel: {},
  category: {},
  paddingTop: {
    padding: "1rem 0",
  },
  root: {
    padding: "2rem",
  },
}));
function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={`${classes.header} ${classes.paddingTop}`}>
        <Header />
      </div>
      <div className={`${classes.search} ${classes.paddingTop}`}>
        <Search />
      </div>
      <div className={`${classes.carousel} ${classes.paddingTop}`}>
        <Carousel />
      </div>
      <div className={`${classes.category} ${classes.paddingTop}`}>
        <Category />
      </div>
    </div>
  );
}

export default Home;
