import React, { Component } from 'react';
import { get } from "lodash";
import { setSidebarVisibility } from 'react-admin';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';

import TopPart from "./fragments/TopPart";
import LowPart from "./fragments/LowPart";

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
            <TopPart {...props} />
            <LowPart {...props} />
        </AppBar>
    );
};

const mapStateToProps = state => {
    return {
        isLoading: get(state, 'admin.loading', false),
        location: get(state, 'router.location', null),
        isSidebarOpen: get(state, 'admin.ui.sidebarOpen', true),
        patientInfo: get(state, 'custom.patientInfo.data', null),
    }
};


export default connect(mapStateToProps, { setSidebarVisibility })(CustomTopbar);

