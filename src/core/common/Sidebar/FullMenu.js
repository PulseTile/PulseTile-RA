import React from "react";
import { MenuItemLink, Sidebar, getResources } from 'react-admin';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

import { sortResourcesArray } from "./functions";

/**
 * This component returns full menu (Patient Summary + Plugins)
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}  classes
 * @param {shape}  resources
 * @param {string} currentList
 * @param {func}   onMenuClick
 */
const FullMenu = ({ classes, resources, currentList, onMenuClick }) => {
    const sortResources = sortResourcesArray(resources);
    return (
        <Sidebar className={classes.sidebarBlock}>
            <div className={classes.menuBlock}>
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
                    )
                }
            </div>
        </Sidebar>
    );
};

export default FullMenu;
