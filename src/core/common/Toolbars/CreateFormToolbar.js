import React from "react";
import { Toolbar, SaveButton, ListButton } from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import BlockIcon from '@material-ui/icons/Block';

import CustomSaveButton from "../../common/Buttons/CustomSaveButton";

const styles = theme => ({
    listButton: {
        display: "block",
        width: 120,
        height: 40,
        paddingTop: "6px !important",
        paddingLeft: "8px !important",
        backgroundColor: theme.palette.dangerColor,
        border: `1px solid ${theme.palette.dangerColor}`,
        color: "#fff",
        borderRadius: 20,
        fontSize: 16,
        fontWeight: 800,
        "& svg": {
            marginRight: 2,
        },
        "& span": {
            textTransform: "capitalize",
        },
        "&:hover": {
            backgroundColor: "#fff",
            color: theme.palette.dangerColor,
        }
    }
});

/**
 * This component returns toolbar without delete button for create forms
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} props
 * @constructor
 */
const CreateFormToolbar = ({ classes, changeViewType, ...props}) => {
    return (
        <Toolbar {...props} >
            <ListButton label="Cancel" icon={<BlockIcon />} className={classes.listButton} />
            <CustomSaveButton {...props} />
        </Toolbar>
    );
}

export default withStyles(styles)(CreateFormToolbar);