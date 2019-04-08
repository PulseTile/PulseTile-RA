import React from "react";
import { MenuItemLink } from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const styles = theme => ({
    menuBlock: {
        border: `1px solid ${theme.palette.borderColor}`,
    },
});

const MenuItems = ({ classes, menuItems, currentList, onMenuClick }) => {
    return (
        <div className={classes.menuBlock} role="menubar">
            {menuItems.map((item, key) => (
                    <MenuItemLink
                        key={key}
                        className={(currentList === item.url) ? classes.menuItemSelected : classes.menuItem}
                        to={item.url}
                        primaryText={item.label}
                        leftIcon={(currentList === item.url) ? <FontAwesomeIcon icon={faCircle} size="xs" />  : null}
                        onClick={onMenuClick}
                        selected={currentList === item.url}
                        aria-label={item.label}
                        role="menuitem"
                    />
                )
            )}
        </div>
    )
};

export default withStyles(styles)(MenuItems);
