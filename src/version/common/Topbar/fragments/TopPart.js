import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import CardMedia from "@material-ui/core/CardMedia";
import HomeIcon from "@material-ui/icons/Home";
import Toolbar from '@material-ui/core/Toolbar';
import BackIcon from "@material-ui/icons/KeyboardBackspace";
import IconButton from '@material-ui/core/IconButton';

import helmLogo from "../../../images/pulsetile-logo.png";
import nhsLogo from "../../../images/nhs.png";
import UserTour from "../../../features/UserTour";
import ContrastMode from "../../../features/ContrastMode";
import UserPanelButton from "./UserPanelButton";

const styles = theme => ({
    topPart: {
        display: "flex",
        backgroundColor: "white",
        justifyContent: "space-around",
        border: "1px solid #e5e5e5",
        minHeight: 54,
        padding: 0,
    },
    homeButtonItem: {
        display: "inline-flex",
        position: "relative",
        minHeight: 54,
        minWidth: 54,
        backgroundColor: theme.palette.mainColor,
        justifyContent: "center",
        alignItems: "center",
    },
    homeButton : {
        color: "white",
    },
    mainLogoItem: {
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 9,
    },
    nhsLogo: {
        width: "auto",
        maxWidth: "100%",
        marginRight: 24
    },
    rightBlockItem: {
        display: "inline-flex",
        position: "relative",
        minHeight: 54,
        minWidth: 54,
        justifyContent: "center",
        alignItems: "center",
        borderLeft: "1px solid #e5e5e5",
        '&:hover': {
            backgroundColor: theme.palette.mainColor,
        },
        '&:active': {
            backgroundColor: theme.palette.mainColor,
        },
        '&:hover button': {
            color: "white",
        },
        '&:active button': {
            color: "white",
        },
        '&:hover a': {
            color: "white",
        },
        '&:active a': {
            color: "white",
        },
    },
    rightBlockButton: {
        color: theme.palette.mainColor,
        '&:hover': {
            color: "white",
        },
    },
    emptyBlock: {
        flexGrow: 1,
    }
});

/**
 * This component returns Top part of Helm Topbar
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const TopPart = ({ classes, logout, location, history }) => {
    return (
        <Toolbar className={classes.topPart}>
            { (location.pathname !== '/') &&
                <div className={classes.homeButtonItem}>
                    <IconButton
                        className={classes.backButton}
                        onClick={() => history.goBack()}
                        color="inherit" >
                        <BackIcon />
                    </IconButton>
                </div>
            }
            <div className={classes.mainLogoItem}>
                <Link to="/" className={classes.homeButton} color="inherit" >
                    <CardMedia
                        id="logo-image"
                        className={classes.image}
                        component="img"
                        alt="Pulse Tile"
                        height="38px"
                        image={helmLogo}
                        title="Pulse Tile"
                    />
                </Link>
            </div>
            <div className={classes.emptyBlock}></div>
            <CardMedia
                className={classes.nhsLogo}
                component="img"
                alt="Pulse Tile"
                height="29px"
                image={nhsLogo}
                title="Pulse Tile"
            />
            <UserTour classes={classes} location={location} />
            <ContrastMode classes={classes} />
            <UserPanelButton classes={classes} />
        </Toolbar>
    );
}

export default withStyles(styles)(TopPart);
