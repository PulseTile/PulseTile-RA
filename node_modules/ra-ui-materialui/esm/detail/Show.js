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
import { ShowController } from 'ra-core';
import DefaultActions from './ShowActions';
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
    var actions = _a.actions, aside = _a.aside, title = _a.title, children = _a.children, className = _a.className, crudGetOne = _a.crudGetOne, id = _a.id, data = _a.data, isLoading = _a.isLoading, resource = _a.resource, hasCreate = _a.hasCreate, hasEdit = _a.hasEdit, hasList = _a.hasList, hasShow = _a.hasShow, translate = _a.translate, version = _a.version, match = _a.match, location = _a.location, history = _a.history, options = _a.options, locale = _a.locale, permissions = _a.permissions, rest = __rest(_a, ["actions", "aside", "title", "children", "className", "crudGetOne", "id", "data", "isLoading", "resource", "hasCreate", "hasEdit", "hasList", "hasShow", "translate", "version", "match", "location", "history", "options", "locale", "permissions"]);
    return rest;
};
export var ShowView = function (_a) {
    var actions = _a.actions, aside = _a.aside, basePath = _a.basePath, children = _a.children, classes = _a.classes, className = _a.className, defaultTitle = _a.defaultTitle, hasEdit = _a.hasEdit, hasList = _a.hasList, isLoading = _a.isLoading, record = _a.record, resource = _a.resource, title = _a.title, version = _a.version, rest = __rest(_a, ["actions", "aside", "basePath", "children", "classes", "className", "defaultTitle", "hasEdit", "hasList", "isLoading", "record", "resource", "title", "version"]);
    if (typeof actions === 'undefined' && hasEdit) {
        actions = React.createElement(DefaultActions, null);
    }
    if (!children) {
        return null;
    }
    return (React.createElement("div", __assign({ className: classnames('show-page', classes.root, className) }, sanitizeRestProps(rest)),
        React.createElement(TitleForRecord, { title: title, record: record, defaultTitle: defaultTitle }),
        React.createElement(Card, { className: classes.card },
            actions && (React.createElement(CardContentInner, null, React.cloneElement(actions, {
                basePath: basePath,
                data: record,
                hasList: hasList,
                hasEdit: hasEdit,
                resource: resource,
            }))),
            record &&
                React.cloneElement(children, {
                    resource: resource,
                    basePath: basePath,
                    record: record,
                    version: version,
                })),
        aside &&
            React.cloneElement(aside, {
                resource: resource,
                basePath: basePath,
                record: record,
                version: version,
            })));
};
ShowView.propTypes = {
    actions: PropTypes.element,
    aside: PropTypes.node,
    basePath: PropTypes.string,
    children: PropTypes.element,
    classes: PropTypes.object,
    className: PropTypes.string,
    defaultTitle: PropTypes.any,
    hasEdit: PropTypes.bool,
    hasList: PropTypes.bool,
    isLoading: PropTypes.bool,
    record: PropTypes.object,
    resource: PropTypes.string,
    title: PropTypes.any,
    version: PropTypes.number,
};
ShowView.defaultProps = {
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
export var Show = function (props) { return (React.createElement(ShowController, __assign({}, props), function (controllerProps) { return React.createElement(ShowView, __assign({}, props, controllerProps)); })); };
Show.propTypes = {
    actions: PropTypes.element,
    aside: PropTypes.node,
    children: PropTypes.element,
    classes: PropTypes.object,
    className: PropTypes.string,
    hasCreate: PropTypes.bool,
    hasEdit: PropTypes.bool,
    hasList: PropTypes.bool,
    hasShow: PropTypes.bool,
    id: PropTypes.any.isRequired,
    resource: PropTypes.string.isRequired,
    title: PropTypes.any,
};
export default withStyles(styles)(Show);
