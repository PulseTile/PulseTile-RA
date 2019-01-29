import React from "react";

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
    editButton: {
        display: "block",
        width: "85px",
        height: "40px",
        margin: "8px !important",
        backgroundColor: "white",
        color: theme.buttons.editButton.color,
        border: theme.buttons.editButton.border,
        borderRadius: "20px",
        fontSize: "16px",
        fontWeight: "800",
        "&:hover": {
            backgroundColor: theme.buttons.editButton.backgroundColorHover,
            color: "white",
        }
    }
});

/**
 * This component returns Edit button
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {func}  redirectTo
 */
const EditButton = ({ classes, redirectTo }) => (
    <IconButton className={classes.editButton} onClick={() => redirectTo('edit')}>
        <EditIcon /> Edit
    </IconButton>
);

export default withStyles(styles)(EditButton);
