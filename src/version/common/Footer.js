import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardMedia from "@material-ui/core/CardMedia";

import { contrastModeAction } from "../actions/contrastModeAction";
import footerLogo from "../../core/images/ripple-foundation-logo-footer.png";

const styles = theme => ({
    footerBlock: {
        [theme.breakpoints.only('xs')]: {
            display: 'none',
        },
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flex: "0 0 auto",
        borderTop: `1px solid ${theme.palette.borderColor}`,
        height: 54,
        boxSizing: "border-box",
        color: "#5c5c5c",
        backgroundColor: "#fff",
        paddingTop: 12,
        paddingBottom: 13,
        paddingLeft: 14,
        paddingRight: 14,
    },
    copyright: {
        fontSize: 12,
    },
    contrastModeLink: {
        marginLeft: 5,
        fontSize: 12,
        color: theme.isOldDesign ? theme.palette.secondaryMainColor : theme.palette.mainColor,
        textDecoration: "none",
    },
    footerLogo: {
        width: "auto",
        maxWidth: "100%",
    },
    emptyBlock: {
        flexGrow: 1,
    },
});

/**
 * This component returns custom theme footer
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
class Footer extends Component {

    state = {
        isContrastMode: this.props.contrastMode,
    };

    toggleContrastMode = e => {
        e.preventDefault();
        this.setState(
            state => ({ isContrastMode: !this.state.isContrastMode }),
            () => this.props.contrastModeAction(this.state.isContrastMode)
        );
    };

    render() {
        const { classes } = this.props;
        const { isContrastMode } = this.state;
        const linkText = isContrastMode ? "Disable High Contrast Mode" : "Enable High Contrast Mode";
        const currentYear = new Date().getFullYear();
        return (
            <footer className={classes.footerBlock}>
                <Typography className={classes.copyright}>Copyright {currentYear} Ripple Foundation CIC Ltd. All rights reserved.</Typography>
                <Typography>
                    <Link to="/" className={classes.contrastModeLink} onClick={e => this.toggleContrastMode(e)}>{linkText}</Link>
                </Typography>
                <div className={classes.emptyBlock}></div>
                <Link to="/">
                    <CardMedia
                      className={classes.footerLogo}
                      component="img"
                      alt="Pulse Tile"
                      height="29px"
                      image={footerLogo}
                      title="Pulse Tile"
                    />
                </Link>
            </footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Footer));
