import React from "react";
import { SaveButton } from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';

const styles = theme => ({
    saveButton: {
        display: "flex",
        alignItems: "flex-end",
        width: 130,
        height: 40,
        margin: 8,
        backgroundColor: theme.palette.secondaryMainColor,
        color: "white",
        border: `1px solid ${theme.palette.secondaryMainColor}`,
        borderRadius: theme.isRectangleButtons ? 0 : 25,
        fontSize: 16,
        fontWeight: 800,
        padding: 0,
        "& svg": {
            marginRight: 5,
        },
        "& span": {
            textTransform: "capitalize"
        },
        "&:hover": {
            backgroundColor: "white",
            color: theme.palette.secondaryMainColor,
        }
    },
});

/**
 * This component returns Save button with custom styles
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 */
const CustomSaveButton = ({ classes, ...rest }) => (
    <SaveButton aria-label="Complete" label="Complete" icon={<DoneIcon className={classes.icon} />} className={classes.saveButton} {...rest} />
);

export default withStyles(styles)(CustomSaveButton);
