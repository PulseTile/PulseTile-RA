import React from "react";

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import { MAIN_COLOR } from "../../config/styles";

const styles = {
    createButton: {
        display: "block",
        width: "100px",
        height: "40px",
        margin: "8px !important",
        backgroundColor: "white",
        color: MAIN_COLOR,
        border: "1px solid " + MAIN_COLOR,
        borderRadius: "20px",
        fontSize: "16px",
        fontWeight: "800",
        "&:hover": {
            backgroundColor: MAIN_COLOR,
            color: "white",
        }
    }
};

/**
 * This component returns Edit button
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}  classes
 * @param {shape}  history
 * @param {string} createPath
 */
const CreateButton = ({ classes, history, createPath }) => (
    <IconButton className={classes.createButton} onClick={() => history.push(createPath)}>
        <AddIcon /> Create
    </IconButton>
);

export default withStyles(styles)(CreateButton);
