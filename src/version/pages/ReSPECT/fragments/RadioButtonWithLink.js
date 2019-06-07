import React from "react";

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    link: {
        color: theme.palette.secondaryMainColor,
    }
});

const RadioButtonWithLink = ({ classes, onRowClick }) => {
    return (
        <p>Yes (if so, document details in <span className={classes.link} onClick={() => onRowClick(10)}>emergency contact section</span>)</p>
    )
};

export default withStyles(styles)(RadioButtonWithLink);
