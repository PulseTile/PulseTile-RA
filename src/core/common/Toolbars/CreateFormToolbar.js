import React from "react";
import { Toolbar, ListButton } from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import BlockIcon from '@material-ui/icons/Block';

import CustomSaveButton from "../../common/Buttons/CustomSaveButton";

const styles = theme => ({
    listButton: {
        display: "flex",
        flexDirection: "row",
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
        },
        "& svg": {
            marginRight: 2,
        },
        "& span": {
            textTransform: "capitalize",
        },
    },
    toolbar: {
        backgroundColor: theme.palette.toolbarColor,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    }
});

/**
 * This component returns toolbar without delete button for create forms
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} props
 */
const CreateFormToolbar = ({ classes, ...props}) => {
    return (
        <Toolbar className={classes.toolbar} {...props} >
            <ListButton label="Cancel" icon={<BlockIcon />} className={classes.listButton} />
            <CustomSaveButton {...props} />
        </Toolbar>
    );
};

export default withStyles(styles)(CreateFormToolbar);