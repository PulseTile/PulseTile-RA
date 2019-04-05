import React, { Component } from "react";
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import DialogWithStyles from "./DialogWithStyles";

const styles = {
    settingsIconBlock: {
        paddingLeft: 20,
    },
    title: {
        marginLeft: 10,
    },
};

/**
 * This component returns button which calls settings dropdown
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
class SettingsDialog extends Component {

    state = {
        open: false,
    };

    toggleDialog = () => {
        this.setState({
            open: !this.state.open,
        });
    };

    render() {
        const { classes } = this.props;
        const { open } = this.state;
        return (
            <div className={classes.settingsIconBlock}>
                <Tooltip title="Settings">
                    <IconButton id="icon-settings" aria-haspopup="true" aria-label="Settings" color="inherit" onClick={() => this.toggleDialog()}>
                        <SettingsIcon />
                        <Typography variant="h1" className={classes.title}>Home</Typography>
                    </IconButton>
                </Tooltip>
                <DialogWithStyles open={open} onClose={this.toggleDialog} />
            </div>
        );
    }
}

export default withStyles(styles)(SettingsDialog);