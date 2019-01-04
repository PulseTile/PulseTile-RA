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
var button_1 = require("../button");
var CardActions_1 = __importDefault(require("../layout/CardActions"));
var sanitizeRestProps = function (_a) {
    var basePath = _a.basePath, className = _a.className, record = _a.record, hasShow = _a.hasShow, hasList = _a.hasList, rest = __rest(_a, ["basePath", "className", "record", "hasShow", "hasList"]);
    return rest;
};
/**
 * Action Toolbar for the Edit view
 *
 * Internal component. If you want to add or remove actions for a Edit view,
 * write your own EditActions Component. Then, in the <Edit> component,
 * use it in the `actions` prop to pas a custom element.
 *
 * @example
 *     import Button from '@material-ui/core/Button';
 *     import { CardActions, ShowButton, Edit } from 'react-admin';
 *
 *     const PostEditActions = ({ basePath, record, rseource }) => (
 *         <CardActions>
 *             <ShowButton basePath={basePath} record={record} />
 *             // Add your custom actions here //
 *             <Button color="primary" onClick={customAction}>Custom Action</Button>
 *         </CardActions>
 *     );
 *
 *     export const PostEdit = (props) => (
 *         <Edit actions={<PostEditActions />} {...props}>
 *             ...
 *         </Edit>
 *     );
 */
var EditActions = function (_a) {
    var basePath = _a.basePath, className = _a.className, data = _a.data, hasShow = _a.hasShow, resource = _a.resource, rest = __rest(_a, ["basePath", "className", "data", "hasShow", "resource"]);
    return (react_1.default.createElement(CardActions_1.default, __assign({ className: className }, sanitizeRestProps(rest)), hasShow && react_1.default.createElement(button_1.ShowButton, { basePath: basePath, record: data })));
};
EditActions.propTypes = {
    basePath: prop_types_1.default.string,
    className: prop_types_1.default.string,
    data: prop_types_1.default.object,
    hasShow: prop_types_1.default.bool,
    resource: prop_types_1.default.string,
};
exports.default = EditActions;
