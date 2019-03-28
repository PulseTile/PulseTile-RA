import React, { Component } from "react"

import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import CustomLogoutButton from "../Buttons/CustomLogoutButton";

const styles = theme => ({
    dialogBlock: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 300,
        minWidth: 500,
        marginBottom: 10,
    },
    titleBlock: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: 48,
        paddingLeft: 20,
        backgroundColor: theme.palette.mainColor,
        color: "#fff",
        fontSize: 18,
        fontWeight: 800,
    },
    description: {
        fontSize: 15,
        textAlign: "center",
    },
    toolbar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginRight: 15,
    },
    reloadButton: {
        display: "block",
        width: 140,
        height: 40,
        margin: "8px !important",
        color: "white",
        backgroundColor: theme.palette.dangerColor,
        borderRadius: 25,
        fontSize: 16,
        fontWeight: 800,
        "&:hover": {
            color: theme.palette.dangerColor,
            backgroundColor: "white",
        },
    }
});

function isSessionExpired(status, message) {
    return (Number(status) === 400 && message.includes('JWT')) || Number(status) === 403;
}

function getErrorDescription(status, isJwtOld) {
    let result = 'Something wrong';
    switch (true) {
        case Number(status) === 404:
            result = 'API is currently unavailable';
            break;
        case Number(status) > 499:
            result = 'Something is wrong with the server. Please try again later.';
            break;
        case isJwtOld:
            result = 'Your session has expired. Click the button to log in again.';
            break;
    }
    return result;
}

class HandleErrorModal extends Component {

    render() {
        const { classes, status, message, onClose, ...rest } = this.props;
        const isJwtOld = isSessionExpired(status, message);
        const errorDescription = getErrorDescription(status, isJwtOld);
        return (
            <Dialog {...rest}>
                <div className={classes.dialogBlock} >
                    <Typography className={classes.titleBlock}>
                        Connection Error
                    </Typography>
                    <Typography className={classes.description}>{errorDescription}</Typography>
                    <div className={classes.toolbar}>
                        <Button aria-label="Close" onClick={() => onClose()}>Close</Button>
                        { isJwtOld
                            ? <CustomLogoutButton title="Login again" isIconAbsent={true} />
                            : <Button aria-label="Reload page" className={classes.reloadButton} onClick={() => window.location.reload()}>Reload page</Button>
                        }
                    </div>
                </div>
            </Dialog>
        );
    }
}

export default withStyles(styles)(HandleErrorModal);
