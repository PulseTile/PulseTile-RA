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
var TableCell_1 = __importDefault(require("@material-ui/core/TableCell"));
var classnames_1 = __importDefault(require("classnames"));
var sanitizeRestProps = function (_a) {
    var cellClassName = _a.cellClassName, className = _a.className, field = _a.field, formClassName = _a.formClassName, headerClassName = _a.headerClassName, record = _a.record, basePath = _a.basePath, resource = _a.resource, rest = __rest(_a, ["cellClassName", "className", "field", "formClassName", "headerClassName", "record", "basePath", "resource"]);
    return rest;
};
exports.DatagridCell = function (_a) {
    var className = _a.className, field = _a.field, record = _a.record, basePath = _a.basePath, resource = _a.resource, rest = __rest(_a, ["className", "field", "record", "basePath", "resource"]);
    return (react_1.default.createElement(TableCell_1.default, __assign({ className: classnames_1.default(className, field.props.cellClassName), numeric: field.props.textAlign === 'right', padding: "none" }, sanitizeRestProps(rest)), react_1.default.cloneElement(field, {
        record: record,
        basePath: field.props.basePath || basePath,
        resource: resource,
    })));
};
exports.DatagridCell.propTypes = {
    className: prop_types_1.default.string,
    field: prop_types_1.default.element,
    record: prop_types_1.default.object,
    basePath: prop_types_1.default.string,
    resource: prop_types_1.default.string,
};
// wat? TypeScript looses the displayName if we don't set it explicitly
exports.DatagridCell.displayName = 'DatagridCell';
exports.default = exports.DatagridCell;
