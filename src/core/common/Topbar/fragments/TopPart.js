import React, { Component } from "react";

import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CardMedia from "@material-ui/core/CardMedia";
import BackIcon from "@material-ui/icons/KeyboardBackspace";
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';

import logo from "../../../images/pulsetile-core-logo.png";

const styles = {
    whitePart: {
        backgroundColor: "white",
    },
    backButton: {
        color: "#0D672F",
    },
    userMenuButton: {
        color: "#0D672F",
    },
};

/**
 * This component returns top part of Showcase TopBar
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @constructor
 */
class TopPart extends Component {

    state = {
        anchorEl: null,
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes, history, logout } = this.props;
        const { anchorEl } = this.state;
        const isTopbarMenuOpen = Boolean(anchorEl);
        return (
            <Toolbar className={classes.whitePart}>
                <IconButton
                    className={classes.backButton}
                    onClick={() => history.goBack()}
                    color="inherit" >
                    <BackIcon />
                </IconButton>
                <CardMedia
                    component="img"
                    alt="Pulse Tile"
                    className={classes.logo}
                    height="38px"
                    image={logo}
                    title="Pulse Tile"
                />
                <div>
                    <IconButton
                        className={classes.userNemuButton}
                        aria-owns={isTopbarMenuOpen ? 'menu-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                        color="inherit" >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={isTopbarMenuOpen}
                        onClose={this.handleClose} >
                        {logout}
                    </Menu>
                </div>
            </Toolbar>
        );
    }
}

export default withStyles(styles)(TopPart);
