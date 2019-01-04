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
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { EditController } from 'ra-core';
import DefaultActions from './EditActions';
import TitleForRecord from '../layout/TitleForRecord';
import CardContentInner from '../layout/CardContentInner';
export var styles = {
    root: {
        display: 'flex',
    },
    card: {
        flex: '1 1 auto',
    },
};
var sanitizeRestProps = function (_a) {
    var actions = _a.actions, aside = _a.aside, children = _a.children, className = _a.className, crudGetOne = _a.crudGetOne, crudUpdate = _a.crudUpdate, data = _a.data, hasCreate = _a.hasCreate, hasEdit = _a.hasEdit, hasList = _a.hasList, hasShow = _a.hasShow, id = _a.id, isLoading = _a.isLoading, resetForm = _a.resetForm, resource = _a.resource, title = _a.title, translate = _a.translate, version = _a.version, match = _a.match, location = _a.location, history = _a.history, options = _a.options, locale = _a.locale, permissions = _a.permissions, undoable = _a.undoable, rest = __rest(_a, ["actions", "aside", "children", "className", "crudGetOne", "crudUpdate", "data", "hasCreate", "hasEdit", "hasList", "hasShow", "id", "isLoading", "resetForm", "resource", "title", "translate", "version", "match", "location", "history", "options", "locale", "permissions", "undoable"]);
    return rest;
};
export var EditView = function (_a) {
    var actions = _a.actions, aside = _a.aside, basePath = _a.basePath, children = _a.children, classes = _a.classes, className = _a.className, defaultTitle = _a.defaultTitle, hasList = _a.hasList, hasShow = _a.hasShow, record = _a.record, redirect = _a.redirect, resource = _a.resource, save = _a.save, title = _a.title, version = _a.version, rest = __rest(_a, ["actions", "aside", "basePath", "children", "classes", "className", "defaultTitle", "hasList", "hasShow", "record", "redirect", "resource", "save", "title", "version"]);
    if (typeof actions === 'undefined' && hasShow) {
        actions = React.createElement(DefaultActions, null);
    }
    if (!children) {
        return null;
    }
    return (React.createElement("div", __assign({ className: classnames('edit-page', classes.root, className) }, sanitizeRestProps(rest)),
        React.createElement(TitleForRecord, { title: title, record: record, defaultTitle: defaultTitle }),
        React.createElement(Card, { className: classes.card },
            actions && (React.createElement(CardContentInner, null, React.cloneElement(actions, {
                basePath: basePath,
                data: record,
                hasShow: hasShow,
                hasList: hasList,
                resource: resource,
            }))),
            record ? (React.cloneElement(children, {
                basePath: basePath,
                record: record,
                redirect: typeof children.props.redirect === 'undefined'
                    ? redirect
                    : children.props.redirect,
                resource: resource,
                save: save,
                version: version,
            })) : (React.createElement(CardContent, null, "\u00A0"))),
        aside &&
            React.cloneElement(aside, {
                basePath: basePath,
                record: record,
                resource: resource,
                version: version,
            })));
};
EditView.propTypes = {
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
    version: PropTypes.number,
};
EditView.defaultProps = {
    classes: {},
};
/**
 * Page component for the Edit view
 *
 * The `<Edit>` component renders the page title and actions,
 * fetches the record from the data provider.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleForm>`),
 * to which it passes pass the `record` as prop.
 *
 * The `<Edit>` component accepts the following props:
 *
 * - title
 * - actions
 *
 * Both expect an element for value.
 *
 * @example
 *     // in src/posts.js
 *     import React from 'react';
 *     import { Edit, SimpleForm, TextInput } from 'react-admin';
 *
 *     export const PostEdit = (props) => (
 *         <Edit {...props}>
 *             <SimpleForm>
 *                 <TextInput source="title" />
 *             </SimpleForm>
 *         </Edit>
 *     );
 *
 *     // in src/App.js
 *     import React from 'react';
 *     import { Admin, Resource } from 'react-admin';
 *
 *     import { PostEdit } from './posts';
 *
 *     const App = () => (
 *         <Admin dataProvider={...}>
 *             <Resource name="posts" edit={PostEdit} />
 *         </Admin>
 *     );
 *     export default App;
 */
export var Edit = function (props) { return (React.createElement(EditController, __assign({}, props), function (controllerProps) { return React.createElement(EditView, __assign({}, props, controllerProps)); })); };
Edit.propTypes = {
    actions: PropTypes.element,
    aside: PropTypes.node,
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    hasCreate: PropTypes.bool,
    hasEdit: PropTypes.bool,
    hasShow: PropTypes.bool,
    hasList: PropTypes.bool,
    id: PropTypes.any.isRequired,
    resource: PropTypes.string.isRequired,
    title: PropTypes.any,
};
export default withStyles(styles)(Edit);
