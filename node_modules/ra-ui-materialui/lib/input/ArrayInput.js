"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var ra_core_1 = require("ra-core");
var redux_form_1 = require("redux-form");
var FormControl_1 = __importDefault(require("@material-ui/core/FormControl"));
var InputLabel_1 = __importDefault(require("@material-ui/core/InputLabel"));
var sanitizeRestProps_1 = __importDefault(require("./sanitizeRestProps"));
/**
 * To edit arrays of data embedded inside a record, <ArrayInput> creates a list of sub-forms.
 *
 *  @example
 *
 *      import { ArrayInput, SimpleFormIterator, DateInput, UrlInput } from 'react-admin';
 *
 *      <ArrayInput source="backlinks">
 *          <SimpleFormIterator>
 *              <DateInput source="date" />
 *              <UrlInput source="url" />
 *          </SimpleFormIterator>
 *      </ArrayInput>
 *
 * <ArrayInput> allows the edition of embedded arrays, like the backlinks field
 * in the following post record:
 *
 * {
 *   id: 123
 *   backlinks: [
 *         {
 *             date: '2012-08-10T00:00:00.000Z',
 *             url: 'http://example.com/foo/bar.html',
 *         },
 *         {
 *             date: '2012-08-14T00:00:00.000Z',
 *             url: 'https://blog.johndoe.com/2012/08/12/foobar.html',
 *         }
 *    ]
 * }
 *
 * <ArrayInput> expects a single child, which must be a *form iterator* component.
 * A form iterator is a component accepting a fields object
 * as passed by redux-form's <FieldArray> component, and defining a layout for
 * an array of fields. For instance, the <SimpleFormIterator> component
 * displays an array of fields in an unordered list (<ul>), one sub-form by
 * list item (<li>). It also provides controls for adding and removing
 * a sub-record (a backlink in this example).
 *
 * @see https://redux-form.com/7.3.0/examples/fieldarrays/
 */
var ArrayInput = /** @class */ (function (_super) {
    __extends(ArrayInput, _super);
    function ArrayInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderFieldArray = function (fieldProps) {
            var _a = _this.props, children = _a.children, record = _a.record, resource = _a.resource, source = _a.source;
            return react_1.cloneElement(children, __assign({}, fieldProps, { record: record,
                resource: resource,
                source: source }));
        };
        return _this;
    }
    ArrayInput.prototype.render = function () {
        var _a = this.props, className = _a.className, defaultValue = _a.defaultValue, label = _a.label, source = _a.source, resource = _a.resource, validate = _a.validate, rest = __rest(_a, ["className", "defaultValue", "label", "source", "resource", "validate"]);
        return (react_1.default.createElement(FormControl_1.default, __assign({ fullWidth: true, margin: "normal", className: className }, sanitizeRestProps_1.default(rest)),
            react_1.default.createElement(InputLabel_1.default, { htmlFor: source, shrink: true },
                react_1.default.createElement(ra_core_1.FieldTitle, { label: label, source: source, resource: resource, isRequired: ra_core_1.isRequired(validate) })),
            react_1.default.createElement(redux_form_1.FieldArray, { name: source, defaultValue: defaultValue, component: this.renderFieldArray, validate: validate, isRequired: ra_core_1.isRequired(validate) })));
    };
    return ArrayInput;
}(react_1.Component));
exports.ArrayInput = ArrayInput;
ArrayInput.propTypes = {
    children: prop_types_1.default.node,
    className: prop_types_1.default.string,
    defaultValue: prop_types_1.default.any,
    isRequired: prop_types_1.default.bool,
    label: prop_types_1.default.string,
    resource: prop_types_1.default.string,
    source: prop_types_1.default.string,
    record: prop_types_1.default.object,
    options: prop_types_1.default.object,
    validate: prop_types_1.default.func,
};
ArrayInput.defaultProps = {
    options: {},
    fullWidth: true,
};
exports.default = ra_core_1.withDefaultValue(ArrayInput);
