import React from "react";
import { Toolbar, SaveButton, ListButton } from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import BlockIcon from '@material-ui/icons/Block';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    toolbar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    saveButton: {
        display: "block",
        width: 150,
        height: 40,
        paddingTop: "6px !important",
        paddingLeft: "8px !important",
        backgroundColor: "#fff",
        border: `1px solid ${theme.palette.mainColor}`,
        color: theme.palette.mainColor,
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
            backgroundColor: theme.palette.mainColor,
            color: "#fff",
        }
    },
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
    },
});

const SectionToolbar = ({ classes }) => {
    return (
        <Toolbar className={classes.toolbar}>
            <ListButton label="Cancel" icon={<BlockIcon />} className={classes.listButton} />
            <Tooltip title="Complete" disableHoverListener={true}>
                <IconButton type="submit" className={classes.saveButton}>
                    Complete
                    <DoneIcon />
                </IconButton>
            </Tooltip>
        </Toolbar>
    );
};

export default withStyles(styles)(SectionToolbar);