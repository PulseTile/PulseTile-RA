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
        width: 110,
        height: 40,
        margin: 8,
        padding: 0,
        backgroundColor: "white",
        color: theme.palette.secondaryMainColor,
        border: `1px solid ${theme.palette.secondaryMainColor}`,
        borderRadius: 25,
        fontSize: 16,
        fontWeight: 800,
        "&:hover": {
            backgroundColor: theme.palette.secondaryMainColor,
            color: theme.palette.paperColor,
        }
    }
});

class VersionCreateButton extends Component {

    state = {
        isLoading: false,
    };

    async onClickHandler() {
        await this.props.createNewVersion();
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
    }
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(VersionCreateButton))