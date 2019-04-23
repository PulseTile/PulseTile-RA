import React, { Component } from "react";
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

import { versionsServerAction } from "../../../../actions/ReSPECT/versionsServerAction";

const styles = theme => ({
    createButton: {
        display: "block",
        float: "right",
        width: 100,
        height: 40,
        margin: 8,
        padding: 0,
        backgroundColor: "white",
        color: theme.palette.mainColor,
        border: `1px solid ${theme.palette.mainColor}`,
        borderRadius: 25,
        fontSize: 16,
        fontWeight: 800,
        "&:hover": {
            backgroundColor: theme.palette.mainColor,
            color: "white",
        }
    }
});

class VersionCreateButton extends Component {

    async onClickHandler() {
        await this.props.createNewVersion();
        await this.props.getVersionsFromServer();
        this.props.toggleMode();
    };

    render() {
        const { classes } = this.props;
        return (
            <Tooltip title="Create">
                <IconButton aria-label="Create" className={classes.createButton} onClick={() => this.onClickHandler()}>
                    <AddIcon /> Create
                </IconButton>
            </Tooltip>
        );
    }

};

const mapDispatchToProps = dispatch => {
    return {
        createNewVersion() {
            dispatch(versionsServerAction.create());
        },
        getVersionsFromServer() {
            dispatch(versionsServerAction.request());
        },
    }
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(VersionCreateButton))