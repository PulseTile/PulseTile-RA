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
var Search_1 = __importDefault(require("@material-ui/icons/Search"));
var InputAdornment_1 = __importDefault(require("@material-ui/core/InputAdornment"));
var styles_1 = require("@material-ui/core/styles");
var ra_core_1 = require("ra-core");
var TextInput_1 = __importDefault(require("./TextInput"));
var searchFilterStyles = {
    input: {
        marginTop: 32,
    },
};
var SearchInput = function (_a) {
    var classes = _a.classes, translate = _a.translate, props = __rest(_a, ["classes", "translate"]);
    return (react_1.default.createElement(TextInput_1.default, __assign({ label: false, placeholder: translate('ra.action.search'), InputProps: {
            endAdornment: (react_1.default.createElement(InputAdornment_1.default, { position: "end" },
                react_1.default.createElement(Search_1.default, { color: "disabled" }))),
        }, className: classes.input }, props)));
};
SearchInput.propTypes = {
    classes: prop_types_1.default.object,
    translate: prop_types_1.default.func,
};
var enhance = compose_1.default(ra_core_1.translate, styles_1.withStyles(searchFilterStyles));
exports.default = enhance(SearchInput);
