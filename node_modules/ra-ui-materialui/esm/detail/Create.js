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
import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { CreateController } from 'ra-core';
import TitleForRecord from '../layout/TitleForRecord';
import CardContentInner from '../layout/CardContentInner';
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
export var CreateView = function (_a) {
    var actions = _a.actions, aside = _a.aside, basePath = _a.basePath, children = _a.children, classes = _a.classes, className = _a.className, defaultTitle = _a.defaultTitle, hasList = _a.hasList, hasShow = _a.hasShow, _b = _a.record, record = _b === void 0 ? {} : _b, redirect = _a.redirect, resource = _a.resource, save = _a.save, title = _a.title, rest = __rest(_a, ["actions", "aside", "basePath", "children", "classes", "className", "defaultTitle", "hasList", "hasShow", "record", "redirect", "resource", "save", "title"]);
    return (React.createElement("div", __assign({ className: classnames('create-page', classes.root, className) }, sanitizeRestProps(rest)),
        React.createElement(TitleForRecord, { title: title, record: record, defaultTitle: defaultTitle }),
        React.createElement(Card, { className: classes.card },
            actions && (React.createElement(CardContentInner, null, React.cloneElement(actions, {
                basePath: basePath,
                resource: resource,
                hasList: hasList,
            }))),
            React.cloneElement(children, {
                basePath: basePath,
                record: record,
                redirect: typeof children.props.redirect === 'undefined'
                    ? redirect
                    : children.props.redirect,
                resource: resource,
                save: save,
            })),
        aside &&
            React.cloneElement(aside, {
                basePath: basePath,
                record: record,
                resource: resource,
                save: save,
            })));
};
CreateView.propTypes = {
    actions: PropTypes.element,
    aside: PropTypes.node,
    basePath: PropTypes.string,
    children: PropTypes.element,
    classes: PropTypes.object,
    className: PropTypes.string,
    defaultTitle: PropTypes.any,
    hasList: PropTypes.bool,
    hasShow: PropTypes.bool,
    record: PropTypes.object,
    redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    resource: PropTypes.string,
    save: PropTypes.func,
    title: PropTypes.any,
};
CreateView.defaultProps = {
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
export var Create = function (props) { return (React.createElement(CreateController, __assign({}, props), function (controllerProps) { return React.createElement(CreateView, __assign({}, props, controllerProps)); })); };
Create.propTypes = {
    actions: PropTypes.element,
    aside: PropTypes.node,
    children: PropTypes.element,
    classes: PropTypes.object,
    className: PropTypes.string,
    hasCreate: PropTypes.bool,
    hasEdit: PropTypes.bool,
    hasShow: PropTypes.bool,
    resource: PropTypes.string.isRequired,
    title: PropTypes.any,
    record: PropTypes.object,
    hasList: PropTypes.bool,
};
export default withStyles(styles)(Create);
