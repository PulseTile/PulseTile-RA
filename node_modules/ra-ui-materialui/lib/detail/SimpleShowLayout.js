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
var classnames_1 = __importDefault(require("classnames"));
var CardContentInner_1 = __importDefault(require("../layout/CardContentInner"));
var Labeled_1 = __importDefault(require("../input/Labeled"));
var sanitizeRestProps = function (_a) {
    var children = _a.children, className = _a.className, record = _a.record, resource = _a.resource, basePath = _a.basePath, version = _a.version, initialValues = _a.initialValues, translate = _a.translate, rest = __rest(_a, ["children", "className", "record", "resource", "basePath", "version", "initialValues", "translate"]);
    return rest;
};
/**
 * Simple Layout for a Show view, showing fields in one column.
 *
 * Receives the current `record` from the parent `<Show>` component,
 * and passes it to its childen. Children should be Field-like components.
 *
 * @example
 *     // in src/posts.js
 *     import React from 'react';
 *     import { Show, SimpleShowLayout, TextField } from 'react-admin';
 *
 *     export const PostShow = (props) => (
 *         <Show {...props}>
 *             <SimpleShowLayout>
 *                 <TextField source="title" />
 *             </SimpleShowLayout>
 *         </Show>
 *     );
 *
 *     // in src/App.js
 *     import React from 'react';
 *     import { Admin, Resource } from 'react-admin';
 *
 *     import { PostShow } from './posts';
 *
 *     const App = () => (
 *         <Admin dataProvider={...}>
 *             <Resource name="posts" show={PostShow} />
 *         </Admin>
 *     );
 *     export default App;
 */
exports.SimpleShowLayout = function (_a) {
    var basePath = _a.basePath, className = _a.className, children = _a.children, record = _a.record, resource = _a.resource, version = _a.version, rest = __rest(_a, ["basePath", "className", "children", "record", "resource", "version"]);
    return (react_1.default.createElement(CardContentInner_1.default, __assign({ className: className, key: version }, sanitizeRestProps(rest)), react_1.Children.map(children, function (field) {
        return field ? (react_1.default.createElement("div", { key: field.props.source, className: classnames_1.default("ra-field ra-field-" + field.props.source, field.props.className) }, field.props.addLabel ? (react_1.default.createElement(Labeled_1.default, { record: record, resource: resource, basePath: basePath, label: field.props.label, source: field.props.source, disabled: false }, field)) : typeof field.type === 'string' ? (field) : (react_1.default.cloneElement(field, {
            record: record,
            resource: resource,
            basePath: basePath,
        })))) : null;
    })));
};
exports.SimpleShowLayout.propTypes = {
    basePath: prop_types_1.default.string,
    className: prop_types_1.default.string,
    children: prop_types_1.default.node,
    record: prop_types_1.default.object,
    resource: prop_types_1.default.string,
    version: prop_types_1.default.number,
};
exports.default = exports.SimpleShowLayout;
