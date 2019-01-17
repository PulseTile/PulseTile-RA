import React from "react";
import { get } from "lodash";

import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Menu from '@material-ui/core/Menu';

import PageTitle from "../../../../core/common/Topbar/fragments/PageTitle";
import styles from "../../../styles";

const lowPartTopbarStyles = get(styles, 'lowTopBar', null);

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
        <div className={classes.menuButtonBlock}>
            <Button variant="contained" color="primary" className={classes.menuButton} onClick={() => setSidebarVisibility(!isSidebarOpen)}>
                { !isSidebarOpen ? <MenuIcon /> : <CloseIcon /> }
                { !isSidebarOpen ? 'Menu' : 'Close' }
            </Button>
        </div>
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
        <Toolbar className={classes.lowPart}>
            { isMenuVisible &&
                <MenuButton classes={classes} setSidebarVisibility={setSidebarVisibility} isSidebarOpen={isSidebarOpen} />
            }
            <PageTitle location={location} classes={classes} patientInfo={patientInfo} />
        </Toolbar>
    );
};

export default withStyles(lowPartTopbarStyles)(GreenPart);
