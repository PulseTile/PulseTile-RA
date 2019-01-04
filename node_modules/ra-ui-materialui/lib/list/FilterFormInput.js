"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var redux_form_1 = require("redux-form");
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var HighlightOff_1 = __importDefault(require("@material-ui/icons/HighlightOff"));
var classnames_1 = __importDefault(require("classnames"));
var ra_core_1 = require("ra-core");
var emptyRecord = {};
var sanitizeRestProps = function (_a) {
    var alwaysOn = _a.alwaysOn, props = __rest(_a, ["alwaysOn"]);
    return props;
};
var FilterFormInput = function (_a) {
    var filterElement = _a.filterElement, handleHide = _a.handleHide, classes = _a.classes, resource = _a.resource, translate = _a.translate;
    return (react_1.default.createElement("div", { "data-source": filterElement.props.source, className: classnames_1.default('filter-field', classes.body) },
        !filterElement.props.alwaysOn && (react_1.default.createElement(IconButton_1.default, { className: "hide-filter", onClick: handleHide, "data-key": filterElement.props.source, tooltip: translate('ra.action.remove_filter') },
            react_1.default.createElement(HighlightOff_1.default, null))),
        react_1.default.createElement(redux_form_1.Field, __assign({ allowEmpty: true }, sanitizeRestProps(filterElement.props), { name: filterElement.props.source, component: filterElement.type, resource: resource, record: emptyRecord })),
        react_1.default.createElement("div", { className: classes.spacer }, "\u00A0")));
};
FilterFormInput.propTypes = {
    filterElement: prop_types_1.default.node,
    handleHide: prop_types_1.default.func,
    classes: prop_types_1.default.object,
    resource: prop_types_1.default.string,
    translate: prop_types_1.default.func,
};
exports.default = ra_core_1.translate(FilterFormInput);
