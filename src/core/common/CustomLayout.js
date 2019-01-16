import React, { Component } from 'react';
import { get } from "lodash";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    AppBar,
    Menu,
    Notification,
    Sidebar,
    setSidebarVisibility,
} from 'react-admin';
import createHistory from 'history/createBrowserHistory';

import { withStyles } from '@material-ui/core/styles';

import CustomMenu from "./CustomMenu";
import CustomTopBar from "./CustomTopBar";

const styles = theme => ({
    root: {
        display: 'flex',
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
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 2,
        padding: theme.spacing.unit * 3,
        paddingLeft: 5,
    },
});

class CustomLayout extends Component {

    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
        dashboard: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.string,
        ]),
        isLoading: PropTypes.bool.isRequired,
        setSidebarVisibility: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
    };

    componentWillMount() {
        this.props.setSidebarVisibility(true);
    }

    /**
     * This function defines is sidebar menu shown at the current page
     *
     * @author Bogdan Shcherban <bsc@piogroup.net>
     * @return {boolean}
     */
    isMenuVisible = () => {
        const pathname = get(this.props, 'location.pathname', null);
        const pagesWithoutMenu = [
            "/",
            "/charts",
            "/patients"
        ];
        return (-1 === pagesWithoutMenu.indexOf(pathname));
    };

    render() {
        const { children, location, classes, dashboard, isLoading, logout, isSidebarOpen, title, setSidebarVisibility, patientInfo } = this.props;
        const history = createHistory();
        const isMenuVisible = this.isMenuVisible();
        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <CustomTopBar
                        history={history}
                        location={location}
                        isMenuVisible={isMenuVisible}
                        title={title}
                        isSidebarOpen={isSidebarOpen}
                        setSidebarVisibility={setSidebarVisibility}
                        logout={logout}
                        patientInfo={patientInfo}
                    />
                    <main className={classes.contentWithSidebar}>
                        { isMenuVisible &&
                                <Sidebar>
                                    <CustomMenu />
                                </Sidebar> }
                        <div className={classes.content}>
                            {children}
                        </div>
                    </main>
                    <Notification />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: get(state, 'admin.loading', false),
        location: get(state, 'router.location', null),
        isSidebarOpen: get(state, 'admin.ui.sidebarOpen', true),
        patientInfo: get(state, 'custom.patientInfo.data', null),
    }
};

export default connect(mapStateToProps, { setSidebarVisibility })(withStyles(styles)(CustomLayout));
