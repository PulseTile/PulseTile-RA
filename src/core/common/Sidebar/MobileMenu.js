import React, { Component } from "react";
import { connect } from 'react-redux';
import { setSidebarVisibility } from 'react-admin';

import MenuItems from "./MenuItems";

class MobileMenu extends Component {

    onMobileMenuClick = () => {
        this.props.setSidebarVisibility(true);
    };

    render() {
        const { classes, menuItems, currentList } = this.props;
        return (
            <div className={classes.mobileSidebar}>
                <MenuItems classes={classes} menuItems={menuItems} currentList={currentList} onMenuClick={() => this.onMobileMenuClick()} />
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setSidebarVisibility(params) {
            dispatch(setSidebarVisibility(params));
        },
    }
};

export default connect(null, mapDispatchToProps)(MobileMenu);