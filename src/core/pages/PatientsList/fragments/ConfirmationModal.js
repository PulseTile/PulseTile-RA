import React, { Component } from "react"

import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withMobileDialog from '@material-ui/core/withMobileDialog';

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
            minWidth: 500,
            marginBottom: 10,
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
    description: {
        padding: 20,
        fontSize: 15,
        textAlign: "justify",
    },
    toolbar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginRight: 15,
    },
    agreeButton: {
        display: "block",
        width: 140,
        height: 40,
        margin: "8px !important",
        color: theme.palette.paperColor,
        backgroundColor: theme.palette.secondaryMainColor,
        borderRadius: theme.isRectangleButtons ? 0 : 25,
        textTransform: 'capitalize',
        fontSize: 16,
        fontWeight: 800,
        "&:hover": {
            color: theme.palette.secondaryMainColor,
            backgroundColor: theme.palette.paperColor,
            border: `1px solid ${theme.palette.secondaryMainColor}`
        },
    },
    declineButton: {
        display: "block",
        width: 140,
        height: 40,
        margin: "8px !important",
        color: theme.palette.paperColor,
        backgroundColor: theme.palette.dangerColor,
        borderRadius: theme.isRectangleButtons ? 0 : 25,
        textTransform: 'capitalize',
        fontSize: 16,
        fontWeight: 800,
        "&:hover": {
            color: theme.palette.dangerColor,
            backgroundColor: theme.palette.paperColor,
            border: `1px solid ${theme.palette.dangerColor}`
        },
    }
});

class HandleErrorModal extends Component {

    render() {
        const { classes, open, handleClose, agreeAction, ...rest } = this.props;
        return (
            <React.Fragment>
                <Dialog open={open} {...rest}>
                    <div className={classes.dialogBlock} >
                        <Typography className={classes.titleBlock}>
                            Patient Access Disclaimer
                        </Typography>
                        <Typography className={classes.description}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Sed nec lobortis elit.
                            Aenean mi nunc, feugiat ut aliquet non, iaculis vel tellus.
                            Donec semper felis placerat, posuere nisi a, suscipit turpis.
                            Integer sit amet lacus pellentesque, vestibulum libero id, sagittis nisi.
                            Phasellus eleifend, neque eget vulputate semper, enim dui dictum neque, non iaculis felis augue at nunc.
                        </Typography>
                        <div className={classes.toolbar}>
                            <Button aria-label="Close" className={classes.declineButton} onClick={() => handleClose()}>Decline</Button>
                            <Button aria-label="Agree" className={classes.agreeButton} onClick={() => agreeAction()}>Agree</Button>
                        </div>
                    </div>
                </Dialog>
            </React.Fragment>
        );
    }

};

export default withStyles(styles)(withMobileDialog({breakpoint: 'xs'})(HandleErrorModal));
