import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import CardMedia from "@material-ui/core/CardMedia";
import HomeIcon from "@material-ui/icons/Home";
import Toolbar from '@material-ui/core/Toolbar';

import helmLogo from "../../../images/logo-big.png";
import nhsLogo from "../../../images/nhs.png";
import UserSearch from "../../../../core/common/Topbar/fragments/UserSearch";
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
    image: {
        width: "auto",
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

function isUserSearchShown(location) {
    const pathname = location.pathname;
    const pathnameArray = pathname.split('/');
    return pathnameArray[1] === 'patients' || pathname === '/';
}

/**
 * This component returns Top part of Helm Topbar
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const TopPart = ({ classes, location, history }) => {
    return (
        <Toolbar className={classes.topPart}>
            <div className={classes.homeButtonItem}>
                <Link id="icon-home" to="/" className={classes.homeButton} color="inherit" >
                    <HomeIcon />
                </Link>
            </div>
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
            { isUserSearchShown(location) && <UserSearch location={location} history={history} /> }
            <CardMedia
                className={classes.nhsLogo}
                component="img"
                alt="Pulse Tile"
                height="29px"
                image={nhsLogo}
                title="Pulse Tile"
            />
            <ContrastMode classes={classes} />
            <UserPanelButton classes={classes} />
        </Toolbar>
    );
}

export default withStyles(styles)(TopPart);
