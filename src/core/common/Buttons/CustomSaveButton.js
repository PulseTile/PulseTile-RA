import React from "react";
import { SaveButton } from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';

import { MAIN_COLOR } from "../../config/styles";

const styles = {
    saveButton: {
        display: "block",
        width: "130px",
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
        "& span": {
            textTransform: "capitalize"
        },
        "&:hover": {
            backgroundColor: "white",
            color: MAIN_COLOR,
        }
    },
};

/**
 * This component returns Save button with custom styles
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 */
const CustomSaveButton = ({ classes, ...rest }) => (
    <SaveButton label="Complete" icon={<DoneIcon />} className={classes.saveButton} {...rest} />
);

export default withStyles(styles)(CustomSaveButton);
