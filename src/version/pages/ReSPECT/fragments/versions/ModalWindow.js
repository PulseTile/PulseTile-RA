import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import Typography from "@material-ui/core/Typography";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';

const styles = theme => ({
    dialogBlock: {
        minHeight: 300,
        minWidth: 500,
    },
    titleBlock: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: theme.palette.mainColor,
        paddingTop: 10,
        paddingLeft: 15,
        paddingBottom: 10,
    },
    sectionTitle: {
        color: "#fff",
        fontWeight: 800,
        fontSize: 18,
    },
    closeIcon: {
        color: "#fff",
        float: "right",
        height: 25,
    },
    mainText: {
        marginTop: 70,
        textAlign: "center",
        fontWeight: 800,
        fontSize: 16,
    },
    toolbar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        margin: 30,
    },
    proceedButton: {
        display: "block",
        width: 130,
        height: 40,
        margin: "8px !important",
        padding: 0,
        color: theme.palette.mainColor,
        border: `1px solid ${theme.palette.mainColor}`,
        borderRadius: 25,
        fontSize: 16,
        fontWeight: 800,
        "&:hover": {
            backgroundColor: theme.palette.mainColor,
            color: "#fff",
        }
    },
    cancelButton: {
        display: "block",
        width: 130,
        height: 40,
        margin: "8px !important",
        padding: 0,
        textTransform: "capitalize",
        color: theme.palette.dangerColor,
        fontSize: 16,
        fontWeight: 800,
        "&:hover": {
            backgroundColor: theme.palette.dangerColor,
            color: "#fff",
            borderRadius: 25,
            border: `1px solid ${theme.palette.dangerColor}`,
        }
    }
});

/**
 * This component returns content and functionality of dialog window
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
class ModalWindow extends Component {

    onProceedClick = () => {
        this.props.toggleMode();
    };

    render() {
        const { classes, onClose, ...rest } = this.props;
        return (
            <Dialog onBackdropClick={() => onClose()} {...rest}>
                <div className={classes.dialogBlock} >
                    <div className={classes.titleBlock}>
                        <Typography className={classes.sectionTitle}>Create a New Version</Typography>
                        <Tooltip title="Close">
                            <IconButton className={classes.closeIcon} color="inherit" onClick={() => onClose()}>
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <Typography className={classes.mainText}>
                        Please confirm you would like to create a new version
                    </Typography>
                    <div className={classes.toolbar}>
                        <Tooltip title="Proceed">
                            <IconButton className={classes.proceedButton} onClick={() => this.onProceedClick()}>
                                Proceed
                                <DoneIcon />
                            </IconButton>
                        </Tooltip>
                        <Button onClick={() => onClose()} className={classes.cancelButton}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Dialog>
        );
    }
};

export default withStyles(styles)(ModalWindow);
