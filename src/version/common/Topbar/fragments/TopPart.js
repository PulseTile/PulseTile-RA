import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';

import { withStyles } from '@material-ui/core/styles';
import CardMedia from "@material-ui/core/CardMedia";
import BackIcon from "@material-ui/icons/ArrowBack";
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import helmLogo from "../../../images/pulsetile-logo.png";
import AdvancedUserSearch from "../../../../core/common/Topbar/fragments/AdvancedUserSearch";
import UserSearch from "../../../../core/common/Topbar/fragments/UserSearch";
import ContrastMode from "../../../features/ContrastMode";
import UserPanelButton from "./UserPanelButton";
import { userSearchAction } from "../../../../core/actions/userSearchAction";

const styles = theme => ({
    topPart: {
        display: "flex",
        backgroundColor: "white",
        justifyContent: "space-around",
        minHeight: 54,
        padding: 0,
    },
    backButtonItem: {
        display: "inline-flex",
        position: "relative",
        minHeight: 54,
        minWidth: 54,
        backgroundColor: theme.palette.mainColor,
        justifyContent: "center",
        alignItems: "center",
    },
    homeButton : {
        color: theme.palette.secondaryMainColor,
    },
    mainLogoItem: {
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 9,
    },
    image: {
        width: "auto",
        cursor: "pointer",
    },
    nhsLogo: {
        [theme.breakpoints.only('xs')]: {
            display: "none",
        },
        width: "auto",
        maxWidth: "100%",
        marginRight: 24
    },
    rightBlockItem: {
        display: "inline-flex",
        position: "relative",
        minHeight: 54,
        minWidth: 54,
        justifyContent: "center",
        alignItems: "center",
        borderLeft: `1px solid ${theme.palette.borderColor}`,
        '&:hover': {
            backgroundColor: theme.palette.secondaryMainColor,
        },
        '&:active': {
            backgroundColor: theme.palette.secondaryMainColor,
        },
        '&:hover button': {
            color: "white",
        },
        '&:active button': {
            color: "white",
        },
        '&:hover a': {
            color: "white",
        },
        '&:active a': {
            color: "white",
        },
    },
    rightBlockButton: {
        color: theme.palette.secondaryMainColor,
        '&:hover': {
            color: "white",
        },
    },
    emptyBlock: {
        flexGrow: 1,
    }
});

/**
 * This component returns Top part of Helm Topbar
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
class TopPart extends Component {

    goHomePage = () => {
        this.props.removeUserSearch();
        window.location.replace('/#/');
    };

    render() {
        const { classes, location, goBack } = this.props;
        const pathname = get(location, 'pathname', null);
        return (
            <Toolbar className={classes.topPart}>
                {
                    (pathname !== '/charts' && pathname !== '/') &&
                        <div className={classes.backButtonItem}>
                            <Tooltip title="Home">
                                <IconButton id="icon-home" aria-label="Home" className={classes.homeButton} onClick={() => goBack()}>
                                    <BackIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                }
                <div className={classes.mainLogoItem}>
                    <CardMedia
                        id="logo-image"
                        className={classes.image}
                        component="img"
                        alt="Pulse Tile"
                        height="38px"
                        image={helmLogo}
                        title="Pulse Tile"
                        onClick={() => this.goHomePage()}
                    />
                </div>
                <div className={classes.emptyBlock}></div>
                <AdvancedUserSearch />
                <UserSearch location={location} />
                <ContrastMode classes={classes} />
                <UserPanelButton classes={classes} />
            </Toolbar>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        removeUserSearch() {
            dispatch(userSearchAction.remove());
        },
        goBack() {
            dispatch(goBack());
        },
    }
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(TopPart));