import React, { Component } from 'react';
import get from "lodash/get";

import { withRouter } from 'react-router-dom';
import { Sidebar, getResources, Responsive, setSidebarVisibility } from 'react-admin';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import MobileMenu from "./MobileMenu";
import MenuItems from "./MenuItems";
import { getMenuItems } from "./getMenuType";

const styles = theme => ({
    sidebarBlock: {
        maxWidth: 240,
        backgroundColor: "#fff",
        '& div': {
            marginTop: 0,
        },
    },
    mobileSidebar: {
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: theme.palette.paperColor,
        zIndex: 999999999999,
    },
    menuBlock: {
        border: `1px solid ${theme.palette.borderColor}`,
    },
    menuItem: {
        color: `${theme.palette.secondaryMainColor} !important`,
        borderBottom: `1px solid ${theme.palette.borderColor}`,
        '&:hover': {
            backgroundColor: theme.palette.secondaryMainColor,
            color: "#fff !important",
        },
    },
    menuItemSelected: {
        backgroundColor: theme.palette.secondaryMainColor + '! important',
        color: "#fff !important",
        borderBottom: `1px solid ${theme.palette.borderColor}`,
    },
});

/**
 * This component returns custom menu
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const CustomSidebar = ({ classes, isSidebarOpen, onMenuClick, location }) => {
    const currentPathname = get(location, 'pathname', null);
    const pathNameArray = currentPathname.split('/');
    const currentList = '/' + pathNameArray[1];
    const menuItems = getMenuItems(currentPathname);
    return (
        <Responsive
            small={
                isSidebarOpen ? null : <MobileMenu
                    classes={classes}
                    menuItems={menuItems}
                    currentList={currentList}
                    onMenuClick={onMenuClick}
                />
            }
            medium={
                isSidebarOpen ?
                    <Sidebar id="sidebarMenu" className={classes.sidebarBlock}>
                        <MenuItems classes={classes} menuItems={menuItems} currentList={currentList} onMenuClick={onMenuClick} />
                    </Sidebar>
                    : null
            }
        >
        </Responsive>
    );
};

const mapStateToProps = state => ({
    resources: getResources(state),
    isSidebarOpen: state.admin.ui.sidebarOpen,
});

export default withRouter(connect(mapStateToProps, null)(withStyles(styles)(CustomSidebar)));