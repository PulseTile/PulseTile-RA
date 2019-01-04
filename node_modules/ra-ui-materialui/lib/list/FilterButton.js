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
var react_dom_1 = require("react-dom");
var prop_types_1 = __importDefault(require("prop-types"));
var Menu_1 = __importDefault(require("@material-ui/core/Menu"));
var styles_1 = require("@material-ui/core/styles");
var FilterList_1 = __importDefault(require("@material-ui/icons/FilterList"));
var classnames_1 = __importDefault(require("classnames"));
var compose_1 = __importDefault(require("recompose/compose"));
var ra_core_1 = require("ra-core");
var FilterButtonMenuItem_1 = __importDefault(require("./FilterButtonMenuItem"));
var Button_1 = __importDefault(require("../button/Button"));
var styles = {
    root: { display: 'inline-block' },
};
var FilterButton = /** @class */ (function (_super) {
    __extends(FilterButton, _super);
    function FilterButton(props) {
        var _this = _super.call(this, props) || this;
        _this.button = null;
        _this.state = {
            open: false,
        };
        _this.handleClickButton = _this.handleClickButton.bind(_this);
        _this.handleRequestClose = _this.handleRequestClose.bind(_this);
        _this.handleShow = _this.handleShow.bind(_this);
        return _this;
    }
    FilterButton.prototype.getHiddenFilters = function () {
        var _a = this.props, filters = _a.filters, displayedFilters = _a.displayedFilters, filterValues = _a.filterValues;
        return filters.filter(function (filterElement) {
            return !filterElement.props.alwaysOn &&
                !displayedFilters[filterElement.props.source] &&
                !filterValues[filterElement.props.source];
        });
    };
    FilterButton.prototype.handleClickButton = function (event) {
        // This prevents ghost click.
        event.preventDefault();
        this.setState({
            open: true,
            anchorEl: react_dom_1.findDOMNode(this.button),
        });
    };
    FilterButton.prototype.handleRequestClose = function () {
        this.setState({
            open: false,
        });
    };
    FilterButton.prototype.handleShow = function (_a) {
        var source = _a.source, defaultValue = _a.defaultValue;
        this.props.showFilter(source, defaultValue);
        this.setState({
            open: false,
        });
    };
    FilterButton.prototype.render = function () {
        var _this = this;
        var hiddenFilters = this.getHiddenFilters();
        var _a = this.props, _b = _a.classes, classes = _b === void 0 ? {} : _b, className = _a.className, resource = _a.resource, showFilter = _a.showFilter, displayedFilters = _a.displayedFilters, filterValues = _a.filterValues, translate = _a.translate, rest = __rest(_a, ["classes", "className", "resource", "showFilter", "displayedFilters", "filterValues", "translate"]);
        var _c = this.state, open = _c.open, anchorEl = _c.anchorEl;
        return (hiddenFilters.length > 0 && (react_1.default.createElement("div", __assign({ className: classnames_1.default(classes.root, className) }, rest),
            react_1.default.createElement(Button_1.default, { ref: function (node) {
                    _this.button = node;
                }, className: "add-filter", label: "ra.action.add_filter", onClick: this.handleClickButton },
                react_1.default.createElement(FilterList_1.default, null)),
            react_1.default.createElement(Menu_1.default, { open: open, anchorEl: anchorEl, onClose: this.handleRequestClose }, hiddenFilters.map(function (filterElement) { return (react_1.default.createElement(FilterButtonMenuItem_1.default, { key: filterElement.props.source, filter: filterElement.props, resource: resource, onShow: _this.handleShow })); })))));
    };
    return FilterButton;
}(react_1.Component));
exports.FilterButton = FilterButton;
FilterButton.propTypes = {
    resource: prop_types_1.default.string.isRequired,
    filters: prop_types_1.default.arrayOf(prop_types_1.default.node).isRequired,
    displayedFilters: prop_types_1.default.object.isRequired,
    filterValues: prop_types_1.default.object.isRequired,
    showFilter: prop_types_1.default.func.isRequired,
    translate: prop_types_1.default.func.isRequired,
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
};
exports.default = compose_1.default(ra_core_1.translate, styles_1.withStyles(styles))(FilterButton);
