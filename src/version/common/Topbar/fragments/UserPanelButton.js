import React, { Component } from "react";
import { get } from "lodash";
import { connect } from 'react-redux';

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Card from '@material-ui/core/Card';
import PersonIcon from '@material-ui/icons/Person';

import { userInfoAction } from "../../../../core/actions/userInfoAction";
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

    state = {
        anchorEl: null,
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    componentDidMount() {
        this.props.getUserInfo();
    }

    render() {
        const { classes, logout, userInfo } = this.props;
        const { anchorEl } = this.state;
        const isTopbarMenuOpen = Boolean(anchorEl);
        return (
            <div className={classes.rightBlockItem}>
                <IconButton
                    id="icon-profile"
                    className={classes.rightBlockButton}
                    aria-owns={isTopbarMenuOpen ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit" >
                    <PersonIcon />
                </IconButton>
                <Popover
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={isTopbarMenuOpen}
                    onClose={this.handleClose} >
                    <Card className={classes.userPanel}>
                        <Typography className={classes.userName}>
                            {get(userInfo, 'given_name', null) + ' ' + get(userInfo, 'family_name', null)}
                        </Typography>
                        <Typography className={classes.userRole}>
                            <span>User role:</span> {get(userInfo, 'role', null)}
                        </Typography>
                        <CustomLogoutButton classes={classes} />
                    </Card>
                </Popover>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.custom.userInfo.data,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUserInfo() {
            dispatch(userInfoAction.request());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserPanelButton));
