import React from "react";
import Header from "./Header";
import Carousel from "./Carousel";
import Search from "./Search";
import Category from "./Category";
import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {},
    search: {},
    carousel: {},
    category: {},
    marginTopHalf: {
      marginTop: ".5rem",
    },
    root: {
      // padding: "1rem",
      background: "#f9f9f9",
    },
  })
);

function Home() {
  const classes = useStyles();
  return (
    // <Paper>
    <div className={classes.root}>
      <div className={`${classes.header}`}>
        <Header />
      </div>
      <div className={`${classes.carousel} ${classes.marginTopHalf}`}>
        <Carousel />
      </div>
      {/*<div className={`${classes.category} ${classes.paddingTop}`}>*/}
      {/*    <Category/>*/}
      {/*</div>*/}
    </div>
    // </Paper>
  );
}

export default Home;
