import React from "react";

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import BlockIcon from '@material-ui/icons/Block';

const styles = theme => ({
    button: {
        display: "block",
        width: 100,
        height: 40,
        margin: "8px !important",
        color: "#fff",
        backgroundColor: theme.buttons.cancelButton.backgroundColor,
        border: theme.buttons.cancelButton.border,
        borderRadius: 20,
        fontSize: 16,
        fontWeight: 800,
        "&:hover": {
            color: theme.buttons.cancelButton.colorHover,
            backgroundColor: "#fff",
        }
    }
});

/**
 * This component returns Cancel button
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {func}  redirectTo
 */
const CancelButton = ({ classes, redirectTo }) => (
    <IconButton className={classes.button} onClick={() => redirectTo('show')}>
        <BlockIcon /> Cancel
    </IconButton>
);

export default withStyles(styles)(CancelButton);
