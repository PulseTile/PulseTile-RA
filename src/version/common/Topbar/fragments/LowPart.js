import React, { Component } from "react";
import { get } from "lodash";

import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Menu from '@material-ui/core/Menu';

import PageTitle from "../../../../core/common/Topbar/fragments/PageTitle";
import { isMenuVisible } from "../../../../core/common/functions";
import { MAIN_THEME_COLOR } from "../../../config/theme.config";

const styles = {
    lowPart: {
        display: "flex",
        border: "1px solid #e5e5e5",
        padding: 0,
        backgroundColor: "white",
        justifyContent: "space-between",
    },
    menuButtonBlock: {
        display: "inline-flex",
        position: "relative",
        minWidth: "238px",
        minHeight: "90px",
        borderRight: "1px solid #e5e5e5",
        justifyContent: "center",
        alignItems: "center",
    },
    menuButton: {
        borderRadius: "15px",
        maxHeight: "20px",
        minWidth: "64px",
        color: MAIN_THEME_COLOR,
        textTransform: "none",
        backgroundColor: "white",
        '&:hover': {
            backgroundColor: MAIN_THEME_COLOR,
            color: "white",
        },
        '&:active': {
            backgroundColor: MAIN_THEME_COLOR,
            color: "white",
        },
    },
    title: {
        flexGrow: 1,
        color: "white",
        backgroundColor: MAIN_THEME_COLOR,
        textAlign: "center",
        paddingTop: "5px",
        paddingBottom: "5px",
        fontWeight: "800"
    },
    patientInfo: {
        color: "black",
        padding: "11px 14px",
        marginLeft: "5px",
    },
    gridBlock: {
        padding: "0px !important",
        marginTop: "5px",
        marginBottom: "5px",
    },
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
        <div className={classes.menuButtonBlock}>
            <Button variant="contained" color="primary" className={classes.menuButton} onClick={() => setSidebarVisibility(!isSidebarOpen)}>
                { !isSidebarOpen ? <MenuIcon /> : <CloseIcon /> }
                { !isSidebarOpen ? 'Menu' : 'Close' }
            </Button>
        </div>
    );
};

/**
 * This component returns low part of Showcase TopBar
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @constructor
 */
class LowPart extends Component {

    componentWillMount() {
        this.props.setSidebarVisibility(true);
    }

    render() {
        const { classes, isSidebarOpen, setSidebarVisibility, location, patientInfo } = this.props;
        return (
            <Toolbar className={classes.lowPart}>
                { (isMenuVisible(location)) &&
                    <MenuButton classes={classes} setSidebarVisibility={setSidebarVisibility} isSidebarOpen={isSidebarOpen} />
                }
                <PageTitle location={location} classes={classes} patientInfo={patientInfo} />
            </Toolbar>
        );
    }

};

export default withStyles(styles)(LowPart);
