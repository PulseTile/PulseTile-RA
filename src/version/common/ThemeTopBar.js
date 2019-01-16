import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';

import TopPart from "./fragments/TopPart";
import LowPart from "./fragments/LowPart";

/**
 * This is common component for theme TopBar
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const ThemeTopBar = props => {
    return (
        <AppBar position="static">
            <TopPart {...props} />
            <LowPart {...props} />
        </AppBar>
    );
};

export default ThemeTopBar;