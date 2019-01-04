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
var compose_1 = __importDefault(require("recompose/compose"));
var prop_types_1 = __importDefault(require("prop-types"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var styles_1 = require("@material-ui/core/styles");
var RemoveCircle_1 = __importDefault(require("@material-ui/icons/RemoveCircle"));
var ra_core_1 = require("ra-core");
var styles = function (theme) { return ({
    removeButton: {},
    removeIcon: {
        color: theme.palette.accent1Color,
    },
}); };
var FileInputPreview = /** @class */ (function (_super) {
    __extends(FileInputPreview, _super);
    function FileInputPreview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileInputPreview.prototype.componentWillUnmount = function () {
        var _a = this.props, file = _a.file, revokeObjectURL = _a.revokeObjectURL;
        if (file.preview) {
            revokeObjectURL
                ? revokeObjectURL(file.preview)
                : window.URL.revokeObjectURL(file.preview);
        }
    };
    FileInputPreview.prototype.render = function () {
        var _a = this.props, children = _a.children, _b = _a.classes, classes = _b === void 0 ? {} : _b, className = _a.className, onRemove = _a.onRemove, revokeObjectURL = _a.revokeObjectURL, file = _a.file, translate = _a.translate, rest = __rest(_a, ["children", "classes", "className", "onRemove", "revokeObjectURL", "file", "translate"]);
        return (react_1.default.createElement("div", __assign({ className: className }, rest),
            react_1.default.createElement(IconButton_1.default, { className: classes.removeButton, onClick: onRemove, title: translate('ra.action.delete') },
                react_1.default.createElement(RemoveCircle_1.default, { className: classes.removeIcon })),
            children));
    };
    FileInputPreview.propTypes = {
        children: prop_types_1.default.element.isRequired,
        classes: prop_types_1.default.object,
        className: prop_types_1.default.string,
        file: prop_types_1.default.object,
        onRemove: prop_types_1.default.func.isRequired,
        revokeObjectURL: prop_types_1.default.func,
    };
    FileInputPreview.defaultProps = {
        file: undefined,
        translate: function (id) { return id; },
    };
    return FileInputPreview;
}(react_1.Component));
exports.FileInputPreview = FileInputPreview;
exports.default = compose_1.default(styles_1.withStyles(styles), ra_core_1.translate)(FileInputPreview);
