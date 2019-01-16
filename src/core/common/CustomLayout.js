import React, { Component } from 'react';
import { get } from "lodash";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
    AppBar,
    Menu,
    Notification,
    Sidebar,
    setSidebarVisibility,
} from 'react-admin';

import CustomMenu from "./CustomMenu";

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
    appBar: {
        backgroundColor: "#0D672F",
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
        const { children, classes, dashboard, isLoading, logout, open, title } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar className={classes.appBar} title={title} open={open} logout={logout} />
                    <main className={classes.contentWithSidebar}>
                        {
                            this.isMenuVisible() &&
                                <Sidebar>
                                    <CustomMenu />
                                </Sidebar>
                        }
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
    }
};

export default connect(mapStateToProps, { setSidebarVisibility })(withStyles(styles)(CustomLayout));
