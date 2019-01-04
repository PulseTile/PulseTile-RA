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
import compose from 'recompose/compose';
import { addField, translate, ReferenceArrayInputController } from 'ra-core';
import LinearProgress from '../layout/LinearProgress';
import Labeled from '../input/Labeled';
import ReferenceError from './ReferenceError';
var sanitizeRestProps = function (_a) {
    var alwaysOn = _a.alwaysOn, basePath = _a.basePath, component = _a.component, crudGetMany = _a.crudGetMany, crudGetMatching = _a.crudGetMatching, defaultValue = _a.defaultValue, filterToQuery = _a.filterToQuery, formClassName = _a.formClassName, initializeForm = _a.initializeForm, input = _a.input, isRequired = _a.isRequired, label = _a.label, locale = _a.locale, meta = _a.meta, optionText = _a.optionText, optionValue = _a.optionValue, perPage = _a.perPage, record = _a.record, referenceSource = _a.referenceSource, resource = _a.resource, allowEmpty = _a.allowEmpty, source = _a.source, textAlign = _a.textAlign, translate = _a.translate, translateChoice = _a.translateChoice, rest = __rest(_a, ["alwaysOn", "basePath", "component", "crudGetMany", "crudGetMatching", "defaultValue", "filterToQuery", "formClassName", "initializeForm", "input", "isRequired", "label", "locale", "meta", "optionText", "optionValue", "perPage", "record", "referenceSource", "resource", "allowEmpty", "source", "textAlign", "translate", "translateChoice"]);
    return rest;
};
export var ReferenceArrayInputView = function (_a) {
    var allowEmpty = _a.allowEmpty, basePath = _a.basePath, children = _a.children, choices = _a.choices, className = _a.className, error = _a.error, input = _a.input, isLoading = _a.isLoading, isRequired = _a.isRequired, label = _a.label, meta = _a.meta, onChange = _a.onChange, options = _a.options, resource = _a.resource, setFilter = _a.setFilter, setPagination = _a.setPagination, setSort = _a.setSort, source = _a.source, translate = _a.translate, warning = _a.warning, rest = __rest(_a, ["allowEmpty", "basePath", "children", "choices", "className", "error", "input", "isLoading", "isRequired", "label", "meta", "onChange", "options", "resource", "setFilter", "setPagination", "setSort", "source", "translate", "warning"]);
    var translatedLabel = translate(label || "resources." + resource + ".fields." + source, { _: label });
    if (isLoading) {
        return (React.createElement(Labeled, { label: translatedLabel, source: source, resource: resource, className: className, isRequired: isRequired },
            React.createElement(LinearProgress, null)));
    }
    if (error) {
        return React.createElement(ReferenceError, { label: translatedLabel, error: error });
    }
    return React.cloneElement(children, __assign({ allowEmpty: allowEmpty,
        basePath: basePath,
        choices: choices,
        className: className,
        error: error,
        input: input,
        isRequired: isRequired, label: translatedLabel, meta: __assign({}, meta, { helperText: warning || false }), onChange: onChange,
        options: options,
        resource: resource,
        setFilter: setFilter,
        setPagination: setPagination,
        setSort: setSort,
        source: source, translateChoice: false, limitChoicesToValue: true }, sanitizeRestProps(rest)));
};
ReferenceArrayInputView.propTypes = {
    allowEmpty: PropTypes.bool,
    basePath: PropTypes.string,
    children: PropTypes.element,
    choices: PropTypes.array,
    className: PropTypes.string,
    error: PropTypes.string,
    isLoading: PropTypes.bool,
    input: PropTypes.object.isRequired,
    label: PropTypes.string,
    meta: PropTypes.object,
    onChange: PropTypes.func,
    options: PropTypes.object,
    resource: PropTypes.string.isRequired,
    setFilter: PropTypes.func,
    setPagination: PropTypes.func,
    setSort: PropTypes.func,
    source: PropTypes.string,
    translate: PropTypes.func.isRequired,
    warning: PropTypes.string,
};
/**
 * An Input component for fields containing a list of references to another resource.
 * Useful for 'hasMany' relationship.
 *
 * @example
 * The post object has many tags, so the post resource looks like:
 * {
 *    id: 1234,
 *    tag_ids: [ "1", "23", "4" ]
 * }
 *
 * ReferenceArrayInput component fetches the current resources (using the
 * `CRUD_GET_MANY` REST method) as well as possible resources (using the
 * `CRUD_GET_MATCHING` REST method) in the reference endpoint. It then
 * delegates rendering to a subcomponent, to which it passes the possible
 * choices as the `choices` attribute.
 *
 * Use it with a selector component as child, like `<SelectArrayInput>`
 * or <CheckboxGroupInput>.
 *
 * @example
 * export const PostEdit = (props) => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *             <ReferenceArrayInput source="tag_ids" reference="tags">
 *                 <SelectArrayInput optionText="name" />
 *             </ReferenceArrayInput>
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * By default, restricts the possible values to 25. You can extend this limit
 * by setting the `perPage` prop.
 *
 * @example
 * <ReferenceArrayInput
 *      source="tag_ids"
 *      reference="tags"
 *      perPage={100}>
 *     <SelectArrayInput optionText="name" />
 * </ReferenceArrayInput>
 *
 * By default, orders the possible values by id desc. You can change this order
 * by setting the `sort` prop (an object with `field` and `order` properties).
 *
 * @example
 * <ReferenceArrayInput
 *      source="tag_ids"
 *      reference="tags"
 *      sort={{ field: 'name', order: 'ASC' }}>
 *     <SelectArrayInput optionText="name" />
 * </ReferenceArrayInput>
 *
 * Also, you can filter the query used to populate the possible values. Use the
 * `filter` prop for that.
 *
 * @example
 * <ReferenceArrayInput
 *      source="tag_ids"
 *      reference="tags"
 *      filter={{ is_public: true }}>
 *     <SelectArrayInput optionText="name" />
 * </ReferenceArrayInput>
 *
 * The enclosed component may filter results. ReferenceArrayInput passes a
 * `setFilter` function as prop to its child component. It uses the value to
 * create a filter for the query - by default { q: [searchText] }. You can
 * customize the mapping searchText => searchQuery by setting a custom
 * `filterToQuery` function prop:
 *
 * @example
 * <ReferenceArrayInput
 *      source="tag_ids"
 *      reference="tags"
 *      filterToQuery={searchText => ({ name: searchText })}>
 *     <SelectArrayInput optionText="name" />
 * </ReferenceArrayInput>
 */
export var ReferenceArrayInput = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    if (React.Children.count(children) !== 1) {
        throw new Error('<ReferenceArrayInput> only accepts a single child (like <Datagrid>)');
    }
    return (React.createElement(ReferenceArrayInputController, __assign({}, props), function (controllerProps) { return (React.createElement(ReferenceArrayInputView, __assign({}, props, __assign({ children: children }, controllerProps)))); }));
};
ReferenceArrayInput.propTypes = {
    allowEmpty: PropTypes.bool.isRequired,
    basePath: PropTypes.string,
    children: PropTypes.element.isRequired,
    className: PropTypes.string,
    filter: PropTypes.object,
    filterToQuery: PropTypes.func.isRequired,
    input: PropTypes.object.isRequired,
    label: PropTypes.string,
    meta: PropTypes.object,
    perPage: PropTypes.number,
    reference: PropTypes.string.isRequired,
    resource: PropTypes.string.isRequired,
    sort: PropTypes.shape({
        field: PropTypes.string,
        order: PropTypes.oneOf(['ASC', 'DESC']),
    }),
    source: PropTypes.string,
    translate: PropTypes.func.isRequired,
};
ReferenceArrayInput.defaultProps = {
    allowEmpty: false,
    filter: {},
    filterToQuery: function (searchText) { return ({ q: searchText }); },
    perPage: 25,
    sort: { field: 'id', order: 'DESC' },
};
var EnhancedReferenceArrayInput = compose(addField, translate)(ReferenceArrayInput);
export default EnhancedReferenceArrayInput;
