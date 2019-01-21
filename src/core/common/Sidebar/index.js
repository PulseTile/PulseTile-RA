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
            if (currentItem === get(resources[j], 'name', null)) {
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
    const { classes, resources, onMenuClick, location } = props;
    const currentPathname = get(location, 'pathname', null);
    const sortResources = sortResourcesArray(resources);
    if (isMenuVisible(location)) {
        return (
            <Sidebar className={classes.sidebarBlock}>
                <div className={classes.menuBlock}>
                    <MenuItemLink
                        className={(currentPathname === "/charts") ? classes.menuItemSelected : classes.menuItem}
                        to="/charts"
                        primaryText="Charts"
                        leftIcon={(currentPathname === "/charts") ? <FontAwesomeIcon icon={faCircle} size="xs" /> : null}
                        onClick={onMenuClick}
                        selected={currentPathname === "/charts"}
                    />
                    <MenuItemLink
                        className={(currentPathname === "/patients") ? classes.menuItemSelected : classes.menuItem}
                        to="/patients"
                        primaryText="Patients"
                        leftIcon={(currentPathname === "/patients") ? <FontAwesomeIcon icon={faCircle} size="xs" />  : null}
                        onClick={onMenuClick}
                        selected={currentPathname === "/patients"}
                    />
                    <MenuItemLink
                        className={(currentPathname === "/summary") ? classes.menuItemSelected : classes.menuItem}
                        to="/summary"
                        primaryText="Patient Summary"
                        leftIcon={(currentPathname === "/summary") ? <FontAwesomeIcon icon={faCircle} size="xs" /> : null}
                        onClick={onMenuClick}
                        selected={currentPathname === "/summary"}
                    />
                    {
                        sortResources.map(resource => {
                            return (
                                <MenuItemLink
                                    className={(currentPathname === `/${resource.name}`) ? classes.menuItemSelected : classes.menuItem}
                                    to={`/${resource.name}`}
                                    primaryText={resource.options.label}
                                    leftIcon={(currentPathname === `/${resource.name}`) ? <FontAwesomeIcon icon={faCircle} size="xs" /> : null}
                                    onClick={onMenuClick}
                                    selected={currentPathname === `/${resource.name}`}
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
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(CustomSidebar)));