import React, { Component } from "react";
import { connect } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Tooltip from '@material-ui/core/Tooltip';

import DialogWithStyles from "./DialogWithStyles";

/**
 * This component returns button which calls settings dropdown
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
export default class SettingsDialog extends Component {

    state = {
        open: false,
    };

    toggleDialog = () => {
        this.setState({
            open: !this.state.open,
        });
    };

    render() {
        const { open } = this.state;
        return (
            <React.Fragment>
                <Tooltip title="Settings">
                    <IconButton id="icon-settings" aria-haspopup="true" color="inherit" onClick={() => this.toggleDialog()}>
                        <SettingsIcon />
                    </IconButton>
                </Tooltip>
                <span>Home</span>
                <DialogWithStyles open={open} onClose={this.toggleDialog} />
            </React.Fragment>
        );
    }
}