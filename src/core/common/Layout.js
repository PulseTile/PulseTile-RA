import React, { Component } from "react";
import { Layout } from 'react-admin';

import { withStyles } from '@material-ui/core/styles';

import CustomMenu from "./Menu";
import CustomTopBar from "./Topbar";

import styles from "../styles";

const CustomLayout = ({ classes, ...rest }) => {
    return (
        <Layout
            {...rest}
            className={classes.root}
            appBar={CustomTopBar}
            menu={CustomMenu}
        />
    );
};

export default withStyles(styles.layoutStyles)(CustomLayout);
