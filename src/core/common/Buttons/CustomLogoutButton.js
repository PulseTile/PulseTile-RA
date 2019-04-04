import React from "react";
import { connect } from 'react-redux';
import { userLogout } from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ExitIcon from '@material-ui/icons/ExitToApp';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    button: {
        display: "block",
        width: 140,
        height: 40,
        margin: "8px !important",
        color: "white",
        backgroundColor: theme.palette.mainColor,
        border: `1px solid ${theme.palette.mainColor}`,
        borderRadius: 25,
        fontSize: 16,
        fontWeight: 800,
        "&:hover": {
            color: theme.palette.mainColor,
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
 * @param {shape}   classes
 * @param {func}    userLogout
 * @param {string}  title
 * @param {boolean} hideIcon
 */
const CustomLogoutButton = ({ classes, userLogout, title = "Sign Out", hideIcon }) => {
    return (
        <Tooltip title={title}>
            <IconButton aria-label="Sign Out" className={classes.button} onClick={() => userLogout()}>
                {title}
                { !hideIcon && <ExitIcon className={classes.icon} /> }
            </IconButton>
        </Tooltip>
    );
};

const mapDispatchToProps = {
    userLogout,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(CustomLogoutButton));
