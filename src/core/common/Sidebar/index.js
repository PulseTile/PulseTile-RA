import React, { createElement } from 'react';
import get from "lodash/get";
import { withRouter } from 'react-router-dom';
import { MenuItemLink, Sidebar, getResources } from 'react-admin';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import { SHORT_MENU, FULL_MENU, getMenuType } from "./getMenuType";
import SidebarWithShortMenu from "./SidebarWithShortMenu";
import SidebarWithFullMenu from "./SidebarWithFullMenu";

const styles = theme => ({
    sidebarBlock: {
        maxWidth: 240,
        backgroundColor: "#fff",
        '& div': {
            marginTop: 0,
        },
    },
    menuBlock: {
        border: "1px solid #e5e5e5",
    },
    menuItem: {
        color: `${theme.palette.mainColor} !important`,
        borderBottom: "1px solid #e5e5e5",
        '&:hover': {
            backgroundColor: theme.palette.mainColor,
            color: "#fff !important",
        },
    },
    menuItemSelected: {
        backgroundColor: theme.palette.mainColor + '! important',
        color: "#fff !important",
        borderBottom: "1px solid #e5e5e5",
    },
});

/**
 * This component returns custom menu
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} props
 * @constructor
 */
const CustomSidebar = props => {
    const { classes, resources, isSidebarOpen, onMenuClick, location } = props;
    const currentPathname = get(location, 'pathname', null);
    const pathNameArray = currentPathname.split('/');
    const currentList = '/' + pathNameArray[1];
    const menuType = getMenuType(currentPathname);
    if (isSidebarOpen && menuType === SHORT_MENU) {
        return (
            <SidebarWithShortMenu
              classes={classes}
              currentList={currentList}
              onMenuClick={onMenuClick}
            />
        );
    } else if (isSidebarOpen && menuType === FULL_MENU) {
        return (
            <SidebarWithFullMenu
              classes={classes}
              resources={resources}
              currentList={currentList}
              onMenuClick={onMenuClick}
            />
        );
    }
    return null;
};

const mapStateToProps = state => ({
    resources: getResources(state),
    isSidebarOpen: state.admin.ui.sidebarOpen,
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(CustomSidebar)));