import React from "react";
import { Toolbar, SaveButton } from "react-admin";

import { withStyles } from '@material-ui/core/styles';

import CancelButton from "./Buttons/CancelButton";

import { MAIN_COLOR } from "../config/styles";

const styles = {
    saveButton: {
        display: "block",
        width: "100px",
        height: "40px",
        margin: "8px !important",
        backgroundColor: MAIN_COLOR,
        color: "white",
        border: "1px solid " + MAIN_COLOR,
        borderRadius: "20px",
        fontSize: "16px",
        fontWeight: "800",
        padding: "0px",
        "& svg": {
            marginRight: "2px"
        },
        "&:hover": {
            backgroundColor: "white",
            color: MAIN_COLOR,
        }
    }
};

/**
 * This component returns toolbar without delete button for edit forms
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} props
 * @constructor
 */
const EditToolbar = ({ classes, changeViewType, ...props}) => {
    return (
        <Toolbar {...props} >
            <CancelButton onClickFunction={changeViewType} />
            <SaveButton className={classes.saveButton} />
        </Toolbar>
    );
}

export default withStyles(styles)(EditToolbar);
