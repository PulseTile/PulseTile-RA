import React from "react";

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    createButton: {
        display: "block",
        width: 100,
        height: 40,
        margin: 8,
        backgroundColor: "white",
        color: theme.buttons.createButton.color,
        border: theme.buttons.createButton.border,
        borderRadius: 20,
        fontSize: 16,
        fontWeight: 800,
        "&:hover": {
            backgroundColor: theme.buttons.createButton.backgroundColorHover,
            color: "white",
        }
    }
});

/**
 * This component returns Edit button
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}  classes
 * @param {shape}  history
 * @param {string} redirectPath
 */
const CreateButton = ({ classes, history, redirectPath }) => (
    <IconButton className={classes.createButton} onClick={() => history.push(redirectPath)}>
        <AddIcon /> Create
    </IconButton>
);

export default withStyles(styles)(CreateButton);
