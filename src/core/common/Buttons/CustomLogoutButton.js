import React from "react";
import { connect } from 'react-redux';
import { userLogout } from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ExitIcon from '@material-ui/icons/ExitToApp';

const styles = theme => ({
    button: {
        display: "block",
        width: 140,
        height: 40,
        margin: "8px !important",
        color: "white",
        backgroundColor: theme.buttons.logout.backgroundColor,
        border: theme.buttons.logout.border,
        borderRadius: 20,
        fontSize: 16,
        fontWeight: 800,
        "&:hover": {
            color: theme.buttons.logout.backgroundColor,
            backgroundColor: "white",
        },
    },
    icon: {
        marginLeft: 10,
    },
});

/**
 * This component returns custom Logout button
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {func}  userLogout
 */
const CustomLogoutButton = ({ classes, userLogout }) => {
    return (
        <IconButton className={classes.button} onClick={userLogout}>
            Sign Out
            <ExitIcon className={classes.icon} />
        </IconButton>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        userLogout() {
            dispatch( userLogout());
        }
    }
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(CustomLogoutButton));
