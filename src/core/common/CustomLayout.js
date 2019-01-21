import React, { Component } from "react";
import { Layout } from 'react-admin';

import { withStyles } from '@material-ui/core/styles';

import CustomSidebar from "./Sidebar";
import CustomTopBar from "./Topbar";

import styles from "../styles";

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

export default withStyles(styles.layoutStyles)(CustomLayout);
