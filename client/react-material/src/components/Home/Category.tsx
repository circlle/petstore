import React from "react";
import {Card, Button, makeStyles, createStyles, Typography, Grid} from "@material-ui/core";
import {common} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => createStyles({
  category: {
    height: '30vh',
  },
  card: {
    boxSizing: 'border-box',
    height: '100%',
    background: "#FCE4CE",
    padding: '2rem'
  },
  textContainer: {
    height: '100%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  welcome: {
    color: common.black
  },
  button: {
    width: ''
  }
}))

function Category() {
  const classes = useStyles()
  return <div className={classes.category}>
    <Card className={classes.card}>
      <div className={classes.textContainer}>
        <Typography variant={'h6'}>What's your favorite pet?</Typography>
        <Grid container>
          <Grid xs={6}>
            <Button color={"primary"} variant={'contained'}>Learn more</Button>
          </Grid>
        </Grid>
      </div>
    </Card>
  </div>;
}

export default Category;
