import React, { Component } from "react";
import { connect } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import ContrastIcon from '@material-ui/icons/Tonality';
import Tooltip from '@material-ui/core/Tooltip';

import { contrastModeAction } from "../../actions/contrastModeAction";

/**
 * Thic component returns Contrast Mode button
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
class ContrastMode extends Component {

    state = {
        isContrastMode: false,
    };

    toggleContrastMode = () => {
        this.setState(
            state => ({ isContrastMode: !this.state.isContrastMode }),
            () => this.props.contrastModeAction(this.state.isContrastMode)
        );
    };

    render() {
        const { classes, contrastMode } = this.props;
        return (
            <div className={classes.rightBlockItem}>
                <Tooltip title="Contrast mode">
                    <IconButton
                        className={classes.rightBlockButton}
                        aria-haspopup="true"
                        color="inherit"
                        onClick={this.toggleContrastMode}
                        aria-label="Contrast mode"
                    >
                        <ContrastIcon />
                    </IconButton>
                </Tooltip>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        contrastMode: state.custom.contrastMode.data,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        contrastModeAction(mode) {
            dispatch(contrastModeAction.request(mode));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContrastMode);
