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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MuiTab from '@material-ui/core/Tab';
import { translate } from 'ra-core';
import classnames from 'classnames';
import Labeled from '../input/Labeled';
var sanitizeRestProps = function (_a) {
    var label = _a.label, icon = _a.icon, value = _a.value, translate = _a.translate, rest = __rest(_a, ["label", "icon", "value", "translate"]);
    return rest;
};
/**
 * Tab element for the SimpleShowLayout.
 *
 * The `<Tab>` component accepts the following props:
 *
 * - label: The string displayed for each tab
 * - icon: The icon to show before the label (optional). Must be an element.
 *
 * @example
 *     // in src/posts.js
 *     import React from 'react';
 *     import FavoriteIcon from '@material-ui/icons/Favorite';
 *     import PersonPinIcon from '@material-ui/icons/PersonPin';
 *     import { Show, TabbedShowLayout, Tab, TextField } from 'react-admin';
 *
 *     export const PostShow = (props) => (
 *         <Show {...props}>
 *             <TabbedShowLayout>
 *                 <Tab label="Content" icon={<FavoriteIcon />}>
 *                     <TextField source="title" />
 *                     <TextField source="subtitle" />
 *                </Tab>
 *                 <Tab label="Metadata" icon={<PersonIcon />}>
 *                     <TextField source="category" />
 *                </Tab>
 *             </TabbedShowLayout>
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
var Tab = /** @class */ (function (_super) {
    __extends(Tab, _super);
    function Tab() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderHeader = function (_a) {
            var className = _a.className, label = _a.label, icon = _a.icon, value = _a.value, translate = _a.translate, rest = __rest(_a, ["className", "label", "icon", "value", "translate"]);
            return (React.createElement(MuiTab, __assign({ key: label, label: translate(label, { _: label }), value: value, icon: icon, className: classnames('show-tab', className), component: Link, to: value }, sanitizeRestProps(rest))));
        };
        _this.renderContent = function (_a) {
            var className = _a.className, children = _a.children, basePath = _a.basePath, record = _a.record, resource = _a.resource;
            return (React.createElement("span", { className: className }, React.Children.map(children, function (field) {
                return field && (React.createElement("div", { key: field.props.source, className: classnames('ra-field', "ra-field-" + field.props.source, field.props.className) }, field.props.addLabel ? (React.createElement(Labeled, { label: field.props.label, source: field.props.source, basePath: basePath, record: record, resource: resource }, field)) : typeof field.type === 'string' ? (field) : (React.cloneElement(field, {
                    basePath: basePath,
                    record: record,
                    resource: resource,
                }))));
            })));
        };
        return _this;
    }
    Tab.prototype.render = function () {
        var _a = this.props, children = _a.children, context = _a.context, rest = __rest(_a, ["children", "context"]);
        return context === 'header'
            ? this.renderHeader(rest)
            : this.renderContent(__assign({ children: children }, rest));
    };
    return Tab;
}(Component));
Tab.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    context: PropTypes.oneOf(['header', 'content']),
    icon: PropTypes.element,
    label: PropTypes.string.isRequired,
    translate: PropTypes.func.isRequired,
    value: PropTypes.string,
};
export default translate(Tab);
