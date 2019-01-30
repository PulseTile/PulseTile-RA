import React, { Component } from "react";
import { connect } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import ContrastIcon from '@material-ui/icons/Tonality';

import { contrastModeAction } from "../../actions/contrastModeAction";

/**
 * Thic component returns Contrast Mode button
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
class ContrastMode extends Component {

    state = {
        isContrastMode: this.props.contrastMode,
    };

    toggleContrastMode = () => {
        this.setState(
            { isContrastMode: !this.state.isContrastMode },
            () => this.props.contrastModeAction(this.state.isContrastMode)
        );
    };

    render() {
        const { classes, contrastMode } = this.props;
        return (
            <div className={classes.rightBlockItem}>
                <IconButton
                    className={classes.rightBlockButton}
                    aria-haspopup="true"
                    color="inherit"
                    onClick={() => this.toggleContrastMode()}>
                    <ContrastIcon />
                </IconButton>
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
