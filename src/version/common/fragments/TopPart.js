import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import HelpIcon from '@material-ui/icons/Help';
import ContrastIcon from '@material-ui/icons/Tonality';
import CardMedia from "@material-ui/core/CardMedia";
import HomeIcon from "@material-ui/icons/Home";
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';

import helmLogo from "../../images/helm-logo.png";
import nhs from "../../images/nhs.png";

const styles = {
    whitePart: {
        backgroundColor: "white",
        justifyContent: "space-around",
    },
    image: {
        width: "auto",
    },
    backButton: {
        color: "#3596f4",
    },
    helpButton: {
        color: "#3596f4",
    },
    contrastButton: {
        color: "#3596f4",
    },
    userNemuButton: {
        color: "#3596f4",
    },
    emptyBlock: {
        flexGrow: 1,
    }
};

/**
 * This component returns Top part of Helm Topbar
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
class WhitePart extends Component {

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
                <Link to="/charts" className={classes.backButton} color="inherit" >
                    <HomeIcon />
                </Link>
                <CardMedia
                    className={classes.image}
                    component="img"
                    alt="Pulse Tile"
                    height="38px"
                    image={helmLogo}
                    title="Pulse Tile"
                />
                <div className={classes.emptyBlock}></div>
                <CardMedia
                    className={classes.image}
                    component="img"
                    alt="Pulse Tile"
                    height="38px"
                    image={nhs}
                    title="Pulse Tile"
                />
                <IconButton
                    className={classes.helpButton}
                    aria-haspopup="true"
                    color="inherit" >
                    <HelpIcon />
                </IconButton>
                <IconButton
                    className={classes.contrastButton}
                    aria-haspopup="true"
                    color="inherit" >
                    <ContrastIcon />
                </IconButton>
                <div>
                    <IconButton
                        className={classes.userNemuButton}
                        aria-owns={isTopbarMenuOpen ? 'menu-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                        color="inherit" >
                        <PersonIcon />
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

export default withStyles(styles)(WhitePart);
