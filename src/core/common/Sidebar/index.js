import React, { createElement } from 'react';
import { get } from "lodash";
import { withRouter } from 'react-router-dom';
import { MenuItemLink, Sidebar, getResources } from 'react-admin';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

import { resourceOrder } from "../../../version/config/theme.config";
import themeStyles from "../../../version/styles";
import { mergeStyles } from "../../helpers";
import { isMenuVisible } from "../functions";

const coreStyles = {};
const styles = mergeStyles(coreStyles, get(themeStyles, 'sidebar', {}));

/**
 * This function sorts resources by theme settings
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {array} resources
 * @return {array}
 */
function sortResourcesArray(resources) {
    let sortResource = [];
    for (let i = 0, n = resourceOrder.length; i < n; i++) {
        let currentItem = resourceOrder[i];
        for (let j = 0, m = resources.length; j < m; j++) {
            if (currentItem === get(resources, [j, 'name'], null)) {
                sortResource[i] = resources[j];
                break;
            }
        }
    }
    return sortResource;
}

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
    const pathNameArray = currentPathname.split('/')
    const currentList = '/' + pathNameArray[1];
    const sortResources = sortResourcesArray(resources);
    if (isMenuVisible(location) && isSidebarOpen) {
        return (
            <Sidebar className={classes.sidebarBlock}>
                <div className={classes.menuBlock}>
                    <MenuItemLink
                        className={(currentList === "/charts") ? classes.menuItemSelected : classes.menuItem}
                        to="/charts"
                        primaryText="Charts"
                        leftIcon={(currentList === "/charts") ? <FontAwesomeIcon icon={faCircle} size="xs" /> : null}
                        onClick={onMenuClick}
                        selected={currentList === "/charts"}
                    />
                    <MenuItemLink
                        className={(currentList === "/patients") ? classes.menuItemSelected : classes.menuItem}
                        to="/patients"
                        primaryText="Patients"
                        leftIcon={(currentList === "/patients") ? <FontAwesomeIcon icon={faCircle} size="xs" />  : null}
                        onClick={onMenuClick}
                        selected={currentList === "/patients"}
                    />
                    <MenuItemLink
                        className={(currentList === "/summary") ? classes.menuItemSelected : classes.menuItem}
                        to="/summary"
                        primaryText="Patient Summary"
                        leftIcon={(currentList === "/summary") ? <FontAwesomeIcon icon={faCircle} size="xs" /> : null}
                        onClick={onMenuClick}
                        selected={currentList === "/summary"}
                    />
                    {
                        sortResources.map(resource => {
                            return (
                                <MenuItemLink
                                    className={(currentList === `/${resource.name}`) ? classes.menuItemSelected : classes.menuItem}
                                    to={`/${resource.name}`}
                                    primaryText={resource.options.label}
                                    leftIcon={(currentList === `/${resource.name}`) ? <FontAwesomeIcon icon={faCircle} size="xs" /> : null}
                                    onClick={onMenuClick}
                                    selected={currentList === `/${resource.name}`}
                                />
                            );
                        }
                    )}
                </div>
            </Sidebar>
        );
    }
    return null;
};

const mapStateToProps = state => ({
    resources: getResources(state),
    isSidebarOpen: get(state, 'admin.ui.sidebarOpen', true),
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(CustomSidebar)));