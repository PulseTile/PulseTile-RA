import React from "react";

import { withStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CustomLogoutButton from "../../../Buttons/CustomLogoutButton";

const styles = theme => ({
    dialogBlock: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        [theme.breakpoints.only('xs')]: {
            paddingTop: 0,
            paddingLeft: 20,
            paddingRight: 20,
        },
        [theme.breakpoints.up('sm')]: {
            minHeight: 300,
            minWidth: 600,
        },
    },
    titleBlock: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: 48,
        paddingLeft: 20,
        backgroundColor: theme.palette.secondaryMainColor,
        color: theme.palette.paperColor,
        fontSize: 18,
        fontWeight: 800,
    },
    toolbar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        backgroundColor: theme.palette.toolbarColor,
        marginTop: 10,
    },
    closeButton: {
        display: "block",
        width: 140,
        height: 40,
        margin: "8px !important",
        color: theme.palette.paperColor,
        backgroundColor: theme.palette.dangerColor,
        borderRadius: theme.isRectangleButtons ? 0 : 25,
        fontSize: 16,
        fontWeight: 800,
        "&:hover": {
            color: theme.palette.dangerColor,
            backgroundColor: theme.palette.paperColor,
        },
    },
    searchButton: {
        display: "block",
        width: 140,
        height: 40,
        margin: "8px !important",
        color: theme.palette.paperColor,
        backgroundColor: theme.palette.secondaryMainColor,
        borderRadius: theme.isRectangleButtons ? 0 : 25,
        fontSize: 16,
        fontWeight: 800,
        "&:hover": {
            color: theme.palette.secondaryMainColor,
            backgroundColor: theme.palette.paperColor,
        },
    }
});

const DialogTemplate = ({ classes, title, isOpen, onClose, children }) => {

    return (
        <Dialog open={isOpen} onBackdropClick={() => onClose()}>
            <div className={classes.dialogBlock} >
                <Typography className={classes.titleBlock}>
                    {title}
                </Typography>
                { children }

                <div className={classes.toolbar}>
                    <Button aria-label="Close" className={classes.closeButton} onClick={() => onClose()}>Close</Button>
                    <Button aria-label="Reload page" className={classes.searchButton}>Search</Button>
                </div>
            </div>
        </Dialog>
    );
};

export default withStyles(styles)(DialogTemplate);
