import React from "react";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    fontAwesomeIcon: {
        color: theme.isOldDesign ? `${theme.palette.secondaryMainColor} !important` : `${theme.palette.paperColor} !important`,
        border: theme.isOldDesign ? `1px solid ${theme.palette.secondaryMainColor}` : null,
        paddingTop: 4,
        paddingLeft: 10,
        paddingRight: 10,
        height: 37,
        boxSizing: 'border-box',
    },
});

const CustomIcon = ({ classes, iconClassName }) => (
    <div className={classes.fontAwesomeIcon}>
        <i className={iconClassName}></i>
    </div>
);

export default withStyles(styles)(CustomIcon);