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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
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
var react_transition_group_1 = require("react-transition-group");
var Menu_1 = __importDefault(require("@material-ui/core/Menu"));
var MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
var styles_1 = require("@material-ui/core/styles");
var FilterNone_1 = __importDefault(require("@material-ui/icons/FilterNone"));
var compose_1 = __importDefault(require("recompose/compose"));
var classnames_1 = __importDefault(require("classnames"));
var ra_core_1 = require("ra-core");
var Button_1 = __importDefault(require("../button/Button"));
var BulkDeleteAction_1 = __importDefault(require("./BulkDeleteAction"));
var styles = function (theme) { return ({
    bulkActionsButton: {
        opacity: 1,
        transition: theme.transitions.create('opacity', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        '&.fade-enter': {
            opacity: 0,
        },
        '&.fade-enter-done': {
            opacity: 1,
        },
        '&.fade-exit': {
            opacity: 0,
        },
        '&.fade-exit-done': {
            opacity: 0,
        },
    },
    icon: {
        marginRight: theme.spacing.unit,
    },
}); };
var timeoutDurations = {
    enter: 0,
    exit: 300,
};
var sanitizeRestProps = function (_a) {
    var basePath = _a.basePath, classes = _a.classes, filterValues = _a.filterValues, resource = _a.resource, onUnselectItems = _a.onUnselectItems, rest = __rest(_a, ["basePath", "classes", "filterValues", "resource", "onUnselectItems"]);
    return rest;
};
/**
 * @deprecated pass a Fragment with button children as bulkActionButtons props instead
 */
var BulkActions = /** @class */ (function (_super) {
    __extends(BulkActions, _super);
    function BulkActions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isOpen: false,
            activeAction: null,
        };
        _this.storeButtonRef = function (node) {
            _this.anchorElement = node;
        };
        _this.handleClick = function () {
            _this.setState({ isOpen: true });
        };
        _this.handleClose = function () {
            _this.setState({ isOpen: false });
        };
        _this.handleLaunchAction = function (action) {
            _this.setState({ activeAction: action, isOpen: false });
        };
        _this.handleExitAction = function () {
            _this.setState({ activeAction: null });
        };
        return _this;
    }
    BulkActions.prototype.componentDidMount = function () {
        if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.warn('<BulkActions> is deprecated. Use the bulkActionButtons prop instead.');
        }
    };
    BulkActions.prototype.render = function () {
        var _this = this;
        var _a = this.props, basePath = _a.basePath, classes = _a.classes, children = _a.children, className = _a.className, filterValues = _a.filterValues, label = _a.label, resource = _a.resource, selectedIds = _a.selectedIds, translate = _a.translate, rest = __rest(_a, ["basePath", "classes", "children", "className", "filterValues", "label", "resource", "selectedIds", "translate"]);
        var isOpen = this.state.isOpen;
        return (react_1.default.createElement(react_transition_group_1.CSSTransition, { in: selectedIds.length > 0, timeout: timeoutDurations, mountOnEnter: true, unmountOnExit: true, classNames: "fade" },
            react_1.default.createElement("div", { className: classes.bulkActionsButton },
                react_1.default.createElement(Button_1.default, __assign({ buttonRef: this.storeButtonRef, className: classnames_1.default('bulk-actions-button', className), alignIcon: "left", "aria-owns": isOpen ? 'bulk-actions-menu' : null, "aria-haspopup": "true", onClick: this.handleClick }, sanitizeRestProps(rest), { label: translate(label, {
                        _: label,
                        smart_count: selectedIds.length,
                    }) }),
                    react_1.default.createElement(FilterNone_1.default, { className: classes.icon })),
                react_1.default.createElement(Menu_1.default, { id: "bulk-actions-menu", anchorEl: this.anchorElement, onClose: this.handleClose, open: isOpen }, react_1.Children.map(children, function (child, index) { return (react_1.default.createElement(MenuItem_1.default, __assign({ key: index, className: classnames_1.default('bulk-actions-menu-item', child.props.className), onClick: function () { return _this.handleLaunchAction(index); } }, sanitizeRestProps(rest)), translate(child.props.label))); })),
                react_1.Children.map(children, function (child, index) {
                    return _this.state.activeAction === index &&
                        react_1.cloneElement(child, {
                            basePath: basePath,
                            filterValues: filterValues,
                            onExit: _this.handleExitAction,
                            resource: resource,
                            selectedIds: selectedIds,
                        });
                }))));
    };
    return BulkActions;
}(react_1.Component));
BulkActions.propTypes = {
    basePath: prop_types_1.default.string,
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    children: prop_types_1.default.node,
    filterValues: prop_types_1.default.object,
    label: prop_types_1.default.string,
    resource: prop_types_1.default.string,
    selectedIds: prop_types_1.default.arrayOf(prop_types_1.default.any),
    translate: prop_types_1.default.func.isRequired,
};
BulkActions.defaultProps = {
    children: react_1.default.createElement(BulkDeleteAction_1.default, null),
    label: 'ra.action.bulk_actions',
    selectedIds: [],
};
var EnhancedButton = compose_1.default(styles_1.withStyles(styles), ra_core_1.translate)(BulkActions);
exports.default = EnhancedButton;
