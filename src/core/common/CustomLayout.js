import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';
import { Layout } from 'react-admin';

import { withStyles } from '@material-ui/core/styles';

import CustomSidebar from "./Sidebar";
import CustomTopBar from "./Topbar";
import CustomFooter from "./Footer";

import getCurrentTheme from "../config/styles";

const styles = {
    root: {
        flexDirection: 'column',
        zIndex: 1,
        minHeight: '101vh',
        position: 'relative',
        '& > div': {
            minHeight: '101vh',
        },
        '& main > div': {
            padding: 0,
        },

    },
};

/**
 * This component returns custom layout
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @constructor
 */
const CustomLayout = ({ classes, ...rest }) => {
    return (
        <Layout
            {...rest}
            className={classes.root}
            appBar={CustomTopBar}
            sidebar={CustomSidebar}
            notification={CustomFooter}
        />
    );
};

const mapStateToProps = state => {
    const isContrastMode = get(state, 'custom.contrastMode.data', false);
    return {
        theme: getCurrentTheme(isContrastMode),
    }
};

export default connect(mapStateToProps, null)(withStyles(styles)(CustomLayout));