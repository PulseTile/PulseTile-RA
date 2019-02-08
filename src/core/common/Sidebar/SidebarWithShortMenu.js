import React from "react";
import { MenuItemLink, Sidebar, getResources } from 'react-admin';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

/**
 * This component returns short menu (Charts + Patients)
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}  classes
 * @param {string} currentList
 * @param {func}   onMenuClick
 */
const SidebarWithShortMenu = ({ classes, currentList, onMenuClick }) => {

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
            </div>
        </Sidebar>
    );
}

export default SidebarWithShortMenu;
