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
        backgroundColor: theme.palette.secondaryMainColor,
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
    modalBody: {
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    mainText: {
        paddingBottom: 10,
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
        color: theme.palette.secondaryMainColor,
        border: `1px solid ${theme.palette.secondaryMainColor}`,
        borderRadius: 25,
        fontSize: 16,
        fontWeight: 800,
        "&:hover": {
            backgroundColor: theme.palette.secondaryMainColor,
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
        backgroundColor: theme.palette.dangerColor,
        border: `1px solid ${theme.palette.dangerColor}`,
        color: theme.palette.paperColor,
        fontSize: 16,
        borderRadius: 25,
        fontWeight: 800,
        "&:hover": {
            color: theme.palette.dangerColor,
            backgroundColor: theme.palette.paperColor,
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
                    <div className={classes.modalBody}>
                        <Typography className={classes.mainText}>
                            Please confirm you would like to create a new version
                        </Typography>
                        <Typography className={classes.mainText}>
                            While editing you can Save your changes temporarily before you then Publish a new version.
                        </Typography>
                        <Typography className={classes.mainText}>
                            In order to publish a new version, the completion of sections 4 and 6 are mandatory.
                        </Typography>
                    </div>
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
