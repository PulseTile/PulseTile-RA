import React from "react";
import get from "lodash/get";
import { MenuItemLink } from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import Typography from "@material-ui/core/Typography";
import ChevronRight from "@material-ui/icons/ChevronRight";

import { themeCommonElements } from "../../../version/config/theme.config";

const styles = theme => ({
    menuBlock: {
        border: `1px solid ${theme.palette.borderColor}`,
    },
    labelWithChevron: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "justify",
        width: "100%",
        '&:hover p': {
            color: `${theme.palette.paperColor} !important`,
        },
        '&:hover svg': {
            color: `${theme.palette.paperColor} !important`,
        },
    },
    item: {
        color: `${theme.palette.menuItemsColor} !important`,
        fontSize: 14,
        fontWeight: 600,
    },
    itemSelected: {
        color: `${theme.palette.paperColor} !important`,
        fontSize: 14,
        fontWeight: 600,
    }
});

const LabelWithChevron = ({ classes, isSelected, label }) => {
    return (
        <div className={classes.labelWithChevron}>
            <Typography className={isSelected ? classes.itemSelected : classes.item}>{label}</Typography>
            <ChevronRight />
        </div>
    );
};

const MenuItems = ({ classes, menuItems, currentList, onMenuClick }) => {
    const menuHasChevrons = get(themeCommonElements, 'menuHasChevrons', false);
    return (
        <div className={classes.menuBlock} role="menubar">
            {menuItems.map((item, key) => {
                const isSelected = (currentList === item.url);
                return (
                    <MenuItemLink
                        key={key}
                        className={isSelected ? classes.menuItemSelected : classes.menuItem}
                        to={item.url}
                        primaryText={menuHasChevrons ? <LabelWithChevron isSelected={isSelected} classes={classes} label={item.label} /> : item.label}
                        leftIcon={(currentList === item.url) ? <FontAwesomeIcon icon={faCircle} size="xs" />  : null}
                        onClick={onMenuClick}
                        selected={currentList === item.url}
                        aria-label={item.label}
                        role="menuitem"
                    />
                )}
            )}
        </div>
    )
};

export default withStyles(styles)(MenuItems);
