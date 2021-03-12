import React from "react";
import {createStyles, Grid, makeStyles, TextField} from "@material-ui/core";
import {SearchOutlined} from "@material-ui/icons";
import {common} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        textField: {
            borderWidth: 0,
            outline: 'none'
        },
        searchButtonWrapper: {},
        searchButton: {
            background: theme.palette.primary.main,
            borderRadius: "50%",
            color: common.white,
            border: `.3rem solid ${theme.palette.primary.main}`,
            boxSizing: 'content-box'
        }
    })
);

function Search() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={1} alignItems="center">
                <Grid item xs>
                    <TextField
                        size={"small"}
                        fullWidth
                        variant={"outlined"}
                        type={'search'}
                        label=""
                    />
                </Grid>
                <Grid item className={classes.searchButtonWrapper}>
                    <SearchOutlined className={classes.searchButton} />
                </Grid>
            </Grid>
        </div>
    );
}

export default Search;
