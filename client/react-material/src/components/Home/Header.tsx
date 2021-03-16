import React from "react";
import {
    AppBar,
    createStyles, IconButton,
    makeStyles, Paper, Toolbar, Typography
} from "@material-ui/core";
import { Menu as MenuIcon } from '@material-ui/icons'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        menuButton: {
            marginRight: theme.spacing(2)
        },
        title: {
            flexGrow: 1,
            display: 'block',
            // [theme.breakpoints.up('sm')]: {
            //     display: 'block',
            // },
        },
    })
);

function Header() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper>
                <AppBar position={"static"} color={"transparent"} elevation={0}>
                    <Toolbar>
                        <IconButton
                            edge={"start"}
                            className={classes.menuButton}
                            color={"inherit"}
                            aria-label={"open drawer"}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Dora Shop
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div>search bar</div>
            </Paper>
        </div>
    )
}

export default Header;
