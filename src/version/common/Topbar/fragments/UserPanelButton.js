import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Card from '@material-ui/core/Card';
import PersonIcon from '@material-ui/icons/Person';
import Tooltip from '@material-ui/core/Tooltip';

import CustomLogoutButton from "../../../../core/common/Buttons/CustomLogoutButton";

const styles = {
    userPanel: {
        minWidth: 220,
        padding: 12,
    },
    userName: {
        marginBottom: 7,
        fontSize: 18,
        fontWeight: 800,
    },
    userRole: {
        fontSize: 14,
        marginBottom: 7,
    }
};

/**
 * This component returns User panel popover
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
class UserPanelButton extends Component {

    constructor(props) {
        super(props);
        this.button = React.createRef();
    }

    state = {
        anchorEl: null,
        isOpen: false,
    };

    handleMenu = () => {
        this.setState(state => ({
            anchorEl: this.button.current,
            isOpen: !state.isOpen,
        }));
    };

    handleClose = () => {
        this.setState(state => ({
            anchorEl: null,
            isOpen: !state.isOpen,
        }));
    };

    render() {
        const { classes } = this.props;
        const { isOpen, anchorEl } = this.state;
        return (
            <div className={classes.rightBlockItem} ref={this.button}>
                <Tooltip title="User panel">
                    <IconButton
                        id="icon-profile"
                        className={classes.rightBlockButton}
                        aria-owns={isOpen ? 'menu-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleMenu.bind(this)}
                        color="inherit"
                        aria-label="User Panel"
                    >
                        <PersonIcon />
                    </IconButton>
                </Tooltip>
                <Popover
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={isOpen}
                    onClose={this.handleClose} >
                    <Card className={classes.userPanel}>
                        <Typography variant="h1" className={classes.userName}>
                            {localStorage.getItem('username')}
                        </Typography>
                        <Typography className={classes.userRole}>
                            <span>User role:</span> {localStorage.getItem('role')}
                        </Typography>
                        <CustomLogoutButton classes={classes} />
                    </Card>
                </Popover>
            </div>
        );
    }
}

export default withStyles(styles)(UserPanelButton);
