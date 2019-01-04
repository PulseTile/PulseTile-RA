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
var styles_1 = require("@material-ui/core/styles");
var ra_core_1 = require("ra-core");
var FilterForm_1 = __importDefault(require("./FilterForm"));
var FilterButton_1 = __importDefault(require("./FilterButton"));
var styles = {
    button: {},
    form: {},
};
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter(props) {
        return _super.call(this, props) || this;
    }
    Filter.prototype.renderButton = function () {
        var _a = this.props, _b = _a.classes, classes = _b === void 0 ? {} : _b, context = _a.context, debounce = _a.debounce, resource = _a.resource, children = _a.children, showFilter = _a.showFilter, hideFilter = _a.hideFilter, displayedFilters = _a.displayedFilters, filterValues = _a.filterValues, rest = __rest(_a, ["classes", "context", "debounce", "resource", "children", "showFilter", "hideFilter", "displayedFilters", "filterValues"]);
        return (react_1.default.createElement(FilterButton_1.default, __assign({ className: classes.button, resource: resource, filters: react_1.default.Children.toArray(children), showFilter: showFilter, displayedFilters: displayedFilters, filterValues: filterValues }, ra_core_1.sanitizeListRestProps(rest))));
    };
    Filter.prototype.renderForm = function () {
        var _a = this.props, _b = _a.classes, classes = _b === void 0 ? {} : _b, context = _a.context, debounce = _a.debounce, resource = _a.resource, children = _a.children, hideFilter = _a.hideFilter, displayedFilters = _a.displayedFilters, showFilter = _a.showFilter, filterValues = _a.filterValues, setFilters = _a.setFilters, rest = __rest(_a, ["classes", "context", "debounce", "resource", "children", "hideFilter", "displayedFilters", "showFilter", "filterValues", "setFilters"]);
        return (react_1.default.createElement(FilterForm_1.default, __assign({ className: classes.form, resource: resource, filters: react_1.default.Children.toArray(children), hideFilter: hideFilter, displayedFilters: displayedFilters, initialValues: filterValues, setFilters: setFilters }, ra_core_1.sanitizeListRestProps(rest))));
    };
    Filter.prototype.render = function () {
        return this.props.context === 'button'
            ? this.renderButton()
            : this.renderForm();
    };
    return Filter;
}(react_1.Component));
exports.Filter = Filter;
Filter.propTypes = {
    children: prop_types_1.default.node,
    classes: prop_types_1.default.object,
    context: prop_types_1.default.oneOf(['form', 'button']),
    debounce: prop_types_1.default.number.isRequired,
    displayedFilters: prop_types_1.default.object,
    filterValues: prop_types_1.default.object,
    hideFilter: prop_types_1.default.func,
    setFilters: prop_types_1.default.func,
    showFilter: prop_types_1.default.func,
    resource: prop_types_1.default.string.isRequired,
};
Filter.defaultProps = {
    debounce: 500,
};
exports.default = styles_1.withStyles(styles)(Filter);
