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
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { ReferenceFieldController } from 'ra-core';
import LinearProgress from '../layout/LinearProgress';
import Link from '../Link';
import sanitizeRestProps from './sanitizeRestProps';
var styles = function (theme) { return ({
    link: {
        color: theme.palette.primary.main,
    },
}); };
// useful to prevent click bubbling in a datagrid with rowClick
var stopPropagation = function (e) { return e.stopPropagation(); };
export var ReferenceFieldView = function (_a) {
    var allowEmpty = _a.allowEmpty, basePath = _a.basePath, children = _a.children, className = _a.className, _b = _a.classes, classes = _b === void 0 ? {} : _b, isLoading = _a.isLoading, record = _a.record, reference = _a.reference, referenceRecord = _a.referenceRecord, resource = _a.resource, resourceLinkPath = _a.resourceLinkPath, source = _a.source, _c = _a.translateChoice, translateChoice = _c === void 0 ? false : _c, rest = __rest(_a, ["allowEmpty", "basePath", "children", "className", "classes", "isLoading", "record", "reference", "referenceRecord", "resource", "resourceLinkPath", "source", "translateChoice"]);
    if (isLoading) {
        return React.createElement(LinearProgress, null);
    }
    if (resourceLinkPath) {
        return (React.createElement(Link, { to: resourceLinkPath, className: className, onClick: stopPropagation }, React.cloneElement(children, __assign({ className: classnames(children.props.className, classes.link // force color override for Typography components
            ), record: referenceRecord, resource: reference, allowEmpty: allowEmpty,
            basePath: basePath,
            translateChoice: translateChoice }, sanitizeRestProps(rest)))));
    }
    return React.cloneElement(children, __assign({ record: referenceRecord, resource: reference, allowEmpty: allowEmpty,
        basePath: basePath,
        translateChoice: translateChoice }, sanitizeRestProps(rest)));
};
ReferenceFieldView.propTypes = {
    allowEmpty: PropTypes.bool,
    basePath: PropTypes.string,
    children: PropTypes.element,
    className: PropTypes.string,
    classes: PropTypes.object,
    isLoading: PropTypes.bool,
    record: PropTypes.object,
    reference: PropTypes.string,
    referenceRecord: PropTypes.object,
    resource: PropTypes.string,
    resourceLinkPath: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    source: PropTypes.string,
    translateChoice: PropTypes.bool,
};
/**
 * Fetch reference record, and delegate rendering to child component.
 *
 * The reference prop sould be the name of one of the <Resource> components
 * added as <Admin> child.
 *
 * @example
 * <ReferenceField label="User" source="userId" reference="users">
 *     <TextField source="name" />
 * </ReferenceField>
 *
 * By default, includes a link to the <Edit> page of the related record
 * (`/users/:userId` in the previous example).
 *
 * Set the linkType prop to "show" to link to the <Show> page instead.
 *
 * @example
 * <ReferenceField label="User" source="userId" reference="users" linkType="show">
 *     <TextField source="name" />
 * </ReferenceField>
 *
 * You can also prevent `<ReferenceField>` from adding link to children by setting
 * `linkType` to false.
 *
 * @example
 * <ReferenceField label="User" source="userId" reference="users" linkType={false}>
 *     <TextField source="name" />
 * </ReferenceField>
 */
var ReferenceField = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    if (React.Children.count(children) !== 1) {
        throw new Error('<ReferenceField> only accepts a single child');
    }
    return (React.createElement(ReferenceFieldController, __assign({}, props), function (controllerProps) { return (React.createElement(ReferenceFieldView, __assign({}, props, __assign({ children: children }, controllerProps)))); }));
};
ReferenceField.propTypes = {
    addLabel: PropTypes.bool,
    allowEmpty: PropTypes.bool.isRequired,
    basePath: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    classes: PropTypes.object,
    className: PropTypes.string,
    cellClassName: PropTypes.string,
    headerClassName: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.object,
    reference: PropTypes.string.isRequired,
    resource: PropTypes.string,
    sortBy: PropTypes.string,
    source: PropTypes.string.isRequired,
    translateChoice: PropTypes.func,
    linkType: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
        .isRequired,
};
ReferenceField.defaultProps = {
    allowEmpty: false,
    classes: {},
    linkType: 'edit',
    record: {},
};
var EnhancedReferenceField = withStyles(styles)(ReferenceField);
EnhancedReferenceField.defaultProps = {
    addLabel: true,
};
export default EnhancedReferenceField;
