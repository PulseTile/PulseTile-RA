import React from "react";
import { get } from "lodash";

import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Menu from '@material-ui/core/Menu';

import PageTitle from "../../../core/common/fragments/PageTitle";

const styles = {
    toolbar: {
        backgroundColor: "white",
        justifyContent: "space-between",
    },
    logo: {
        width: "auto",
    },
    menuButton: {
        marginRight: 20,
        borderRadius: "30px",
        color: "#3596f4",
        backgroundColor: "white",
        '&:hover': {
            backgroundColor: "white",
        },
        '&:active': {
            backgroundColor: "#3596f4",
            color: "white",
        },
    },
    title: {
        flexGrow: 1,
        color: "black"
    },
    patientInfo: {
        display: "flex",
        width: "100%",
        justifyContent: "space-around",
        color: "black",
    },
    patientInfoColumn: {
        display: "inline-block"
    }
};

/**
 * This component returns button which toggle sidebar menu
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}   classes
 * @param {func}    setSidebarVisibility
 * @param {boolean} isSidebarOpen
 * @constructor
 */
const MenuButton = ({ classes, setSidebarVisibility, isSidebarOpen }) => {
    return (
        <Button variant="contained" color="primary" className={classes.menuButton} onClick={() => setSidebarVisibility(!isSidebarOpen)}>
            { isSidebarOpen ? <MenuIcon /> : <CloseIcon /> }
            { isSidebarOpen ? 'Menu' : 'Close' }
        </Button>
    );
};

/**
 * This component returns green (bottom) part of Showcase TopBar
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @constructor
 */
const GreenPart = ({ classes, isSidebarOpen, setSidebarVisibility, isMenuVisible, location, patientInfo }) => {
    return (
        <Toolbar className={classes.toolbar}>
            { isMenuVisible && <MenuButton classes={classes} setSidebarVisibility={setSidebarVisibility} isSidebarOpen={isSidebarOpen} /> }
            <PageTitle location={location} classes={classes} patientInfo={patientInfo} />
        </Toolbar>
    );
};

export default withStyles(styles)(GreenPart);
