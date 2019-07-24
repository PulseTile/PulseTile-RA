import React from "react";
import { Toolbar, ListButton } from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import BlockIcon from '@material-ui/icons/Block';

import CustomSaveButton from "../../common/Buttons/CustomSaveButton";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

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
 * @param {shape}  classes
 * @param {string} resourceUrl
 * @param {shape}  history
 * @param {shape}  props
 */
const CreateFormToolbar = ({ classes, resourceUrl, history, ...props}) => {
    return (
        <Toolbar className={classes.toolbar} {...props} >
            <Tooltip title="Cancel" disableHoverListener={true}>
                <IconButton type="button" className={classes.listButton} onClick={() => history.push('/' + resourceUrl)}>
                    <BlockIcon />
                    Cancel
                </IconButton>
            </Tooltip>
            <CustomSaveButton {...props} />
        </Toolbar>
    );
};

export default withStyles(styles)(CreateFormToolbar);