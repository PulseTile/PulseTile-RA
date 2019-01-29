import React from "react";

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import BlockIcon from '@material-ui/icons/Block';

const styles = {
    button: {
        display: "block",
        width: "100px",
        height: "40px",
        margin: "8px !important",
        color: "white",
        backgroundColor: "#da534f",
        border: "1px solid #da534f",
        borderRadius: "20px",
        fontSize: "16px",
        fontWeight: "800",
        "&:hover": {
            color: "#da534f",
            backgroundColor: "white",
        }
    }
};

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
