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
var compose_1 = __importDefault(require("recompose/compose"));
var ra_core_1 = require("ra-core");
var LinearProgress_1 = __importDefault(require("../layout/LinearProgress"));
var Labeled_1 = __importDefault(require("./Labeled"));
var ReferenceError_1 = __importDefault(require("./ReferenceError"));
var sanitizeRestProps = function (_a) {
    var allowEmpty = _a.allowEmpty, basePath = _a.basePath, choices = _a.choices, className = _a.className, component = _a.component, crudGetMatching = _a.crudGetMatching, crudGetOne = _a.crudGetOne, defaultValue = _a.defaultValue, filter = _a.filter, filterToQuery = _a.filterToQuery, formClassName = _a.formClassName, initializeForm = _a.initializeForm, input = _a.input, isRequired = _a.isRequired, label = _a.label, locale = _a.locale, meta = _a.meta, onChange = _a.onChange, optionValue = _a.optionValue, optionText = _a.optionText, perPage = _a.perPage, record = _a.record, reference = _a.reference, referenceSource = _a.referenceSource, resource = _a.resource, setFilter = _a.setFilter, setPagination = _a.setPagination, setSort = _a.setSort, sort = _a.sort, source = _a.source, textAlign = _a.textAlign, translate = _a.translate, translateChoice = _a.translateChoice, validation = _a.validation, rest = __rest(_a, ["allowEmpty", "basePath", "choices", "className", "component", "crudGetMatching", "crudGetOne", "defaultValue", "filter", "filterToQuery", "formClassName", "initializeForm", "input", "isRequired", "label", "locale", "meta", "onChange", "optionValue", "optionText", "perPage", "record", "reference", "referenceSource", "resource", "setFilter", "setPagination", "setSort", "sort", "source", "textAlign", "translate", "translateChoice", "validation"]);
    return rest;
};
exports.ReferenceInputView = function (_a) {
    var allowEmpty = _a.allowEmpty, basePath = _a.basePath, children = _a.children, choices = _a.choices, classes = _a.classes, className = _a.className, error = _a.error, input = _a.input, isRequired = _a.isRequired, isLoading = _a.isLoading, label = _a.label, meta = _a.meta, onChange = _a.onChange, resource = _a.resource, setFilter = _a.setFilter, setPagination = _a.setPagination, setSort = _a.setSort, source = _a.source, translate = _a.translate, warning = _a.warning, rest = __rest(_a, ["allowEmpty", "basePath", "children", "choices", "classes", "className", "error", "input", "isRequired", "isLoading", "label", "meta", "onChange", "resource", "setFilter", "setPagination", "setSort", "source", "translate", "warning"]);
    if (isLoading) {
        return (react_1.default.createElement(Labeled_1.default, { label: label, source: source, resource: resource, className: className, isRequired: isRequired },
            react_1.default.createElement(LinearProgress_1.default, null)));
    }
    if (error) {
        return react_1.default.createElement(ReferenceError_1.default, { label: label, error: error });
    }
    return react_1.default.cloneElement(children, __assign({ allowEmpty: allowEmpty,
        classes: classes,
        className: className,
        input: input,
        isRequired: isRequired,
        label: label,
        resource: resource, meta: __assign({}, meta, { helperText: warning || false }), source: source,
        choices: choices,
        basePath: basePath,
        onChange: onChange,
        setFilter: setFilter,
        setPagination: setPagination,
        setSort: setSort, translateChoice: false }, sanitizeRestProps(rest)));
};
exports.ReferenceInputView.propTypes = {
    allowEmpty: prop_types_1.default.bool,
    basePath: prop_types_1.default.string,
    children: prop_types_1.default.element,
    choices: prop_types_1.default.array,
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    error: prop_types_1.default.string,
    input: prop_types_1.default.object.isRequired,
    isLoading: prop_types_1.default.bool,
    label: prop_types_1.default.string,
    meta: prop_types_1.default.object,
    onChange: prop_types_1.default.func,
    resource: prop_types_1.default.string.isRequired,
    setFilter: prop_types_1.default.func,
    setPagination: prop_types_1.default.func,
    setSort: prop_types_1.default.func,
    source: prop_types_1.default.string,
    translate: prop_types_1.default.func.isRequired,
    warning: prop_types_1.default.string,
};
/**
 * An Input component for choosing a reference record. Useful for foreign keys.
 *
 * This component fetches the possible values in the reference resource
 * (using the `CRUD_GET_MATCHING` REST method), then delegates rendering
 * to a subcomponent, to which it passes the possible choices
 * as the `choices` attribute.
 *
 * Use it with a selector component as child, like `<AutocompleteInput>`,
 * `<SelectInput>`, or `<RadioButtonGroupInput>`.
 *
 * @example
 * export const CommentEdit = (props) => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *             <ReferenceInput label="Post" source="post_id" reference="posts">
 *                 <AutocompleteInput optionText="title" />
 *             </ReferenceInput>
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * @example
 * export const CommentEdit = (props) => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *             <ReferenceInput label="Post" source="post_id" reference="posts">
 *                 <SelectInput optionText="title" />
 *             </ReferenceInput>
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * By default, restricts the possible values to 25. You can extend this limit
 * by setting the `perPage` prop.
 *
 * @example
 * <ReferenceInput
 *      source="post_id"
 *      reference="posts"
 *      perPage={100}>
 *     <SelectInput optionText="title" />
 * </ReferenceInput>
 *
 * By default, orders the possible values by id desc. You can change this order
 * by setting the `sort` prop (an object with `field` and `order` properties).
 *
 * @example
 * <ReferenceInput
 *      source="post_id"
 *      reference="posts"
 *      sort={{ field: 'title', order: 'ASC' }}>
 *     <SelectInput optionText="title" />
 * </ReferenceInput>
 *
 * Also, you can filter the query used to populate the possible values. Use the
 * `filter` prop for that.
 *
 * @example
 * <ReferenceInput
 *      source="post_id"
 *      reference="posts"
 *      filter={{ is_published: true }}>
 *     <SelectInput optionText="title" />
 * </ReferenceInput>
 *
 * The enclosed component may filter results. ReferenceInput passes a `setFilter`
 * function as prop to its child component. It uses the value to create a filter
 * for the query - by default { q: [searchText] }. You can customize the mapping
 * searchText => searchQuery by setting a custom `filterToQuery` function prop:
 *
 * @example
 * <ReferenceInput
 *      source="post_id"
 *      reference="posts"
 *      filterToQuery={searchText => ({ title: searchText })}>
 *     <SelectInput optionText="title" />
 * </ReferenceInput>
 */
exports.ReferenceInput = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    if (react_1.default.Children.count(children) !== 1) {
        throw new Error('<ReferenceInput> only accepts a single child');
    }
    return (react_1.default.createElement(ra_core_1.ReferenceInputController, __assign({}, props), function (controllerProps) { return (react_1.default.createElement(exports.ReferenceInputView, __assign({}, props, __assign({ children: children }, controllerProps)))); }));
};
exports.ReferenceInput.propTypes = {
    allowEmpty: prop_types_1.default.bool.isRequired,
    basePath: prop_types_1.default.string,
    children: prop_types_1.default.element.isRequired,
    className: prop_types_1.default.string,
    classes: prop_types_1.default.object,
    filter: prop_types_1.default.object,
    filterToQuery: prop_types_1.default.func.isRequired,
    input: prop_types_1.default.object.isRequired,
    label: prop_types_1.default.string,
    meta: prop_types_1.default.object,
    onChange: prop_types_1.default.func,
    perPage: prop_types_1.default.number,
    record: prop_types_1.default.object,
    reference: prop_types_1.default.string.isRequired,
    resource: prop_types_1.default.string.isRequired,
    sort: prop_types_1.default.shape({
        field: prop_types_1.default.string,
        order: prop_types_1.default.oneOf(['ASC', 'DESC']),
    }),
    source: prop_types_1.default.string,
    translate: prop_types_1.default.func.isRequired,
};
exports.ReferenceInput.defaultProps = {
    allowEmpty: false,
    filter: {},
    filterToQuery: function (searchText) { return ({ q: searchText }); },
    perPage: 25,
    sort: { field: 'id', order: 'DESC' },
};
var EnhancedReferenceInput = compose_1.default(ra_core_1.addField, ra_core_1.translate)(exports.ReferenceInput);
exports.default = EnhancedReferenceInput;
