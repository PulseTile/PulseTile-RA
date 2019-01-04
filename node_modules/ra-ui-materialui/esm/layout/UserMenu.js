var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { translate } from 'ra-core';
var UserMenu = /** @class */ (function (_super) {
    __extends(UserMenu, _super);
    function UserMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            auth: true,
            anchorEl: null,
        };
        _this.handleChange = function (event, checked) {
            _this.setState({ auth: checked });
        };
        _this.handleMenu = function (event) {
            _this.setState({ anchorEl: event.currentTarget });
        };
        _this.handleClose = function () {
            _this.setState({ anchorEl: null });
        };
        return _this;
    }
    UserMenu.prototype.render = function () {
        var _this = this;
        var _a = this.props, children = _a.children, label = _a.label, icon = _a.icon, logout = _a.logout, translate = _a.translate;
        if (!logout && !children)
            return null;
        var anchorEl = this.state.anchorEl;
        var open = Boolean(anchorEl);
        return (React.createElement("div", null,
            React.createElement(Tooltip, { title: label && translate(label, { _: label }) },
                React.createElement(IconButton, { "aria-label": label && translate(label, { _: label }), "aria-owns": open ? 'menu-appbar' : null, "aria-haspopup": true, color: "inherit", onClick: this.handleMenu }, icon)),
            React.createElement(Menu, { id: "menu-appbar", anchorEl: anchorEl, anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }, transformOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }, open: open, onClose: this.handleClose },
                Children.map(children, function (menuItem) {
                    return cloneElement(menuItem, { onClick: _this.handleClose });
                }),
                logout)));
    };
    UserMenu.propTypes = {
        children: PropTypes.node,
        label: PropTypes.string.isRequired,
        logout: PropTypes.node,
        icon: PropTypes.node,
        translate: PropTypes.func.isRequired,
    };
    UserMenu.defaultProps = {
        label: 'ra.auth.user_menu',
        icon: React.createElement(AccountCircle, null),
    };
    return UserMenu;
}(React.Component));
export default translate(UserMenu);
