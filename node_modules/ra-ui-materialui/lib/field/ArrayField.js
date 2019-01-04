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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var prop_types_1 = __importDefault(require("prop-types"));
var get_1 = __importDefault(require("lodash/get"));
var pure_1 = __importDefault(require("recompose/pure"));
var initialState = {
    data: {},
    ids: [],
};
/**
 * Display a collection
 *
 * Ideal for embedded arrays of objects, e.g.
 * {
 *   id: 123
 *   tags: [
 *     { name: 'foo' },
 *     { name: 'bar' }
 *   ]
 * }
 *
 * The child must be an iterator component
 * (like <Datagrid> or <SingleFieldList>).
 *
 * @example Display all the backlinks of the current post as a <Datagrid>
 * // post = {
 * //   id: 123
 * //   backlinks: [
 * //       {
 * //           date: '2012-08-10T00:00:00.000Z',
 * //           url: 'http://example.com/foo/bar.html',
 * //       },
 * //       {
 * //           date: '2012-08-14T00:00:00.000Z',
 * //           url: 'https://blog.johndoe.com/2012/08/12/foobar.html',
 * //       }
 * //    ]
 * // }
 *     <ArrayField source="backlinks">
 *         <Datagrid>
 *             <DateField source="date" />
 *             <UrlField source="url" />
 *         </Datagrid>
 *     </ArrayField>
 *
 * @example Display all the tags of the current post as <Chip> components
 * // post = {
 * //   id: 123
 * //   tags: [
 * //     { name: 'foo' },
 * //     { name: 'bar' }
 * //   ]
 * // }
 *     <ArrayField source="tags">
 *         <SingleFieldList>
 *             <ChipField source="name" />
 *         </SingleFieldList>
 *     </ArrayField>
 *
 * If you need to render a collection in a custom way, it's often simpler
 * to write your own component:
 *
 * @example
 *     const TagsField = ({ record }) => (
 *          <ul>
 *              {record.tags.map(item => (
 *                  <li key={item.name}>{item.name}</li>
 *              ))}
 *          </ul>
 *     )
 *     TagsField.defaultProps = { addLabel: true };
 */
var ArrayField = /** @class */ (function (_super) {
    __extends(ArrayField, _super);
    function ArrayField(props) {
        var _this = _super.call(this, props) || this;
        _this.state = props.record
            ? _this.getDataAndIds(props.record, props.source)
            : initialState;
        return _this;
    }
    ArrayField.prototype.componentWillReceiveProps = function (nextProps, prevProps) {
        if (nextProps.record !== prevProps.record) {
            this.setState(this.getDataAndIds(nextProps.record, nextProps.source));
        }
    };
    ArrayField.prototype.getDataAndIds = function (record, source) {
        var list = get_1.default(record, source);
        return list
            ? {
                data: list.reduce(function (prev, item) {
                    prev[JSON.stringify(item)] = item;
                    return prev;
                }, {}),
                ids: list.map(JSON.stringify),
            }
            : initialState;
    };
    ArrayField.prototype.render = function () {
        var _a = this.props, addLabel = _a.addLabel, basePath = _a.basePath, children = _a.children, record = _a.record, source = _a.source, rest = __rest(_a, ["addLabel", "basePath", "children", "record", "source"]);
        var _b = this.state, ids = _b.ids, data = _b.data;
        return react_1.cloneElement(children, __assign({ ids: ids,
            data: data, isLoading: false, basePath: basePath, currentSort: {} }, rest));
    };
    return ArrayField;
}(react_1.Component));
exports.ArrayField = ArrayField;
ArrayField.propTypes = {
    addLabel: prop_types_1.default.bool,
    basePath: prop_types_1.default.string,
    children: prop_types_1.default.element.isRequired,
    record: prop_types_1.default.object,
    resource: prop_types_1.default.string,
    sortBy: prop_types_1.default.string,
    source: prop_types_1.default.string,
};
var EnhancedArrayField = pure_1.default(ArrayField);
EnhancedArrayField.defaultProps = {
    addLabel: true,
};
exports.default = EnhancedArrayField;
