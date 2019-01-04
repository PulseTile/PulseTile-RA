"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var Tooltip_1 = __importDefault(require("@material-ui/core/Tooltip"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var Menu_1 = __importDefault(require("@material-ui/core/Menu"));
var AccountCircle_1 = __importDefault(require("@material-ui/icons/AccountCircle"));
var ra_core_1 = require("ra-core");
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
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(Tooltip_1.default, { title: label && translate(label, { _: label }) },
                react_1.default.createElement(IconButton_1.default, { "aria-label": label && translate(label, { _: label }), "aria-owns": open ? 'menu-appbar' : null, "aria-haspopup": true, color: "inherit", onClick: this.handleMenu }, icon)),
            react_1.default.createElement(Menu_1.default, { id: "menu-appbar", anchorEl: anchorEl, anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }, transformOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }, open: open, onClose: this.handleClose },
                react_1.Children.map(children, function (menuItem) {
                    return react_1.cloneElement(menuItem, { onClick: _this.handleClose });
                }),
                logout)));
    };
    UserMenu.propTypes = {
        children: prop_types_1.default.node,
        label: prop_types_1.default.string.isRequired,
        logout: prop_types_1.default.node,
        icon: prop_types_1.default.node,
        translate: prop_types_1.default.func.isRequired,
    };
    UserMenu.defaultProps = {
        label: 'ra.auth.user_menu',
        icon: react_1.default.createElement(AccountCircle_1.default, null),
    };
    return UserMenu;
}(react_1.default.Component));
exports.default = ra_core_1.translate(UserMenu);
