import React from "react";

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import { MAIN_COLOR } from "../../config/styles";

const styles = {
    editButton: {
        display: "block",
        width: "85px",
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
 * @param {shape} classes
 * @param {func}  onClickFunction
 */
const EditButton = ({ classes, onClickFunction }) => (
    <IconButton className={classes.editButton} onClick={() => onClickFunction('edit')}>
        <EditIcon /> Edit
    </IconButton>
);

export default withStyles(styles)(EditButton);
