import React from "react";

import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';

import PageTitle from "./PageTitle";

const styles = {
    greenPart: {
        backgroundColor: "#0D672F",
    },
    logo: {
        width: "auto",
    },
    menuButton: {
        marginRight: 20,
    },
    title: {
        flexGrow: 1,
        color: "white"
    },
};

/**
 * This component returns green (bottom) part of Showcase TopBar
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @constructor
 */
const GreenPart = ({ classes, setSidebarVisibility, isSidebarOpen, isMenuVisible, location, patientInfo }) => {
    return (
        <Toolbar className={classes.greenPart}>
            { isMenuVisible &&
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon onClick={() => setSidebarVisibility(!isSidebarOpen)} />
            </IconButton> }
            <PageTitle location={location} classes={classes} patientInfo={patientInfo} />
        </Toolbar>
    );
}

export default withStyles(styles)(GreenPart);