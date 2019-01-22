import React, { Component } from "react";
import { Layout } from 'react-admin';

import { withStyles } from '@material-ui/core/styles';

import CustomSidebar from "./Sidebar";
import CustomTopBar from "./Topbar";

const styles = {
    root: {
        flexDirection: 'column',
        zIndex: 1,
        minHeight: '100vh',
        position: 'relative',
    },
    appFrame: {
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'auto',
    },
    contentWithSidebar: {
        display: 'flex',
        flexGrow: 1,
    },
    content: {
        display: "block",
        flexDirection: 'column',
        flexGrow: 2,
        padding: 0,
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
        />
    );
};

export default withStyles(styles)(CustomLayout);
