import React from "react";
import { Toolbar, SaveButton } from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import BlockIcon from '@material-ui/icons/Block';

const styles = theme => ({
    toolbar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    saveButton: {
        display: "flex",
        alignItems: "flex-end",
        width: 130,
        height: 40,
        color: theme.palette.paperColor,
        border: `1px solid ${theme.palette.secondaryMainColor}`,
        backgroundColor: theme.palette.secondaryMainColor,
        borderRadius: theme.isRectangleButtons ? 0 : 20,
        fontSize: 16,
        fontWeight: 800,
        "& svg": {
            marginRight: 5,
        },
        "& span": {
            textTransform: "capitalize",
        },
        "&:hover": {
            color: theme.palette.secondaryMainColor,
            backgroundColor: theme.palette.paperColor,
        }
    },
    cancelButton: {
        display: "flex",
        alignItems: "flex-end",
        width: 110,
        height: 40,
        marginRight: 15,
        backgroundColor: theme.palette.dangerColor,
        color: theme.palette.paperColor,
        borderRadius: theme.isRectangleButtons ? 0 : 20,
        fontSize: 16,
        fontWeight: 800,
        "& svg": {
            marginRight: 5,
        },
        "& span": {
            textTransform: "capitalize",
        },
        "&:hover": {
            backgroundColor: theme.palette.paperColor,
            color: theme.palette.dangerColor,
            border: `1px solid ${theme.palette.dangerColor}`,
        }
    }
});

const SectionToolbar = ({ classes, onRowClick }) => {
    return (
        <Toolbar className={classes.toolbar}>
            <Tooltip title="Cancel" disableHoverListener={true}>
                <IconButton type="button" className={classes.cancelButton} onClick={() => onRowClick(null)}>
                    <BlockIcon />
                    Cancel
                </IconButton>
            </Tooltip>
            <Tooltip title="Complete" disableHoverListener={true}>
                <IconButton type="submit" className={classes.saveButton}>
                    <DoneIcon />
                    Complete
                </IconButton>
            </Tooltip>

        </Toolbar>
    );
};

export default withStyles(styles)(SectionToolbar);