import React from "react";

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import BlockIcon from '@material-ui/icons/Block';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    button: {
        display: "block",
        width: 110,
        height: 40,
        margin: "8px !important",
        padding: 0,
        color: theme.palette.paperColor,
        backgroundColor: theme.palette.dangerColor,
        border: `1px solid ${theme.palette.dangerColor}`,
        borderRadius: theme.isRectangleButtons ? 0 : 25,
        fontSize: 16,
        fontWeight: 800,
        "&:hover": {
            color: theme.palette.dangerColor,
            backgroundColor: theme.palette.paperColor,
        }
    },
    icon: {
        paddingRight: 5,
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
    <Tooltip title="Cancel">
        <IconButton aria-label="Cancel" className={classes.button} onClick={() => redirectTo('show')}>
            <BlockIcon className={classes.icon} /> Cancel
        </IconButton>
    </Tooltip>
);

export default withStyles(styles)(CancelButton);
