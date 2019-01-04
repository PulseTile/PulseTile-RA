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
var TitleForRecord_1 = __importDefault(require("../layout/TitleForRecord"));
var CardContentInner_1 = __importDefault(require("../layout/CardContentInner"));
var styles = {
    root: {
        display: 'flex',
    },
    card: {
        flex: '1 1 auto',
    },
};
var sanitizeRestProps = function (_a) {
    var actions = _a.actions, children = _a.children, className = _a.className, crudCreate = _a.crudCreate, isLoading = _a.isLoading, resource = _a.resource, title = _a.title, hasCreate = _a.hasCreate, hasEdit = _a.hasEdit, hasList = _a.hasList, hasShow = _a.hasShow, match = _a.match, location = _a.location, history = _a.history, options = _a.options, locale = _a.locale, permissions = _a.permissions, translate = _a.translate, rest = __rest(_a, ["actions", "children", "className", "crudCreate", "isLoading", "resource", "title", "hasCreate", "hasEdit", "hasList", "hasShow", "match", "location", "history", "options", "locale", "permissions", "translate"]);
    return rest;
};
exports.CreateView = function (_a) {
    var actions = _a.actions, aside = _a.aside, basePath = _a.basePath, children = _a.children, classes = _a.classes, className = _a.className, defaultTitle = _a.defaultTitle, hasList = _a.hasList, hasShow = _a.hasShow, _b = _a.record, record = _b === void 0 ? {} : _b, redirect = _a.redirect, resource = _a.resource, save = _a.save, title = _a.title, rest = __rest(_a, ["actions", "aside", "basePath", "children", "classes", "className", "defaultTitle", "hasList", "hasShow", "record", "redirect", "resource", "save", "title"]);
    return (react_1.default.createElement("div", __assign({ className: classnames_1.default('create-page', classes.root, className) }, sanitizeRestProps(rest)),
        react_1.default.createElement(TitleForRecord_1.default, { title: title, record: record, defaultTitle: defaultTitle }),
        react_1.default.createElement(Card_1.default, { className: classes.card },
            actions && (react_1.default.createElement(CardContentInner_1.default, null, react_1.default.cloneElement(actions, {
                basePath: basePath,
                resource: resource,
                hasList: hasList,
            }))),
            react_1.default.cloneElement(children, {
                basePath: basePath,
                record: record,
                redirect: typeof children.props.redirect === 'undefined'
                    ? redirect
                    : children.props.redirect,
                resource: resource,
                save: save,
            })),
        aside &&
            react_1.default.cloneElement(aside, {
                basePath: basePath,
                record: record,
                resource: resource,
                save: save,
            })));
};
exports.CreateView.propTypes = {
    actions: prop_types_1.default.element,
    aside: prop_types_1.default.node,
    basePath: prop_types_1.default.string,
    children: prop_types_1.default.element,
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    defaultTitle: prop_types_1.default.any,
    hasList: prop_types_1.default.bool,
    hasShow: prop_types_1.default.bool,
    record: prop_types_1.default.object,
    redirect: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.bool]),
    resource: prop_types_1.default.string,
    save: prop_types_1.default.func,
    title: prop_types_1.default.any,
};
exports.CreateView.defaultProps = {
    classes: {},
};
/**
 * Page component for the Create view
 *
 * The `<Create>` component renders the page title and actions.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleForm>`),
 * to which it passes pass the `record` as prop.
 *
 * The `<Create>` component accepts the following props:
 *
 * - title
 * - actions
 *
 * Both expect an element for value.
 *
 * @example
 *     // in src/posts.js
 *     import React from 'react';
 *     import { Create, SimpleForm, TextInput } from 'react-admin';
 *
 *     export const PostCreate = (props) => (
 *         <Create {...props}>
 *             <SimpleForm>
 *                 <TextInput source="title" />
 *             </SimpleForm>
 *         </Create>
 *     );
 *
 *     // in src/App.js
 *     import React from 'react';
 *     import { Admin, Resource } from 'react-admin';
 *
 *     import { PostCreate } from './posts';
 *
 *     const App = () => (
 *         <Admin dataProvider={...}>
 *             <Resource name="posts" create={PostCreate} />
 *         </Admin>
 *     );
 *     export default App;
 */
exports.Create = function (props) { return (react_1.default.createElement(ra_core_1.CreateController, __assign({}, props), function (controllerProps) { return react_1.default.createElement(exports.CreateView, __assign({}, props, controllerProps)); })); };
exports.Create.propTypes = {
    actions: prop_types_1.default.element,
    aside: prop_types_1.default.node,
    children: prop_types_1.default.element,
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    hasCreate: prop_types_1.default.bool,
    hasEdit: prop_types_1.default.bool,
    hasShow: prop_types_1.default.bool,
    resource: prop_types_1.default.string.isRequired,
    title: prop_types_1.default.any,
    record: prop_types_1.default.object,
    hasList: prop_types_1.default.bool,
};
exports.default = styles_1.withStyles(styles)(exports.Create);
