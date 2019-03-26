import React, { createElement } from 'react';
import get from "lodash/get";

import { withRouter } from 'react-router-dom';
import { MenuItemLink, Sidebar, getResources } from 'react-admin';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

import { getMenuItems } from "./getMenuType";

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
    const { classes, isSidebarOpen, onMenuClick, location } = props;
    const currentPathname = get(location, 'pathname', null);
    const pathNameArray = currentPathname.split('/');
    const currentList = '/' + pathNameArray[1];
    const menuItems = getMenuItems(currentPathname);
    if (!isSidebarOpen) {
        return null;
    }
    return (
        <Sidebar className={classes.sidebarBlock}>
            <div className={classes.menuBlock}>
                {menuItems.map((item, key) => {
                    return (
                        <MenuItemLink
                            key={key}
                            className={(currentList === item.url) ? classes.menuItemSelected : classes.menuItem}
                            to={item.url}
                            primaryText={item.label}
                            leftIcon={(currentList === item.url) ? <FontAwesomeIcon icon={faCircle} size="xs" />  : null}
                            onClick={onMenuClick}
                            selected={currentList === item.url}
                        />
                    )
                })}
            </div>
        </Sidebar>
    )

    return null;
};

const mapStateToProps = state => ({
    resources: getResources(state),
    isSidebarOpen: state.admin.ui.sidebarOpen,
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(CustomSidebar)));