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
var classnames_1 = __importDefault(require("classnames"));
var styles_1 = require("@material-ui/core/styles");
var ra_core_1 = require("ra-core");
var LinearProgress_1 = __importDefault(require("../layout/LinearProgress"));
var Link_1 = __importDefault(require("../Link"));
var sanitizeRestProps_1 = __importDefault(require("./sanitizeRestProps"));
var styles = function (theme) { return ({
    link: {
        color: theme.palette.primary.main,
    },
}); };
// useful to prevent click bubbling in a datagrid with rowClick
var stopPropagation = function (e) { return e.stopPropagation(); };
exports.ReferenceFieldView = function (_a) {
    var allowEmpty = _a.allowEmpty, basePath = _a.basePath, children = _a.children, className = _a.className, _b = _a.classes, classes = _b === void 0 ? {} : _b, isLoading = _a.isLoading, record = _a.record, reference = _a.reference, referenceRecord = _a.referenceRecord, resource = _a.resource, resourceLinkPath = _a.resourceLinkPath, source = _a.source, _c = _a.translateChoice, translateChoice = _c === void 0 ? false : _c, rest = __rest(_a, ["allowEmpty", "basePath", "children", "className", "classes", "isLoading", "record", "reference", "referenceRecord", "resource", "resourceLinkPath", "source", "translateChoice"]);
    if (isLoading) {
        return react_1.default.createElement(LinearProgress_1.default, null);
    }
    if (resourceLinkPath) {
        return (react_1.default.createElement(Link_1.default, { to: resourceLinkPath, className: className, onClick: stopPropagation }, react_1.default.cloneElement(children, __assign({ className: classnames_1.default(children.props.className, classes.link // force color override for Typography components
            ), record: referenceRecord, resource: reference, allowEmpty: allowEmpty,
            basePath: basePath,
            translateChoice: translateChoice }, sanitizeRestProps_1.default(rest)))));
    }
    return react_1.default.cloneElement(children, __assign({ record: referenceRecord, resource: reference, allowEmpty: allowEmpty,
        basePath: basePath,
        translateChoice: translateChoice }, sanitizeRestProps_1.default(rest)));
};
exports.ReferenceFieldView.propTypes = {
    allowEmpty: prop_types_1.default.bool,
    basePath: prop_types_1.default.string,
    children: prop_types_1.default.element,
    className: prop_types_1.default.string,
    classes: prop_types_1.default.object,
    isLoading: prop_types_1.default.bool,
    record: prop_types_1.default.object,
    reference: prop_types_1.default.string,
    referenceRecord: prop_types_1.default.object,
    resource: prop_types_1.default.string,
    resourceLinkPath: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.bool]),
    source: prop_types_1.default.string,
    translateChoice: prop_types_1.default.bool,
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
    if (react_1.default.Children.count(children) !== 1) {
        throw new Error('<ReferenceField> only accepts a single child');
    }
    return (react_1.default.createElement(ra_core_1.ReferenceFieldController, __assign({}, props), function (controllerProps) { return (react_1.default.createElement(exports.ReferenceFieldView, __assign({}, props, __assign({ children: children }, controllerProps)))); }));
};
ReferenceField.propTypes = {
    addLabel: prop_types_1.default.bool,
    allowEmpty: prop_types_1.default.bool.isRequired,
    basePath: prop_types_1.default.string.isRequired,
    children: prop_types_1.default.element.isRequired,
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    cellClassName: prop_types_1.default.string,
    headerClassName: prop_types_1.default.string,
    label: prop_types_1.default.string,
    record: prop_types_1.default.object,
    reference: prop_types_1.default.string.isRequired,
    resource: prop_types_1.default.string,
    sortBy: prop_types_1.default.string,
    source: prop_types_1.default.string.isRequired,
    translateChoice: prop_types_1.default.func,
    linkType: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.bool])
        .isRequired,
};
ReferenceField.defaultProps = {
    allowEmpty: false,
    classes: {},
    linkType: 'edit',
    record: {},
};
var EnhancedReferenceField = styles_1.withStyles(styles)(ReferenceField);
EnhancedReferenceField.defaultProps = {
    addLabel: true,
};
exports.default = EnhancedReferenceField;
