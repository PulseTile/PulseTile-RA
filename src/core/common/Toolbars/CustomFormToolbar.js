import React from "react";
import { Toolbar } from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import Button from '@material-ui/core/Button';
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
        color: "#fff",
        border: `1px solid ${theme.palette.secondaryMainColor}`,
        backgroundColor: theme.palette.secondaryMainColor,
        borderRadius: theme.isOldDesign ? 0 : 20,
        fontSize: 16,
        fontWeight: 800,
        "& svg": {
            marginRight: 2,
        },
        "& span": {
            textTransform: "capitalize",
        },
        "&:hover": {
            color: theme.palette.secondaryMainColor,
            backgroundColor: "#fff",
        }
    },
    cancelButton: {
        display: "block",
        width: 150,
        height: 40,
        paddingTop: "6px !important",
        paddingLeft: "8px !important",
        backgroundColor: theme.palette.dangerColor,
        color: theme.palette.paperColor,
        borderRadius: theme.isOldDesign ? 0 : 20,
        fontSize: 16,
        fontWeight: 800,
        "& svg": {
            marginRight: 2,
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

const SectionToolbar = ({ classes, history, resourceUrl }) => (
    <Toolbar className={classes.toolbar}>
        <Button className={classes.cancelButton} onClick={() => history.push('/' + resourceUrl)}>Cancel</Button>
        <Tooltip title="Complete" disableHoverListener={true}>
            <IconButton type="submit" className={classes.saveButton}>
                Complete
                <DoneIcon />
            </IconButton>
        </Tooltip>
    </Toolbar>
);

export default withStyles(styles)(SectionToolbar);