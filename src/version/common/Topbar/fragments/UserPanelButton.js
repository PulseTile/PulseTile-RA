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

    componentDidMount() {
        this.props.getUserInfo();
    }

    render() {
        const { classes, userInfo } = this.props;
        const { isOpen, anchorEl } = this.state;
        return (
            <div className={classes.rightBlockItem} ref={this.button}>
                <IconButton
                    id="icon-profile"
                    className={classes.rightBlockButton}
                    aria-owns={isOpen ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu.bind(this)}
                    color="inherit" >
                    <PersonIcon />
                </IconButton>
                <Popover
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={isOpen}
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
