import React, { Component } from 'react';

import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowUpIcon from '@material-ui/icons/ArrowDropUp';

import ColumnsTogglePopover from "../popovers/ColumnsTogglePopover";

const styles = theme => ({
    icon: {
        color: theme.isOldDesign ? `${theme.palette.secondaryMainColor} !important` : `${theme.palette.paperColor} !important`,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 5,
        border: theme.isOldDesign ? `1px solid ${theme.palette.secondaryMainColor}` : null,
        borderRadius: 0,
        width: 'auto',
        height: 38,
    },
});

class ColumnsTogglingIcon extends Component {

    state = {
        anchorEl: null,
    };

    popoverOpen = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    popoverClose = () => {
        this.setState({
            anchorEl: false,
        });
    };

    render() {
        const { classes, hasColumnsToggling, hiddenColumns } = this.props;
        const { anchorEl } = this.state;

        if (!hasColumnsToggling) {
            return null;
        }

        const open = Boolean(anchorEl);

        return (
            <React.Fragment>
                <Tooltip title="Table">
                    <IconButton className={classes.icon} onClick={e => this.popoverOpen(e)}>
                        <SettingsIcon  />
                        { open ? <ArrowDownIcon /> : <ArrowUpIcon /> }
                    </IconButton>
                </Tooltip>
                <ColumnsTogglePopover
                    anchorEl={anchorEl}
                    open={open}
                    handleClose={this.popoverClose}
                    hiddenColumns={hiddenColumns}
                    {...this.props}
                />
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(ColumnsTogglingIcon);
