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
            padding: 0,
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
});

const DialogTemplate = ({ classes, title, isOpen, onClose, children }) => {

    return (
        <Dialog open={isOpen} fullWidth={true} maxWidth='lg' onBackdropClick={() => onClose()}>
            <div className={classes.dialogBlock} >
                <Typography className={classes.titleBlock}>
                    {title}
                </Typography>
                { children }
            </div>
        </Dialog>
    );
};

export default withStyles(styles)(DialogTemplate);
