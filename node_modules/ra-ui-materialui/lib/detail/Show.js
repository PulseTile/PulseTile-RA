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
var Card_1 = __importDefault(require("@material-ui/core/Card"));
var styles_1 = require("@material-ui/core/styles");
var classnames_1 = __importDefault(require("classnames"));
var ra_core_1 = require("ra-core");
var ShowActions_1 = __importDefault(require("./ShowActions"));
var TitleForRecord_1 = __importDefault(require("../layout/TitleForRecord"));
var CardContentInner_1 = __importDefault(require("../layout/CardContentInner"));
exports.styles = {
    root: {
        display: 'flex',
    },
    card: {
        flex: '1 1 auto',
    },
};
var sanitizeRestProps = function (_a) {
    var actions = _a.actions, aside = _a.aside, title = _a.title, children = _a.children, className = _a.className, crudGetOne = _a.crudGetOne, id = _a.id, data = _a.data, isLoading = _a.isLoading, resource = _a.resource, hasCreate = _a.hasCreate, hasEdit = _a.hasEdit, hasList = _a.hasList, hasShow = _a.hasShow, translate = _a.translate, version = _a.version, match = _a.match, location = _a.location, history = _a.history, options = _a.options, locale = _a.locale, permissions = _a.permissions, rest = __rest(_a, ["actions", "aside", "title", "children", "className", "crudGetOne", "id", "data", "isLoading", "resource", "hasCreate", "hasEdit", "hasList", "hasShow", "translate", "version", "match", "location", "history", "options", "locale", "permissions"]);
    return rest;
};
exports.ShowView = function (_a) {
    var actions = _a.actions, aside = _a.aside, basePath = _a.basePath, children = _a.children, classes = _a.classes, className = _a.className, defaultTitle = _a.defaultTitle, hasEdit = _a.hasEdit, hasList = _a.hasList, isLoading = _a.isLoading, record = _a.record, resource = _a.resource, title = _a.title, version = _a.version, rest = __rest(_a, ["actions", "aside", "basePath", "children", "classes", "className", "defaultTitle", "hasEdit", "hasList", "isLoading", "record", "resource", "title", "version"]);
    if (typeof actions === 'undefined' && hasEdit) {
        actions = react_1.default.createElement(ShowActions_1.default, null);
    }
    if (!children) {
        return null;
    }
    return (react_1.default.createElement("div", __assign({ className: classnames_1.default('show-page', classes.root, className) }, sanitizeRestProps(rest)),
        react_1.default.createElement(TitleForRecord_1.default, { title: title, record: record, defaultTitle: defaultTitle }),
        react_1.default.createElement(Card_1.default, { className: classes.card },
            actions && (react_1.default.createElement(CardContentInner_1.default, null, react_1.default.cloneElement(actions, {
                basePath: basePath,
                data: record,
                hasList: hasList,
                hasEdit: hasEdit,
                resource: resource,
            }))),
            record &&
                react_1.default.cloneElement(children, {
                    resource: resource,
                    basePath: basePath,
                    record: record,
                    version: version,
                })),
        aside &&
            react_1.default.cloneElement(aside, {
                resource: resource,
                basePath: basePath,
                record: record,
                version: version,
            })));
};
exports.ShowView.propTypes = {
    actions: prop_types_1.default.element,
    aside: prop_types_1.default.node,
    basePath: prop_types_1.default.string,
    children: prop_types_1.default.element,
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    defaultTitle: prop_types_1.default.any,
    hasEdit: prop_types_1.default.bool,
    hasList: prop_types_1.default.bool,
    isLoading: prop_types_1.default.bool,
    record: prop_types_1.default.object,
    resource: prop_types_1.default.string,
    title: prop_types_1.default.any,
    version: prop_types_1.default.number,
};
exports.ShowView.defaultProps = {
    classes: {},
};
/**
 * Page component for the Show view
 *
 * The `<Show>` component renders the page title and actions,
 * fetches the record from the data provider.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleShowLayout>`),
 * to which it passes pass the `record` as prop.
 *
 * The `<Show>` component accepts the following props:
 *
 * - title
 * - actions
 *
 * Both expect an element for value.
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
exports.Show = function (props) { return (react_1.default.createElement(ra_core_1.ShowController, __assign({}, props), function (controllerProps) { return react_1.default.createElement(exports.ShowView, __assign({}, props, controllerProps)); })); };
exports.Show.propTypes = {
    actions: prop_types_1.default.element,
    aside: prop_types_1.default.node,
    children: prop_types_1.default.element,
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    hasCreate: prop_types_1.default.bool,
    hasEdit: prop_types_1.default.bool,
    hasList: prop_types_1.default.bool,
    hasShow: prop_types_1.default.bool,
    id: prop_types_1.default.any.isRequired,
    resource: prop_types_1.default.string.isRequired,
    title: prop_types_1.default.any,
};
exports.default = styles_1.withStyles(exports.styles)(exports.Show);
