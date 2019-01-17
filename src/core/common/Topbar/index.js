import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';

import WhitePart from "./fragments/WhitePart";
import GreenPart from "./fragments/GreenPart";

import { themeHasTopBar } from "../../../version/config/theme.config";
import ThemeTopBar from "../../../version/common/Topbar";

/**
 * This is common component for custom core TopBar
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const CustomTopbar = props => {
    if (themeHasTopBar) {
        return (
            <ThemeTopBar {...props} />
        );
    }
    return (
        <AppBar position="static">
            <WhitePart {...props} />
            <GreenPart {...props} />
        </AppBar>
    );
};

export default CustomTopbar;
